import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LoginLogo from '../images/loginLogo.png'


const fieldStyles = {
    'width': '80%',
    'margin': '0 auto'
}

function Login() {
    const [page,setPage] = useState(true)
    const animateLoginPage = ()=>{
        let rightSide = document.querySelector('.background_login')
        let leftSide = document.querySelector('.login_form')
        if(rightSide.classList.contains('animateScreen1')){
            rightSide.classList.add('animateScreen2')
            leftSide.classList.add('animateScreen2')
            rightSide.classList.remove('animateScreen1')
            leftSide.classList.remove('animateScreen')
        }else{
            rightSide.classList.add('animateScreen1')
            leftSide.classList.add('animateScreen')
            rightSide.classList.remove('animateScreen2')
            leftSide.classList.remove('animateScreen2')
        }

        setTimeout(()=>{
            setPage(!page)
        },150)
    }
    return (
        <div className='login_section'>
            <div className='login_container'>
                {(()=>{
                    if(page){
                        return <form action='/login' method='POST' className='login_form'>
                                    <h2>Login</h2>
                                    <a href='/api/google' className='google_button'>Sign in with Google <img src="https://img.icons8.com/fluent/48/000000/google-logo.png"/></a>
                                    <br></br>
                                    <span style={{'borderBottom':'1px solid black','width':'28px','margin':'0 auto'}}>OR</span>
                                    <br></br>
                                    <TextField name='username' style={fieldStyles} required type='email' label='Email...' variant='outlined'></TextField>
                                    <br></br>
                                    <TextField name='password' style={fieldStyles} required type='password' label='Password...' variant='outlined'></TextField>
                                    <br></br>
                                    <Button type='submit' variant='contained'>Login</Button>
                                    <p>No Account? <a onClick={animateLoginPage}>Click Here</a></p>
                                </form>
                    }else{
                        return  <form action='/create-account' method="POST" className='login_form'>
                                    <h2>Sign up</h2>
                                    <br></br>
                                    <TextField name='username' style={fieldStyles} required type='email' label='Email...' variant='outlined'></TextField>
                                    <br></br>
                                    <TextField name='password' style={fieldStyles} required type='password' label='Password...' variant='outlined'></TextField>
                                    <br></br>
                                    <TextField name='name' style={fieldStyles} required type='text' label='Name...' variant='outlined'></TextField>
                                    <br></br>
                                    <Button style={{'width': '100px'}} type='submit' variant='contained'>Sign up</Button>
                
                                    <p>Have an account? <a onClick={animateLoginPage}>Click Here</a></p>
                                </form>
                    }
                })()}
                <div className='background_login' style={{'backgroundImage':`url(${LoginLogo})`}}>

                </div>
            </div>
        </div>
    )
}


export default Login;
