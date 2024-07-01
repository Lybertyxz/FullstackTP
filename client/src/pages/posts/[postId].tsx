import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import type { Post } from "@/interfaces/models";

function Post() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (postId) {
      apiService.posts.getPost(postId as string).then(setPost);
    }
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.desc}</p>
    </div>
  );
}

export default Post;
