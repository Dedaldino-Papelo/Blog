import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import './style.css'

const Header = () => {
  const {setuserInfo,userInfo} = useContext(UserContext)

  const handleLogout = () => {
    setuserInfo("")
  }
  return (
    <div className='header'>
      <div className='inner-header container'>
        <Link to='/'>Blog.<span>3D</span></Link>
        <nav className='navbar'>
          {userInfo.result ? (
            <Link to='/' onClick={handleLogout}>Logout</Link>
          ):(
            <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Register</Link>
            </>
          )}

        </nav>
      </div>
    </div>
  )
}

export default Header
