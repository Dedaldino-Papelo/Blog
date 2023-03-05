import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import CustomButton from '../CustomButtom/CustomButtom'
import './style.css'

const Banner = () => {
  const navigate = useNavigate()
  const { userInfo } = useContext(UserContext
    )
  const handleclick = () => {
    navigate('/create/post')
  } 

  return (
    <div className='banner'>
      <div className='banner-content'>
        <h1>Blog Dedaldino Papelo</h1>
        <p>Blog de Informações sobre as mais diversas areas da Tecnologia de Informação, desde a programação, Redes de Computadores, Inteligência Artificial e muito mais</p>
        
        {userInfo.result && 
            <button className='btn-create' onClick={handleclick}>
            create new post
          </button>
        }

      </div>
    </div>
  )
}

export default Banner
