import React, { useRef } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import "./VideoListScroll.css";

const ScrollMenu = () => {

    const scrollRef = useRef(null);

    const handleScroll = (scrollDirection) => {
        const scrollContainer = scrollRef.current;
        const scrollStep = 200;
        if(scrollContainer){
            if(scrollDirection === "left"){
                scrollContainer.scrollLeft = scrollContainer.scrollLeft + scrollStep;
                console.log(scrollContainer.scrollLeft)
            }else if(scrollDirection === "right"){
                scrollContainer.scrollLeft = scrollContainer.scrollLeft - scrollStep;
                console.log(scrollContainer.scrollLeft) 
            }
        }
    }

  return (
    <>
        <div className='flex flex-1'>
          <div className='mt-1'>
            <button className='hover:bg-slate-100 rounded-full p-2' onClick={() => handleScroll("right")}>
              <KeyboardArrowLeftOutlinedIcon />
            </button>
          </div>
          <div className='overflow-hidden' style={{ maxWidth: '90%' }}>
            <ul id='scroll_container' className='flex mx-4 my-2 w-full overflow-auto scroll-smooth' ref={scrollRef}>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>All</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Gaming</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Music</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Mixes</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Mobile Legend : Bang Bang</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Championships</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Material Art</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Computer programming</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Gadgets</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Live</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Comedy</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Bodyweight exercise</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Teams</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded'>Watched</li>
                    <li className='py-2 text-center px-3 whitespace-nowrap bg-slate-100 mx-2 text-sm rounded mr-10'>New to you</li>
            </ul>
          </div>
          <div className='mx-2 md:mx-5 mt-1'>
            <button className='hover:bg-slate-100 rounded-full p-2' onClick={() => handleScroll("left")}>
              <KeyboardArrowRightOutlinedIcon />
            </button>
          </div>
        </div>
    </>
  )
}

export default ScrollMenu;