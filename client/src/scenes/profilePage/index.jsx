/* eslint-disable no-unused-vars */
import { Box,useMediaQuery  } from "@mui/material"
import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import NavBar from "scenes/navBar"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import MyPostWidget from "scenes/widgets/MyPostWidget"  
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"


const ProfilePage = () => {
  const [user,setUser] = useState(null)
  const {userId} = useParams()
  const token = useSelector(state=>state.token)
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")

  const getUser = async()=>{
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const {data:userCurr} = await response.json()
    setUser(userCurr)

  }

  useEffect(()=>{
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!user) return null
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget user={user} isProfile={true}/>
          <Box m="2rem 0"/>
          <FriendListWidget userId= {userId}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt="0rem 0rem"
        >
          <PostsWidget userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage