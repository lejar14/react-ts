import React from "react";
import { auth, User } from '../firebase';

export const Welcome = (props: any): JSX.Element => {
  return (
    <div className="jumbotron text-left">
      <h1 className="display-4">Hello </h1>
      <h2 className="display-4">{props.user.email}</h2>
      <p className="lead">Welcome to my first project with react typescript</p>
      <hr className="my-4" />
      <p> this website will update soon. </p>
      <button
        className="btn btn btn-outline-danger"
        onClick={(event) => {
          auth.signOut().then(() => {
            window.location.reload();
          });
        }}
      >Sign Out</button>
    </div>
  );
};