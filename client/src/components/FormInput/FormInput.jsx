import React from 'react'
import './style.css'

const FormInput = ({placeholder,name,handleChange, ...rest}) => {
  return (
      <input 
        className='form-input' 
        onChange={handleChange} 
        placeholder={placeholder}
        name={name}
        {...rest}
         />
      
  )
}

export default FormInput
