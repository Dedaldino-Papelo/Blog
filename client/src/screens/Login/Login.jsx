import React, { useContext, useState } from 'react'
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import FormInput from "../../components/FormInput/FormInput";
import {Link, useNavigate} from 'react-router-dom'
import './style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../components/contexts/UserContext';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { setuserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const Reset = () => {
    setValues({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    try {
      const {data} = await axios.post("http://localhost:8000/user/login", {
        email,
        password
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setuserInfo(data);
      Reset();
      navigate("/");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="signup">
    <div className="signup-box">
      <form className="signup-form" onSubmit={handleSubmit}>
      <h2><span className="blue">Sign </span>in</h2>

        <FormInput
            type="text"
            name="email"
            value={values.email}
            placeholder="email"
            handleChange={handleChange}
          />

         <FormInput
            type="password"
            name="password"
            value={values.password}
            placeholder="password"
            handleChange={handleChange}
          />

        <CustomButtom type="submit">Login</CustomButtom>
        <Link className="go-login" to='/signup' >&#8592; Go to Register</Link>
      </form>
    </div>
  </div>
  )
}

export default Login
