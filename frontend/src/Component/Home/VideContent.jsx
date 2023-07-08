import React, { useEffect, useState } from 'react';
import "./VideoContent.css";
import VideoCard from './VideoCard';
import Modal from '../../Modal/Modal';
import NetError from './NetErr';
import Axios from '../../Axios/axios';
import { useSelector } from 'react-redux';

const VideoContent = ({ type }) => {

  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(true)
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [NetErr, setNetErr] = useState(false)
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        let Header;
        if(type === "sub") {
          Header = {
            Authorization: `Bearer ${currentUser.access_token}`
          }
        }
        const { data } = await Axios.get(`/videos/${type}`, {
          headers: Header
        } )

        setVideos(data.videos)
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          setNetErr(true)
        } else {
          setErrorMessage(error.message)
          setError(true)
        }
      }
    }
    loadVideos()
  }, [type])


  return (
    <>
      {
        error && <Modal modal={modal} setModal={setModal} message={errorMessage} />
      }
      {
        NetErr && (
          <NetError />
        )
      }
      <div className='flex flex-wrap my-5 md:mx-10 w-full gap-4 justify-center md:justify-normal '>
        {
          videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))
        }
      </div>



    </>
  )
}

export default VideoContent;