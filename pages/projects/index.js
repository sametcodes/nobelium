import { clientConfig } from "@/lib/server/config";

import Container from "@/components/Container";
import BlogProject from "@/components/BlogProject";
import Pagination from "@/components/Pagination";
import { getAllProjects } from "@/lib/notion";
import { useConfig } from "@/lib/config";

export async function getStaticProps() {
  const projects = await getAllProjects();
  const projectsToShow = projects.slice(0, clientConfig.projectsPerPage);
  const totalProjects = projects.length;
  const showNext = totalProjects > clientConfig.projectsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      projectsToShow,
      showNext,
    },
    revalidate: 1,
  };
}

export default function Blog({ projectsToShow, page, showNext }) {
  const { title, description } = useConfig();

  return (
    <Container title={title} description={description}>
      {projectsToShow.map((project) => (
        <BlogProject key={project.id} project={project} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  );
}
