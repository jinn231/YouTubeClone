import Style from "styled-components";
import Card from "./Card";
import UserDetailBar from "./UserDetailBar";
import Comments from "./Comments";
import "./VideoContent.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoStart, fetchVideoSuccess, fetchVideoFail } from "../../redux/Slices/videoSlice";
import VideoPlayer from "./Video";
import NetError from "./../Home/NetErr";
import Axios from "./../../Axios/axios";

const Container = Style.div`
    width: 90%;
    margin: 5em auto;
    display: flex;
    gap:10px;
    overflow: hidden;
    flex-wrap: no-wrap;
    @media(max-width: 1249px){
        flex-wrap: wrap;
    }
    @media(max-width: 1240px){
        justify-content: center;
    }
    `
const LeftContainer = Style.div`
    width: 780px;
    @media(max-width: 800px){
        width: 100%;
        marginInline: auto;
    }
`

const RightContainer = Style.div`
    
`

const VideoContainer = Style.div`
    width: 100%;
    height: 467px;
    margin-bottom: 2em;
    @media(max-width: 800px){
        width: 100%;
        height: 300px;
    }
    @media(max-width: 600px){
        width: 100%;
        height: 240px;
    }
    @media(max-width: 400px){
        width: 100%;
        height: 200px;
    }
`
const Recommendation = Style.div`
  
`;

const Description = Style.div`
    padding: 1em;
    background: #f2f2f2;
    border-radius: 1em;
    margin: 1em 0;
`

const VideoContent = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();
    const { currentVideo } = useSelector(state => state.video)
    const dispatch = useDispatch();
    const query = searchParam.get("v");
    const [NetErr, setNetErr] = useState(false)

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if(!query){
            navigate("/")
        }else{

            increaseVideoView(query)
            dispatch(fetchVideoSuccess())
            fetchVideo(query)
            loadVideos()
            
        }
    }, [query, dispatch])

    const increaseVideoView = async (videoId) => {
        try {
            const res = await Axios.put(`/videos/views/${videoId}`)
        } catch (error) {

        }
    }

    const loadVideos = async () => {
        try {
          const {data} = await Axios.get(`/videos/random`)
  
          setVideos(data.videos)
        } catch (error) {
          console.log(error)
        }
      }

    const fetchVideo = async (videoId) => {
        try {
            const res = await Axios.get(`/videos/find/${videoId}`);

            dispatch(fetchVideoSuccess(res.data.video))
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                setNetErr(true)
            }   
        }

    } 

    const getUser = async (userId) => {
        const resp = await Axios.get(`/user/find/${userId}`)
    
        return resp.data.user;
    }

    const getComments = async () => {
        const resp = await Axios.get(`/cmts/${currentVideo._id}`)

        return resp.data;
    }

    return(
        <>
        {
            NetErr && <NetError />
        }
        {
            currentVideo && (
                <Container>
                <LeftContainer>
                    <VideoContainer>
                        <VideoPlayer />
                    </VideoContainer>
                    <UserDetailBar video={currentVideo} getUser={getUser} />
                    <Description>
                        {currentVideo.description}
                    </Description>
                    <Comments getComments={getComments} getUser={getUser} videoId={currentVideo._id} />
                </LeftContainer>            
                <RightContainer>
                <Recommendation>
                    {
                        videos.map(video => (
                            <Card key={video._id} type="sm" video={video}/>
                        ))
                    }
                </Recommendation>
                </RightContainer>
            </Container>    
            )
            }
        </>
    )
}

export default VideoContent;