import { useSelector } from "react-redux";
import Style from "styled-components"
import MenuBar from "./MenuBar";

const Container = Style.div`
    width: full;
    display: flex;
    justify-content: space-between;
    margin-top: 6em;
    padding: 0 4em;
    padding-bottom: 0.5em;
    `

const UserContainer = Style.div`
    display: flex;
    
`;

const User = Style.div`
    padding: 1em;
`

const BtnContainer = Style.div`
    display: flex;
        `;

const ImageContainer = Style.div``

const Button = Style.button`
    background:#f2f2f2;
    padding: 8px 13px;
    border-radius: 1em; 
    margin: 1em;
    `


const UserDetails = () => {

    const {currentUser} = useSelector(state => state.user)
    

    return(
        <>
            <Container>
                <UserContainer>
                    <ImageContainer>
                        <img src={currentUser?.image} alt="logo" className="rounded-full" width="130px" height="130px" />
                    </ImageContainer>
                    <User>
                        <p className="text-2xl">{currentUser?.name}</p>
                        <div className="text-sm opacity-60 py-2">
                            <p>{currentUser?.subscriber === 0 ? "No" : currentUser?.subscriber} Subscribers</p>    
                        </div> 
                        <div className="opacity-60 text-sm py-1">More about this channel</div>
                    </User>
                </UserContainer>
                <BtnContainer>
                        <div>
                            <Button>Customize Channel</Button>
                        </div>
                        <div>
                            <Button>Manag Videos</Button>
                        </div>
                   
                </BtnContainer>
            </Container>
            <MenuBar />
        </>
    )
};

export default UserDetails;