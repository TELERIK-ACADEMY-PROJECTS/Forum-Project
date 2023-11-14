import { useState, useEffect } from 'react';
import { getAllPosts } from '../../../services/posts.service';
import SortButton from '../../../components/SortButton/Sortbutton';
import SinglePost from '../../../views/SinglePost/SinglePost';
import { getCommentCount } from '../../../services/comments.services';


const Watch = () => {
  const [appleWatchPosts, setAppleWatchPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getAllPosts()
        .then((fetchedPosts) => {
          setAppleWatchPosts(fetchedPosts);

          const filteredPosts = fetchedPosts.filter(
            (post) => post.tags && post.tags.includes('applewatch')
          );
          setAppleWatchPosts(filteredPosts);
        })
        .catch((error) => {
          console.error('Error fetching and filtering posts:', error);
        });
    };

    fetchData();
  }, []);

  const sortPosts = () => {
    const sortedPostsByDate = [...appleWatchPosts].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    setAppleWatchPosts(sortedPostsByDate);
  };

  const sortPostsByComments = () => {
    Promise.all(
      appleWatchPosts.map((post) =>
      getCommentCount(post.id).then((commentCount) => ({ ...post, commentCount }))
      )
    ).then((sortedPostsByComments) => {
      const sortedPostsByCommentsOnly = [...sortedPostsByComments].sort(
        (a, b) => b.commentCount - a.commentCount
      );
      setAppleWatchPosts(sortedPostsByCommentsOnly);
    });
  };

  return (
    <section className=" bg-white dark:bg-gray-900 bg-fixed bg-hero-pattern bg-contain">

    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-0 mb-8  box-decoration-slice bg-gradient-to-r from-indigo-600 to-black-500 text-white px-2 rounded-md">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">See all Apple watch topics 👇</h2>
      </div>
      <div className=" flex-row space-y-4 justify-end pb-10 z-10">
          <SortButton onSort={sortPosts} onSortByComments={sortPostsByComments} />
        </div>
      <div className="grid gap-8 lg:grid-cols-2">

        {appleWatchPosts.map((post) => (
          <div key={post.id} >
            <SinglePost value={post}></SinglePost>
          </div>
        ))}
      </div>
    </div>

  </section>
  )
}


export default Watch;