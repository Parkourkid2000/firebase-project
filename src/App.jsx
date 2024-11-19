import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import React, { useState } from "react";

import "./app.css";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "Finish  borderlands 4",
      description: "finish Steaming Era ",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = getDoc(postRef);
    return postSnap.data();
  }

  async function updatePost() {
    const hardcodedId = "6MAlsj0v28WxE7wa6Ivz";
    const postRef = await doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      description: "eifbrifu3333333",
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "6MAlsj0v28WxE7wa6Ivz";
    const postRef = doc(db, "posts", hardcodedId);
    deletePost(postRef);
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "V5Oa9nFHrdaqoVhYM9dVR7o5PEn1")
    );
    const { docs } = await getDoc(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);
  function register() {
    createUserWithEmailAndPassword(auth, "TonyTesla@gmail.com", "password123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "TonyTesla@gmail.com", "password123")
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <div className="btn__container">
        {/* <h1>Tesla.com</h1> */}

        <div className="btns">
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
          <button onClick={logout}>{user.email}</button>
          <button onClick={createPost}>Create Post</button>
          <button onClick={getAllPosts}>Get All Posts</button>
          <button onClick={getPostById}>Get Post by Id</button>
          <button onClick={getPostByUid}>Get Post by Uid</button>
          <button onClick={updatePost}>Update Post</button>
          <button onClick={deletePost}>Delete Post</button>
        </div>
      </div>
      {/* {loading ? "loading..." : user.email} */}
    </div>
  );
}

export default App;
