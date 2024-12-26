import React from 'react'
import "./Login.scss"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'

const Login = () => {
    
    const signIn = () => {
        signInWithPopup(auth, provider).catch((err) => {
            alert(err.message);
        });
    }

    return (
        <div className='login'>
            <div className='loginLogo'>
                <img src="./discordIcon.png" alt="" />
            </div>

            <button onClick={signIn}>ログイン</button>
        </div>
    )
}

export default Login