
import { Outlet, useParams } from 'react-router-dom'

import Header from '../HomePage/header.jsx'
import Profile from './Profile.jsx';

function ProfilePage() {
  const { email } = useParams();
  return (
    <div>
      <div className="bg-black">
    <Header />
      </div>
    <Profile email={email} />
    
    </div>
  )
}

export default ProfilePage