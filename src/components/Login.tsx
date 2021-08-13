import React, { useState } from "react";
import { validateEmail, validatePassword } from '../validator';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from '../firebase';

export const Login = (props: { setSignUp: VoidFunction }): JSX.Element => {
        const [email, setEmail] = useState<string>("");
        const isEmailValid = validateEmail(email);
        const [password, setPassword] = useState<string>("");
        const isPasswordValid = validatePassword(password);
        const [rememberMe, setRememberMe] = useState<boolean>(true);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<Error | null>(null);


        return (
                <>
                  { error ?
                    <div className="alert alert-danger" role="alert">
                      { error?.message }
                    </div> : null }

                  <div className="border rounded shadow-sm p-3 mb-5 bg-white rounded">
                    <form className="text-left">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="eg. example@email.com"
                          value={email}
                          onChange={(event) => {
                            event.preventDefault();
                            const text = event.target.value;
                            setEmail(text);
                          }}
                        />
                        { !isEmailValid ? <small id="emailHelpLogin" className="form-text text-danger">Please enter proper email address</small> : null }
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="exampleInputPassword1"
                          placeholder="******"
                          value={password}
                          onChange={(event) => {
                            event.preventDefault();
                            const text = event.target.value;
                            setPassword(text);
                          }}
                        />
                        { !isPasswordValid ? <small id="passwordHelpLogin" className="form-text text-danger">Your password must be at least 6 characters long.</small> : null }
                      </div>
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={rememberMe}
                          onChange={(event) => {
                            setRememberMe(!rememberMe);
                          }}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                      </div>
                      <button
                        disabled={!isEmailValid || !isPasswordValid}
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={(event) => {
                          setLoading(true);
                          setError(null);
                          signInWithEmailAndPassword(email, password, rememberMe, (response: any, err: any) => {
                            if (response) setLoading(false);
                            if (err) {
                              setLoading(false);
                              setError(err);
                            }
                          });
                        }}
                      >{ loading ? "Loading..." : "Sign In"}</button>
                    </form>
                    <div className="my-3"><em>Or</em></div>
                    <button
                      type="button"
                      className="btn btn-link btn-lg btn-block mb-3"
                      onClick={(event) => {
                        signInWithGoogle((err) => {
                          if (err) setError(err);
                        });
                      }}
                    >Login with Google</button>
                    <div className="border-top my-3" />
                    <span>Don't have an account yet? <button className="btn btn-light btn-sm" onClick={props.setSignUp}>Register here</button></span>
                  </div>
                </>
              );
            };