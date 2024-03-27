import { FormEvent, useState } from "react";
import { apiService } from "../services/apiService";

function CreatePost() {
  const [post, setPost] = useState({ title: "", desc: "" });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await apiService.createPost(post);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
        className="input-class"
      />
      <textarea
        value={post.desc}
        onChange={(e) => setPost({ ...post, desc: e.target.value })}
        placeholder="Description"
        className="textarea-class"
      />
      <button type="submit" className="button-class">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
