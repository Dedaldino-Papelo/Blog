import React from 'react'
import './style.css'

const CustomButtom = ({ children, ...props }) => {
  return (
    <button className='form-btn' {...props}>
        {children}
    </button>
  )
}

export default CustomButtom
