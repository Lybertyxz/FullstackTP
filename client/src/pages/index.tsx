import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/create-post">Create Post</Link>
        </li>
        <li>
          <Link href="/posts">View Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="">
      <Navigation />
    </div>
  );
};

export default Home;
