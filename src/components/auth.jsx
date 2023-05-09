import React, { useState, useEffect } from "react";
import { Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUserWithEmailAndPassword, signInWithPopup,onAuthStateChanged, signOut,signInWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";
import { auth, googleProvider } from "../config/firebase";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [AuthUser, setAuthUser] = useState(null);

   const userPhoto = auth?.currentUser?.photoURL

//   sign Up function
  const SignUp = async () => {
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userDetails) => console.log(userDetails))
      .catch((err) => console.log(err));
  };
//   Sign In function
  const SignIn = async () => {
    
    await signInWithEmailAndPassword(auth, email, password)
      .then((userDetails) => console.log(userDetails))
      .catch((err) => console.log(err));
  };
//  Sign in with Google function
  const SignInWithGoogle = async () => {
  
    await signInWithPopup(auth, googleProvider)
      .then((userDetails) => console.log(userDetails))
      .catch((err) => console.log(err));
  };
//   Sign Out function
  const SignOut = async () => {
    
    await signOut(auth)
      .then((userDetails) => console.log(userDetails))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <div className="container">
      <div>
        <form onSubmit={SignIn}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email...."
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password..."
          />
          <Button type="submit">Sign In</Button>
          <Button onClick={SignInWithGoogle}>Sign In with Google</Button>
          <Button onClick={SignUp}>Sign Up</Button>
        </form>
        <div className="showStatus">
        {AuthUser ? (
        <>
          <p>{`Signed In as ${auth.currentUser.email}`} <img src={userPhoto} alt="" /> </p>
          <Button onClick={SignOut} >Sign Out</Button>
        </>
      ) : (
        <p>Signned Out</p>
      )}        </div>
      </div>
    </div>
  );
};
export const user = () => {};
