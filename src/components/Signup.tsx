import React, { useState } from "react";
import { validateEmail, validatePassword } from '../validator';
import { createUserWithEmailAndPassword } from '../firebase';

export const Signup = (props: any): JSX.Element => {
        const [email, setEmail] = useState<string>("");
        const isEmailValid = validateEmail(email);
        const [password, setPassword] = useState<string>("");
        const isPasswordValid = validatePassword(password);
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
                        { !isEmailValid ? <small id="emailHelpRegister" className="form-text text-danger">We'll never share your personal data with anyone else.</small> : null }
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="exampleInputPassword1"
                          placeholder={"*********"}
                          value={password}
                          onChange={(event) => {
                            event.preventDefault();
                            const text = event.target.value;
                            setPassword(text);
                          }}
                        />
                        { !isPasswordValid ? <small id="passwordHelpRegister" className="form-text text-danger">Your password must be at least 6 characters long.</small> : null }
                      </div>
                      <button
                        disabled={!isPasswordValid || !isEmailValid}
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={(event) => {
                          setError(null);
                          setLoading(true);
                          createUserWithEmailAndPassword(email, password, (res, err) => {
                            if (res) setLoading(false);
                            if (err) {
                              setLoading(false);
                              setError(err);
                            }
                          });
                        }}
                      >{ loading ? "Loading..." : "Sign Up"}</button>
                    </form>
                    <div className="border-top my-3" />
                    <span>Have an account? <button className="btn btn-light btn-sm" onClick={props.setSignIn}>Login here</button></span>
                  </div>
                </>
              );
            };

