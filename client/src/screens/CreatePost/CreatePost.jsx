import React, { useContext, useState } from 'react'
import FormInput from '../../components/FormInput/FormInput'
import CustomButton from '../../components/CustomButtom/CustomButtom'
import './style.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../components/contexts/UserContext'
import axios from 'axios'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const { userInfo } = useContext(UserContext)
  const [Description, setDescription] = useState('');
  const [values, setValues] = useState({
    categoria: "",
    title: "",
    Image: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault()

    const { title,Image,categoria } = values
    const id = userInfo.result.createUser._id
    const token = userInfo.result.token
  
    try {
      await axios.post(`${api.defaults.baseURL}/posts/new/${id}`,{
        categoria,
        title,
        Image,
        Description,
        user: id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className='container creat-post'>
      <div className='form'>
        <h1>Create New Post</h1>
      <form action="" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={values.categoria}
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="title"
            placeholder="Title"
            value={values.title}
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="Image"
            placeholder="Image"
            value={values.Image}
            handleChange={handleChange}
          />

          <ReactQuill 
            style={{marginBottom: '10px'}} 
            value={Description} onChange={setDescription}
            />
          <CustomButton type="submit">Create Post</CustomButton>
      </form>
      </div>
    </div>
  )
}

export default CreatePost
