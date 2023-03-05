import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { toast } from "react-toastify";
import { UserContext } from "../../components/contexts/UserContext";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  async function getData() {
    const { data } = await axios.get(`${api.defaults.baseURL}/posts/${id}`);
    setPost(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const date = dayjs(post.createdAt).format("DD/MM/YYYY");

  const handleDelete = async () => {
    try {
      await axios.delete(`${api.defaults.baseURL}/posts/${id}`);
      navigate("/");
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className="container">
      <div className="post-image">
        <img src={post.Image} alt={post.title} />
      </div>
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div>
            {userInfo.result && (
              <>
                <FontAwesomeIcon
                  icon={faEdit}
                  size="lg"
                  style={{ color: "#0000aa", cursor: "pointer" }}
                  onClick={() => navigate(`/post/${post._id}/edit`)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ color: "#aa0000", cursor: "pointer", marginLeft: "15px" }}
                  onClick={handleDelete}
                />
              </>
            )}
          </div>
        </div>
        <span className="post-data color">{post.createdAt ? date : ""}</span>
        <p className="post-author color">
          Publicado por: {post.user ? post.user.username : ""}
        </p>
      </div>
      <div
        className="post-desc"
        dangerouslySetInnerHTML={{ __html: post.Description }}
      />
    </div>
  );
};

export default PostDetails;
