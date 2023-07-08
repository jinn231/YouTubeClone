import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {format} from "timeago.js";
import { Link } from 'react-router-dom';
import VideoPlayer from '../FetschSingleVideo/Video';
import Axios from '../../Axios/axios';

const VideoCard = ({video}) => {

    const [channel, setChannel ] = useState("");

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const res = await Axios.get(`/user/find/${video.creator}`)

                setChannel(res.data.user)
            } catch (error) {
                console.log(error)   
            }
        }
        fetchChannel();
    }, [])

    return (
        <>
            <div id='card' style={{width:"360px"}} className='overflow-hidden'>
                <Link to={`/watch?v=${video._id}`}>
                    <div className='max-w-sm md:max-w-2xl h-52 bg-slate-200 rounded-xl hover:rounded-none overflow-hidden'>
                        <video className='w-full h-full' src={`${video.video}`} autoPlay muted></video>
                    </div>
                </Link>
                <div id='video__content_container' className='flex p-2 gap-2 justify-between relative'>
                    <div className='flex gap-5 flex-1'>
                        <img className='rounded-full w-8 h-8' src={channel.image} alt="" />
                        <div className=''>
                            <Link to={`/watch?v=${video._id}`}>
                                <p className='py-1 cursor-pointer text-overflow-ellipsis'>
                                    {video.title}
                                </p>
                            </Link>
                            <div className='text-sm my-1 text-gray-500 cursor-pointer hover:text-black w-auto'>{channel.name}</div>
                            <p className='text-sm my-1 text-gray-400'>{video.views} Viewers . {format(video.createdAt)}</p>
                        </div>
                    </div>


                    <div id='video__menu' className='transition duration-300 cursor-pointer'>
                        <svg className='p-2 w-9 h-9 hover:bg-slate-200 rounded-full' enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard