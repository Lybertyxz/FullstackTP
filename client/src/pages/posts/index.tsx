import { GetServerSideProps } from "next";
import { apiService } from "../../services/apiService";
import { Post } from "@/interfaces/Post";
import PostCard from "@/components/PostCard";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await apiService.listPosts();
  return {
    props: { posts },
  };
};

function Posts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard title={post.title} desc={post.desc} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
