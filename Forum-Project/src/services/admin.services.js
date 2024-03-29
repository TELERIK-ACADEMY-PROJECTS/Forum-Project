import { get, set, ref, update, remove } from "firebase/database";
import { database } from "../config/firebase-config";

export const getAdminByHandle = (firstName) => {
  return get(ref(database, `users/${firstName}`));
};

export const createAdminHandle = (firstName, lastName, email, phone, username, uid) => {
  return set(ref(database, `users/${username}`), {
    firstName,
    lastName,
    email,
    phone,
    username,
    uid,
    profiPhoto: "",
    isAdmin: true,
    isBlocked: false,
    createdOn: Date.now(),
  });
};

// function for searching user by username or email
export const adminSearchUser = (searchTerm) => {
  return get(ref(database, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      throw new Error(`User with searchTerm ${searchTerm} does not exist!`);
    }
    const users = snapshot.val();
    const filteredUsers = Object.keys(users)
    
      .filter(
        (key) =>
          (users[key]?.username && users[key].username.includes(searchTerm)) ||
          (users[key]?.email && users[key].email.includes(searchTerm)) ||
          (users[key]?.firstName && users[key].firstName.includes(searchTerm))
      )
      .map((key) => users[key]);
    return filteredUsers;
  });
};

export const blockUser = (username, blockStatus,) => {
  return update(ref(database, `users/${username}`), {
    isBlocked: blockStatus,
  
  });
};


export const deletePost = (postId) => {
  return remove(ref(database, `posts/${postId}`));
};


export const makeModerator = (username, status,) => {
  return update(ref(database, `users/${username}`), {
    isModerator: status,
  
  });
};