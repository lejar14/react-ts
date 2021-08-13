import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Welcome } from './components/Welcome';
import { auth, User } from './firebase';

type Path = ("welcome" | "sign-up" | "sign-in")

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [path, setPath] = useState<Path>("sign-in");
  const setSignUpPath = () => setPath("sign-up");
  const setSignInPath = () => setPath("sign-in");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUser(user);
        setPath("welcome");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });

  if (loading) {
    return (
      <div className="App">
        <div className="container mt-5">
          <div className="row justify-content-md-center">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-md-center">
          { path === "sign-in" ?
            <div className="col-sm-4">
              <Login setSignUp={setSignUpPath}/>
            </div> : null }
          { path === "sign-up" ?
            <div className="col-sm-4">
              <Signup setSignIn={setSignInPath}/>
            </div> : null }
          { user ?
            <div className="col-sm-8">
              <Welcome user={user}/>
            </div> : null }
        </div>
      </div>
    </div>
  );
}

export default App;