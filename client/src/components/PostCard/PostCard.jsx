import React from "react";
import './style.css'
import { compareAsc, format } from 'date-fns'
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const PostCard = ({ posts }) => {
 const date = dayjs(posts.createdAt).format('DD/MM/YYYY') 
  return (
    <div className="card">
      <Link to={`/post/${posts._id}`}>
      <div className="card-img">
        <img
          className="img"
          src={posts.Image}
          alt="img"
        ></img>
      </div>
      <div className="card-body">
        <span>{posts.categoria}</span>
        <div className="card-content">
          <p>
           {posts.title}
          </p>
          <div className="card-footer">
            <span>{posts.createdAt ? date : ''}</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default PostCard;
