import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { getUserByHandle } from "../../services/users.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addNewComment } from "../../services/comments.services";
import { useParams } from "react-router-dom";
import {
  MIN_COMMENT_TITLE_LENGTH,
  MAX_COMMENT_TITLE_LENGTH,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH
} from "../../common/constants";


const NewComment = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPostSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Fields cannot be empty");
      return;
    }

    if (title.length < MIN_COMMENT_TITLE_LENGTH || title.length > MAX_COMMENT_TITLE_LENGTH) {
      alert(`Title should be between ${MIN_COMMENT_TITLE_LENGTH} and ${MAX_COMMENT_TITLE_LENGTH} characters`);
      return;
    }

    if (content.length < MIN_COMMENT_LENGTH || content.length > MAX_COMMENT_LENGTH) {
      alert(`Content length should be between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters`);
      return;
    }

    const userName = userData.username;

    getUserByHandle(userName).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.isBlocked === true) {
          toast.error("This user is blocked and cannot create comments.");
          setTimeout(() => {
            navigate("/");
          }, 2100);
        } else if (userData.isBlocked === false) {

          addNewComment(id, userName, title, content)
            .then((newComment) => {
              setTitle("");
              setContent("");
              setIsCommentSubmitted(true);
              toast("comment submitted successfully!");
              console.log("New comment:", newComment);

            })
            .catch((error) => {
              toast.error("Error submitting comment:", error);
              toast.error("An error occurred while submitting the comment.");
            });
          setTimeout(() => {
            navigate("/");
          }, 2100);
        }
      } else {
        toast.error("No such user exists!");
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">New Comment</h2>
      <form onSubmit={commentSubmitHandler}>
        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="Title"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add comment
            </label>
            <textarea
              rows="4"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none"
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        <div className="mt-6 mb-40 flex items-center justify-end gap-x-6">
          <button type="button" 
          onClick={handleCancel}
          className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Submit
          </button>
        </div>
        {isPostSubmitted && (
          <p className="text-green-500 mt-2">Comment successfully submitted!</p>
        )}
      </form>
    </div>
  );
};

export default NewComment;
