import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import FormInput from "../../components/FormInput/FormInput";
import "./style.css";
import { UserContext } from "../../components/contexts/UserContext";
import { toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
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
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = values;
    try {
      const { data } = await axios.post("http://localhost:8000/user/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data)
      setuserInfo(data);
      Reset();
      navigate("/");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>
            <span className="blue">Sign </span>Up
          </h2>

          <FormInput
            type="text"
            name="email"
            value={values.email}
            placeholder="email"
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="username"
            value={values.username}
            placeholder="username"
            handleChange={handleChange}
          />

          <FormInput
            type="password"
            name="password"
            value={values.password}
            placeholder="password"
            handleChange={handleChange}
          />
          <CustomButtom type="submit">Register</CustomButtom>
          <Link className="go-login" to="/login">
            &#8592; Voltar para Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
