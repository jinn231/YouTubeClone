import React from 'react'
import SunspotLoader from './Sunspot'
import style, {keyframes} from "styled-components"
import Style from "./Loader.module.css"

const LoaderContainer = style.div`
    height: 100vh;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const Loader = () => {
  return (
    <LoaderContainer className={Style.loader}>
        <h1 className='block text-4xl font-bold space-x-3'>Uploading...Please Wait !</h1>
        <SunspotLoader />
    </LoaderContainer>
  )
}

export default Loader