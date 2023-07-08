import Menu from "./Menu";
import "./Content.css";
import MiniMenu from "./MiniMenu";
import VideoList from "./VideoList";
import { useMediaQuery } from "@mui/material";

const Content = ({type}) => {

    const media = useMediaQuery('(max-width:1300px)')

    return (
        <>
            <div className="grid grid-cols-5 mt-5 relative overflow-hidden"  style={{ marginTop: "5rem" }}>
                <div className="col-span-1 hidden md:block relative max-w-96 h-screen overflow-hidden ">
                    {
                        !media ? (
                            <div id="scroll" style={{ width: "270px" }} className="h-full overflow-scroll p-1 hidden md:hidden lg:block fixed">
                                <Menu />
                            </div>
                        ) : (
                            <div className="md:block hidden fixed">
                                <MiniMenu />
                            </div>
                        )
                    }
                </div>
                <div className="w-full col-span-5 md:col-span-4 relative px-5">
                    <div className="relative">
                        <VideoList type={type} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content;