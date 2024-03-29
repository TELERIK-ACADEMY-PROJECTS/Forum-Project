import { ref, push, get, query, equalTo, orderByChild, remove, update } from 'firebase/database';
import { database } from '../config/firebase-config';

export const getCommentById = (id) => {

  return get(ref(database, `comments/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Comment with id ${id} does not exist!`);
      }
      const comment = result.val();       

      return comment;
    });
};

const fromCommentsDocument = snapshot => {
  const commentsDocument = snapshot.val();

  return Object.keys(commentsDocument).map(key => {
    const comment = commentsDocument[key];

    return {
      ...comment,
      id: key,
      createdOn: new Date(comment.createdOn),
    };
  });
}
export const getCommentsById = (id) => {

  return get(query(ref(database, 'comments'), orderByChild('postId'), equalTo(id)))
    .then(snapshot => {
      if (!snapshot.exists()) return [];

      return fromCommentsDocument(snapshot);
    });
};

export const getAllComments = () => {

  return get(ref(database, 'comments'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      return fromCommentsDocument(snapshot);
    });
};

export const addNewComment = (postId, userName, title, content) => {

  return push(
    ref(database, 'comments'),
    {
      postId,
      userName,
      title,
      content,
      createdOn: Date.now(),
    },
  )
    .then(result => {
      return getCommentById(result.key);
    })
    .then(newComment => {
      return getCommentCount(postId)
        .then(updatedCount => {
          return { newComment, updatedCount };
        });
    });
}

export const deleteComment = (commentId) => {
  return remove(ref(database, `comments/${commentId}`));
};

export const getCommentCount = (postId) => {
  return get(query(ref(database, 'comments'), orderByChild('postId'), equalTo(postId)))
    .then((snapshot) => {
      if (!snapshot.exists()) return 0;
      return Object.keys(snapshot.val()).length;
    })
};

export const commentUpdateHandler = (id, content) => {

  const path = `comments/${id}/content`;

  return update(ref(database), { [path]: content });
};
