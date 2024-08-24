import { getIntroduction } from "@/lib/notion";
import { useConfig } from "@/lib/config";
import { useRouter } from "next/router";

import Container from "@/components/Container";
import Introduction from "@/components/Introduction";

export async function getStaticProps() {
  const introduction = await getIntroduction();
  return {
    props: {
      introduction
    },
    revalidate: 1
  };
}

export default function Blog({ introduction }) {
  const router = useRouter();
  const { title, description } = useConfig();

  if (router.isFallback) return null;

  return (
    <Container title={title} description={description}>
      <Introduction meta={introduction.meta} document={introduction.document} />
    </Container>
  );
}
