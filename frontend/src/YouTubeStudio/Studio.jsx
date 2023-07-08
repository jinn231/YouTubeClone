import React, { useEffect } from 'react'
import UserDetails from './UserDetails';
import Upload from './Upload';
const Studio = () => {

  const query = window.location.href;
  
  useEffect(() => {
    const p = query.split("#")[1]
  }, [])

  return (
    <>
      <UserDetails />
      <Upload />
    </>
  )
}

export default Studio;