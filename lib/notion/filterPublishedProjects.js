export default function filterPublishedProjects({ posts }) {
  if (!posts || !posts.length) return [];
  return posts
    .filter((post) => post?.type?.[0] === "Project")
    .filter(
      (post) =>
        post.title &&
        post.slug &&
        post?.status?.[0] === "Published" &&
        post.date <= new Date()
    );
}
