import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";

function Post() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (postId) {
      apiService.getPost(postId as string).then(setPost);
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
