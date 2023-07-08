import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js"
import Axios from "../../Axios/axios";

const Container = styled.div`
  width: 100%;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  flex-grow: 1;
`;

const Video = styled.video`
  width: 30%;
  height: 100%;
  background-color: #999;
  height: 100%;
  @media(max-width: 520px){
    height: 100px;
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ video ,type }) => {

    const [user, setUser] = useState();
  
    useEffect(() => {
      fetchChannel();
    }, [])

    const fetchChannel = async () => {
      try {
          const res = await Axios.get(`/user/find/${video.creator}`)

          setUser(res.data.user)
      } catch (error) {
          console.log(error)   
      }
    }

  return (

    <Link to={`/watch?v=${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Video
          src={video?.video}
          muted
          autoPlay
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{user?.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;