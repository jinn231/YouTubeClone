import axios from "axios";
import { useState } from "react";
import Style from "styled-components";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios/axios";
import { useSelector } from "react-redux";
import Loader from "../Loading/Loader";


const Btn = Style.button`
    background-color: blue;
    padding:8px 12px;
    border-radius: 1.5em;
`

const Input = Style.input`
    position: absolute;
    padding: 4px 0;
    opacity: 0;
`

const Upload = () => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate();
    

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setTitle(e.target.files[0].name.split(".")[0])
    }

    const handleUpload = async (e) => {
        setLoading(true)

        if(!file || !title) return ;

        const formData = new FormData();

        formData.append("title", title)
        formData.append("description", description)
        formData.append("file", file)
        // post formData to b

        await Axios.post("/videos/add", formData, { 
            headers: {
                Authorization: `Bearer ${currentUser.access_token}`
            }
            })
        setLoading(false)
        navigate("/")
    }


    return(
        <>
        {
            loading && (
                <div className="fixed bg-gray-200 top-0 w-screen h-screen flex justify-center items-center">
                    <Loader />
                </div>
            )
        }


        {
            !file ? (
                <div className="text-center flex flex-col justify-center items-center mt-10">
                    <img src="https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg" alt="logo" width="210px" height="210px" className="py-1" />
                    <h1 className="text-2xl font-robo my-1">Upload a video to get started</h1>
                    <p className="my-2">Start sharing your story and connecting with viewers. Videos that you upload will show up here.</p>
                    <div className="relative cursor-pointer mt-3 text-sm font-semibold">
                        <Input type="file" name="file" onChange={handleFileChange} />
                        <Btn className="text-white absoute">Upload videos</Btn>
                    </div>
                </div>
            ): (
                <div className="flex flex-col w-1/2 text-center mx-auto mt-20">
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} className="outline-none my-10 px-2 py-1" style={{ borderBottom: "1px solid black"}} placeholder="Title" />
                    <textarea name="description" onChange={e => setDescription(e.target.value)} value={description} className="outline-none px-2 py-1" style={{ border: "1px solid black" }} id="" cols="30" rows="5" placeholder="Description"></textarea>
                    <div>
                        <button className="p-2 px-4 bg-blue-500 text-white font-robo font-minibold m-4 rounded-full" onClick={handleUpload}>Upload</button>
                    </div>
                </div>
            )
        }
            
        </>
    )

};

export default Upload;