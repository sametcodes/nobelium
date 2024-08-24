import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogProject = ({ project }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${project.slug}`}>
      <article key={project.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
            {project.title}
          </h2>
          <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
            <FormattedDate date={project.date} />
          </time>
        </header>
        <img
          src={project.featured_image}
          alt={project.title}
          className="rounded-lg mb-5 w-full"
        />
        <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {project.summary}
          </p>
        </main>
      </article>
    </Link>
  );
};

export default BlogProject;
