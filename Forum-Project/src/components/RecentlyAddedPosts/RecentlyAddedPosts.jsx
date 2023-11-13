import { useState } from "react";
import { getAllPosts } from "../../services/posts.service";
import SinglePost from "../../views/SinglePost/SinglePost";
import { useEffect } from "react";
import SortButton from "../SortButton/Sortbutton";
import { getCommentCount } from "../../services/comments.services";
import FilterButton from "../FilterButton/FilterButton";

const RecentlyAddedPosts = () => {

  const [recentlyAddedPosts, setRecentlyAddedPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((fetchedPosts) => {
        setRecentlyAddedPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error('Error fetching recently added posts:', error);
      });
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...recentlyAddedPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setRecentlyAddedPosts(sortedPostsByDate);
  };

  const sortPostsByComments = () => {
    Promise.all(
      recentlyAddedPosts.map((post) =>
        getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((sortedPostsByComments) => {
      const sortedPostsByCommentsOnly = [...sortedPostsByComments].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setRecentlyAddedPosts(sortedPostsByCommentsOnly);
    });
  };

  const filterPostsByTag = (tags) => {
    const filteredPosts = recentlyAddedPosts.filter((post) =>
      tags.every((tag) => post.tags && post.tags.includes(tag))
    );

    setRecentlyAddedPosts(filteredPosts);
  };
  return (
    <div className="bg-white py-5 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            Recently added posts
          </h3>
          <div className="flex flex-col space-y-4">
            <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
            <FilterButton onFilter={filterPostsByTag} />
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {recentlyAddedPosts.map((post) => (
            <div key={post.id} >
              <SinglePost value={post}></SinglePost>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default RecentlyAddedPosts;
