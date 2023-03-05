import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButtom from '../../components/CustomButtom/CustomButtom';
import FormInput from '../../components/FormInput/FormInput';
import { api } from '../../services/api';

const PostEdit = () => {

  const [Description, setDescription] = useState('');
  const [values, setValues] = useState({
    categoria: "",
    title: "",
    Image: "",
  });

  async function getData() {
    const { data } = await axios.get(`${api.defaults.baseURL}/posts/${id}`);
    setDescription(data.Description)
    setValues({
      categoria: data.categoria,
      title: data.title,
      Image: data.Image
    });
  }

  useEffect(() => {
    getData()
  }, [])

  const { id } = useParams();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {categoria, title, Image} = values
    try {
      await axios.patch(`${api.defaults.baseURL}/posts/${id}`, {
        categoria,
        title,
        Image,
        Description
      });
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container creat-post'>
      <div className='form'>
        <h1>Edit This Post</h1>
      <form action="" onSubmit={handleSubmit}>
        
          <FormInput
            type="text"
            name="categoria"
            value={values.categoria}
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="title"
            value={values.title}
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="Image"
            value={values.Image}
            handleChange={handleChange}
          />

          <ReactQuill 
            style={{marginBottom: '10px'}} 
            value={Description} onChange={setDescription}
            />
          <CustomButtom type="submit">Edit Post</CustomButtom>
      </form>
      </div>
    </div>
  )
}

export default PostEdit
