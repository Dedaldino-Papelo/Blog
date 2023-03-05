import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import Banner from '../../components/banner/banner'
import axios from 'axios';
import { UserContext } from '../../components/contexts/UserContext';
import PostCard from '../../components/PostCard/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([])

  const getData = async () => {
    const { data } = await axios.get("http://localhost:8000/posts")
    setPosts(data)
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Banner />
        <div className='post container'>
          {
            posts.map((post) => (
              <PostCard key={post._id} posts={post} />
            ))
          }
        </div>
    </div>
    
  )
}

export default Home
