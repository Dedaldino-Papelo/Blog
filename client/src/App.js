import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./components/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Register from "./screens/Register/Register";
import Banner from "./components/banner/banner";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Header from "./components/header/Header";
import PostDetails from "./screens/PostDetails/PostDetails";
import CreatePost from './screens/CreatePost/CreatePost'
import EditPost from './screens/PostEdit/PostEdit'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/create/post" element={<CreatePost />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
