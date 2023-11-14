import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import {
  adminSearchUser,
  blockUser,
  deletePost,
} from "../../services/admin.services";
import { toast } from "react-toastify";
import UserAndCommentsCounter from "../../components/UserAndCommentsCounter/UserAndCommentsCounter";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);


  useEffect(() => {
    getAllPosts().then(setPosts);
    adminSearchUser("").then(setUsers);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter(user => user.username && user.username.toLowerCase().includes(searchTerm)
      || user.email && user.email.toLowerCase().includes(searchTerm)
      || user.firstName && user.firstName.toLowerCase().includes(searchTerm));
    setFilteredUsers(filteredUsers);
  };

  const handleSearchSubmit = () => {
    if (searchTerm === "") {
      toast.warning("Please enter a username, email or first name");
      return;
    }
    adminSearchUser(searchTerm).then(setUsers);
  };

  const handleBlockUser = (username, blockStatus) => {
    blockUser(username, blockStatus).then(() => {
      setUsers(
        users.map((user) =>
          user.username === username
            ? { ...user, isBlocked: blockStatus }
            : user
        )
      );
    });
  };

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };
///*bg-fixed bg-hero-pattern bg-contain
  return (
    <div className='bg-fixed bg-hero-pattern bg-contain'>
      
      
      <UserAndCommentsCounter/>
    <div className=" mx-auto grid max-w-3xl grid-cols-1  gap-y-16  rounded-xl p-5  sm:mt-28  ">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:shadow-white shadow-xl opacity-90 focus:outline-none"
            placeholder="Search by username, email or first name"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          <button
            type="submit"
            onClick={handleSearchSubmit}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col items-start justify-between mx-auto p-5  border-gray-300">
        {filteredUsers.map((user) => (
          user.isAdmin !== true && (
            <div
            key={user.uid}
            className=" bg-gray-300 m-4 rounded-xl p-6 hover:shadow-zinc-100"
          >
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <h2 className="text-2xl font-bold mb-5">User</h2>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button
                  className={`mt-2 px-4 py-2 ${
                    user.isBlocked ? "bg-green-500" : "bg-red-500"
                  } text-white rounded`}
                  onClick={() =>
                    handleBlockUser(user.username, !user.isBlocked)
                  }
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Posts</h2>
                <div className=" overflow-scroll h-10 pb-40 ">
                  {posts
                    .filter((post) => post.author === user.username)
                    .map((post) => (
                      <div key={post.id} className="">
                        <p className=" sticky top-0 bg-indigo-400 rounded-lg text-white mb- p-1">
                          <strong>Title:</strong> {post.title}
                        </p>
                        <p>
                          <strong>Author:</strong> {post.author}
                        </p>
                        <p>
                          <strong>Content:</strong> {post.content}
                        </p>
                        <button
                          className="mt-2 px-4 p-2 mb-2 bg-red-500 text-white rounded"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                      
                    ))}
                </div>
              </div>
            </div>
            </div>
            )
        ))}
      </div>
      </div>
      </div>
  );
};

export default AdminDashboard;
