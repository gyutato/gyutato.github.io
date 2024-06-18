import { getAllPostSlugs } from "@/utils/posts";

export default function Posts() {
  const posts = getAllPostSlugs();
  return (
    <div className="z-10 w-full max-w-5xl font-mono text-sm">
      {posts.map((post) => (
        <div key={post.params.slug}>{post.params.slug}</div>
      ))}
    </div>
  );
}
