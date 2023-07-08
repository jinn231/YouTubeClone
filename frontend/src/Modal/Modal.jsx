import React from 'react'

const Modal = ({modal, setModal, message}) => {
  return (
    <>
        {
            modal && (
                <div className='w-full h-full absolute m-2 flex flex-col justify-center items-center top-0 mb-10 ' >
                    <div className='w-96 px-5 py-3 border shadow-md relative bg-gray-50'>
                        <i className='absolute top-0 right-0 px-5 py-2 cursor-pointer' onClick={e => setModal(!modal) }>X</i>
                        <p className='font-robo font-medium text-2xl'>Error</p>
                        <p className='py-2 font-bold'>{message}</p>
                    </div>
                </div>
            )
        }
    </>

  )
}

export default Modal;