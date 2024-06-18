import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostSlugs, getPostData } from "@/utils/posts";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

type PostProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const postData = getPostData(params.slug) as any;
  return {
    title: postData.title,
    description: postData.excerpt || "",
  };
}

const Post = async ({ params }: PostProps) => {
  const postData = getPostData(params.slug) as any;

  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <ReactMarkdown>{postData.content}</ReactMarkdown>
    </div>
  );
};

export default Post;
