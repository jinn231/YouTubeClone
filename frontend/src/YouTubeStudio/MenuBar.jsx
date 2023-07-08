import Style from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/Slices/userSlice";
import axios from "axios";
import Axios from "../Axios/axios";

const MenuContainer = Style.div`
`

const MenuList = Style.ul`
    display: flex;
    border-bottom: 0.5px solid silver;
`

const liTagStyle = {
    borderBottom: "3px solid gray"
}

const MenuBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SignOut = async () => {
        await Axios.post("/auth/sign-out", null);
        dispatch(Logout())
        navigate("/")
        
    }

    return (
        <>
            <MenuContainer>
                <MenuList>
                    <li className="px-4 py-2 mx-10 cursor-pointer">
                        <Link to="#uploads">
                            Uploads
                        </Link>
                    </li>
                    <li className="px-4 py-2 mx-10 cursor-pointer">
                        <Link to="#videos">
                            Videos
                        </Link>
                    </li>
                    <li className="px-4 py-2 mx-10 cursor-pointer">
                        <Link to="#channel">
                            Channel
                        </Link>
                    </li>      
                    <li className="px-4 py-2 mx-10 cursor-pointer">
                        <button onClick={SignOut}>Logout</button>
                    </li>       
                             
                </MenuList>                
            </MenuContainer>            
        </>
    )  
}

export default MenuBar;