import ScrollMenu from "./ScrollMenu";
import VideoContent from "./VideContent";


const VideoList = ({type}) => {
  return (
    <>
      <div className=''>
          <ScrollMenu />
          <VideoContent type={type} />
      </div>
    </>
  );
};

export default VideoList;
