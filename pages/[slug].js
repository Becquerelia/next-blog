import { getFileBySlug, getFiles } from "../library/mdx";
import { MDXRemote } from "next-mdx-remote";


function Post({ source, frontmatter }) {
    console.log('lalala', source);

  return (
    <div>
      <h1>An awesome post</h1>
      <MDXRemote {...source} />;
    </div>
  )
};

//Function to get a slug from a post:
export async function getStaticProps({ params }) {
    const { source, frontmatter } = await getFileBySlug(params.slug);
    return {
        props: {
            source,
            frontmatter
        }
    };
};

//Function to get all routes for all posts that we have:
export async function getStaticPaths(){
    const posts = await getFiles();
    const paths = posts.map((post)=>{
        return {
            params: {
            slug: post.replace(/\.mdx/, "")
        }}
    })

    return {
        paths,
        fallback: false
    }
}

export default Post;