import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserOutlined,MailOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { useDispatch } from 'react-redux';
import { authorization } from '../Redux/MovieSlice';


const Login = () => {

    const [showLogin,setShowLogin]=useState(false);
    const [data,setData]=useState([]);
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
      } = useForm()
   
       
      const onSubmitSingUp = (data) => {
            
        if (data.password !== data.confirmPassword) {
          alert('Passwords do not match');
          return;
        }

            const existingUser=JSON.parse(localStorage.getItem("users"))||[];
        
            const newUser={
              username:data.username,
              email:data.email,
              password:data.password
            }

            existingUser.push(newUser);

            localStorage.setItem("user",JSON.stringify(existingUser));
            console.log("user registered",newUser)
            setShowLogin(false)

      }

     const onSubmitLogin=(data)=>{
           const existingUser=JSON.parse(localStorage.getItem("user"));

         const user=  existingUser.find((el)=>el.email==data.email && el.password==data.password);

          if(user){
             alert("login succefull")
            navigate("/movies")
            dispatch(authorization(true))
          }else{
             alert("wrong credential")
          }
     }

      const handleLogin=()=>{
          setShowLogin(!showLogin)
      }

      
        
      

  return (
    <div id='loginMain'>
         <div id='form'>
            <h1 className='heading'>{showLogin? "SingUP":"Login"}</h1>

            {
                showLogin? (<>
           <form id='loginForm' onSubmit={handleSubmit(onSubmitSingUp)}>
            <label>UserName:</label>
            <input className='input' type='text' size="large" prefix={<UserOutlined />} name='username' placeholder="UserName" {...register("username", { required: true })} />
             <label>Email:</label>
            <input className='input' type='text' size='large' prefix={<MailOutlined />}  name='email' placeholder="Email"  {...register("email", { required: true })}  />
            <label>Password:</label>
            <input className='input' type='password' size="large" name="password" placeholder="Password"  {...register("password", { required: true,minLength:4 })} />
            <label>Confirm Password:</label>
            <input className='input' type='password' size="large" name='confirmPassword' placeholder="Confirm Password"  {...register("confirmPassword", { required: true,minLength:4 })}  />
            
           

            <input type="submit" />
            
          </form>
                </>):(<>  <form id='loginForm' onSubmit={handleSubmit(onSubmitLogin)}>
             <label>Email:</label>
            <input className='input' size="large" type='text' name='email' prefix={<MailOutlined />} placeholder="Email" {...register("email", { required: true })} />
            <label>Password:</label>
            <input className='input' size="large" type='password' name='password' placeholder="Password" {...register("password", { required: true })}  />
           
          
            <input type="submit" />
            
          </form>
                </>)
            }
         

        
           <div id='link'>
           <Link onClick={handleLogin}>
           {showLogin?  "Already registered? Login here":"New user? Register here"}
           </Link>
           
           </div>
          </div>
    </div>
  )
}

export default Login