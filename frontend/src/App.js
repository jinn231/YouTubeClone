import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom";
import VideoContent from "./Component/FetschSingleVideo/VideoContent";
import { useEffect } from "react";
import { LoginFail, LoginSuccess } from "./redux/Slices/userSlice"
import { useDispatch, useSelector } from "react-redux";
import Studio from "./YouTubeStudio/Studio";
import Modal from "./Modal/Modal";
import Axios from "./Axios/axios";

function App() {

  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser){
      const data = {
        email: currentUser.email,
        name: currentUser.name,
        image: currentUser.image
      }

      Axios.post("/auth/google", data, { 
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      })
      .then(resp => {
        dispatch(LoginSuccess(resp.data))
      })
      .catch(err => {
        dispatch(LoginFail())
      })
    }
  }, [])

  return (
    <>
      <Header />
      <Routes>  
        <Route path="/">
          <Route index element={<Home type="random" />} /> 
          <Route path="trend" element={<Home type="trend" />} /> 
          <Route path="sub" element={<Home type="sub" />} /> 
          <Route path="/watch" element={<VideoContent />} />
          <Route path="/channel/:id" element={<Studio />} />
          <Route path="/*" element={<Modal />} />
        </Route>

        <Route path="/channel/:id" >
          <Route index element={<Studio />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
