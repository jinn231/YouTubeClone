import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import axios from "axios";
import Axios from "../../Axios/axios";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = {
  "border": `none`,
  "borderBottom": `1px solid black`,
  "color": `${({ theme }) => theme.text}`,
  "backgroundColor": `transparent`,
  "outline": `none`,
  "padding": `5px`,
  "width": `100%`,
}

const Comments = ({getComments, getUser, videoId}) => {

  const {currentUser} = useSelector(state => state.user)
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState(""); 

  useEffect(() => {
    getComments()
    .then(cmts => {
      setComments(cmts)
    })
    .catch(err => {
      //todo
    })
  }, [])

  const handleClick = async () => {
    try {
      const data = {
        videoId,
        description: comment
      } 
  
      const resp = await Axios.post("/cmts/add-cmt", data , { 
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
       })
  
      setComment("")
      getComments()
      .then(cmts => {
        setComments(cmts)
      })
    } catch (error) {
      
    }

  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser ? currentUser.image : "/172628_user_male_icon.png"} />
        <input style={Input} type="text" placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} />
        <SendIcon className="cursor-pointer" onClick={handleClick} />
      </NewComment>
      { comments &&
        comments.map(cmt => (
          <Comment key={cmt._id} cmt={cmt} getUser={getUser} />
        ))
      }
    </Container>
  );
};

export default Comments;