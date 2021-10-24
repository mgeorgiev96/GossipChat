import React,{useEffect} from 'react'

function Login() {
    useEffect(()=>{
        window.location.replace("/login")
    },[])
    return (
        <div className='login_section'>
        </div>
    )
}


export default Login;
