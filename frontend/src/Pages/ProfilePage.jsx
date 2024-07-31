import React from 'react'
import CreatePostNavBar from '../Components/PostsPageCompo/CreatePostnavBar/CreatePostNavBar'
import Profile from '../Components/Login_Post_Profile/Profile/Profile'
import ProfileMiddle from '../Components/Login_Post_Profile/Profile/ProfileMiddle'
import './ProfilePage.css'
const ProfilePage = () => {
  return (
    <div>
      <CreatePostNavBar/>
      <div className="profilePage-container-three-parts">
        <div className="profilepage-leftpane">
          <Profile/>
        </div>
        <div className="profilepage-middlepage">
          <ProfileMiddle/>
        </div>
        <div className="profilepage-rightpage">
right
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
