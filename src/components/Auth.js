import React from "react";
import {auth,provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import '../styles/Auth.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const Auth = (props) => {
    const {setIsAuth} = props; 
    const signInwithGoogle = async() => {
        try{
        const result =  await signInWithPopup(auth,provider);
        // console.log(result);
        cookies.set("auth-token",result.user.refreshToken);
        setIsAuth(true);
        }catch(err){
            console.log(err);
        }
    };
  // !auth = classname for css
  return (
    <div className="auth">
      <p>Sign in with Google to start chatting</p>
      <button onClick={signInwithGoogle}>Sign in with Google</button>
    </div>
  );
};
