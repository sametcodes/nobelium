import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import Post from "./Post";

const Introduction = ({ meta, document }) => {
  const BLOG = useConfig();

  return (
    <article key={meta.id} className="mb-6 md:mb-8">
      <Post
        post={meta}
        blockMap={document}
        showTableOfContents={false}
        showAuthor={false}
        fullWidth={false}
      />
    </article>
  );
};

export default Introduction;
