import React from 'react'
import { GoogleLogin } from '@leecheuk/react-google-login';
function GoogleLoginButton() {


    const onSuccess=(res)=>{
        console.log("login success" , res.profileObj);
    }

    const onFailure=(res)=>{
        console.log("login success" , res);
    }
    return (
        <div>

            <GoogleLogin
                clientId="86656059051-uvelp63k1m6ob18qm0k608qu8eije3mr.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                )}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />,
        </div>
    )
}

export default GoogleLoginButton