import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
      title: "complete Frontend Bootcamp",
      description: "finish projects ",
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const {docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem =>({...elem.data(), id: elem.id }));
    console.log(posts);
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

  function isLoggedIn() {}

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
        </div>
      </div>
      {/* {loading ? "loading..." : user.email} */}
    </div>
  );
}

export default App;
