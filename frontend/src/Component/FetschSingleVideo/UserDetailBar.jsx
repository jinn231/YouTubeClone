import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Style from "styled-components";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dislike, like } from "./../../redux/Slices/videoSlice"
import { LoginSuccess, subscribtion } from "./../../redux/Slices/userSlice"
import Modal from '../../Modal/Modal';
import Cookies from 'universal-cookie';
import Axios from '../../Axios/axios';

const BtnContainer = Style.div`
    display: flex;
    align-items: center;
    padding: 1px;
`

const UserDetailBar = ({ video, getUser }) => {

    const [creator, setCreator] = useState();
    const { currentUser } = useSelector(state => state.user);
    const { currentVideo } = useSelector(state => state.video);
    const dispatch = useDispatch();
    const [errMesssage, setErrmessage] = useState("")
    const [modal, setModal] = useState(false)
    const cookie = new Cookies()

    useEffect(() => {
        getUser(video.creator)
            .then(user => {
                setCreator(user)
            })
    }, [video])

    const subUser = async (userId) => {
        try {
            const resp = await Axios.put(`/user/sub/${userId}`, null, { 
                headers: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
             })  
        
            dispatch(subscribtion(userId))
        } catch (error) {
            setErrmessage(error.message)
            setModal(!modal)
        }

    }

    const unSubUser = async (userId) => {
        try {
            const resp = await Axios.put(`/user/unsub/${userId}`, null, { 
                headers: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
             })
            
            dispatch(subscribtion(userId))
        } catch (error) {
            //// Todo 401 code
            setErrmessage(error.message)
            setModal(!modal)
        }
    }

    const likeVideo = async (videoId) => {
        try {
            console.log(cookie.get("access_cookie"))
            if(!currentVideo?.like.includes(currentUser._id)){
                const resp = await Axios.put(`/user/like/${videoId}`,null,{
                    headers: {
                        Authorization: `Bearer ${currentUser.access_token}`
                    }
                }
                );
            }

            dispatch(like(currentUser._id))
        
        } catch (error) {
            setErrmessage(error.message)
            setModal(!modal)
        }

    }

    const dislikeVideo = async (videoId) => {

        try {
            if(!currentVideo?.dislike.includes(currentUser._id)){
               const resp = await Axios.put(`/user/dislike/${videoId}`, null, { 
                    headers: {
                        Authorization: `Bearer ${currentUser.access_token}`
                    }
                });
            }

            dispatch(dislike(currentUser._id))
        
        } catch (error) {
                        setErrmessage(error.message)
            setModal(!modal)
        }
    }

    return (
        <>
            {
                modal && <Modal message={errMesssage} modal={modal} setModal={setModal} />
            }
            {
                creator && (
                    <div className="flex justify-between gap-5 flex-wrap">
                        <div className="flex gap-4">
                            <div className="">
                                <img src={creator.image} alt="" className='w-10 h-10 rounded-full bg-gray-200 cursor-pointer overflow-hidden' />
                            </div>
                            <h1 className=''>
                                <a className='font-bold'>{creator.name}</a>
                                <p className='text-sm '>{creator.subscriber} subscribers</p>
                            </h1>
                            <div>
                                {
                                   !currentUser?.subscriptedUser.includes(creator._id) ? (
                                        <button className='py-2 px-5 bg-black text-white rounded-full' onClick={e => subUser(creator._id)}>
                                            Subscribe
                                        </button>
                                    ) : (
                                        <BtnContainer>
                                            <button className='px-3 py-1 rounded-full bg-slate-200 flex flex-nowrap' onClick={e => unSubUser(creator._id)}>
                                                <p>Unsubscribe</p>
                                            </button>
                                        </BtnContainer>
                                    )
                                }


                            </div>

                        </div>
                        <div className='flex sm:gap-1 gap-5'>
                            <BtnContainer>
                                {
                                    !currentVideo?.like.includes(currentUser?._id) ? (
                                        <button className='px-3 py-1 rounded-l-full border-r border-black bg-slate-200' onClick={e => likeVideo(video._id)}><ThumbUpOffAltIcon fontSize='small' />{currentVideo.like.length}</button>                
                                    ) : (
                                        <button className='px-3 py-1 rounded-l-full border-r border-black bg-slate-200' onClick={e => likeVideo(video._id)}><ThumbUpAltIcon fontSize='small' />{currentVideo.like.length}</button>                
                                    )   
                                }
                                {
                                    !currentVideo?.dislike.includes(currentUser?._id) ? (
                                        <button className='px-3 py-1 rounded-r-full bg-slate-200' onClick={e => dislikeVideo(video._id)}><ThumbDownOffAltIcon fontSize='small' /></button>                
                                    ) : (
                                        <button className='px-3 py-1 rounded-r-full bg-slate-200' onClick={e => dislikeVideo(video._id)}><ThumbDownAltIcon fontSize='small' /></button>                
                                    ) 
                                }
                            </BtnContainer>
                            <BtnContainer>
                                <button className='px-3 py-1 rounded-full bg-slate-200 flex flex-nowrap'>
                                    <ReplyOutlinedIcon fontSize='small' /> <p className='hidden md:block'>Share</p>
                                </button>
                            </BtnContainer>
                            <BtnContainer>
                                <button className='px-3 py-1 rounded-full bg-slate-200 flex flex-nowrap'>
                                    <LibraryAddOutlinedIcon fontSize='small' /> <p className='hidden md:block' >Save</p>
                                </button>
                            </BtnContainer>
                            <BtnContainer>
                                <button className='px-2 py-1 rounded-full bg-slate-200'>
                                    <MoreHorizIcon fontSize='small' />
                                </button>
                            </BtnContainer>
                        </div>
                    </div>
                )
            }

        </>
    )
};

export default UserDetailBar;