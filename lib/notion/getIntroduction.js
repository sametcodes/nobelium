import { config as BLOG } from "@/lib/server/config";

import { idToUuid } from "notion-utils";
import dayjs from "dayjs";
import api from "@/lib/server/notion-api";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedPosts";

export async function getIntroduction() {
  const id = idToUuid(process.env.NOTION_PAGE_ID);
  const response = await api.getPage(id);

  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties = (await getPageProperties(id, block, schema)) || null;

      // Add fullwidth to properties
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false;
      // Convert date (with timezone) to unix milliseconds timestamp
      properties.date = (
        properties.date?.start_date
          ? dayjs.tz(properties.date?.start_date)
          : dayjs(block[id].value?.created_time)
      ).valueOf();

      data.push(properties);
    }

    // remove all the the items doesn't meet requirements
    const intro = data.find(
      (post) => post?.type?.[0] === "Intro" && post?.status?.[0] === "Published"
    );

    let document = null;

    if (intro) {
      document = await api.getPage(intro?.id);
    }

    return {
      meta: intro,
      document,
    };
  }
}
