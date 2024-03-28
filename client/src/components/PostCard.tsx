// components/PostCard.js

interface PostCardProps {
  title: string;
  desc: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, desc }) => {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

export default PostCard;
