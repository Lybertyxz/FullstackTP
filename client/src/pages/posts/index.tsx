import { GetServerSideProps } from "next";
import { apiService } from "../../services/apiService";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await apiService.listPosts();
  return {
    props: { posts },
  };
};

function Posts({ posts }: { posts: any[] }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Posts;
