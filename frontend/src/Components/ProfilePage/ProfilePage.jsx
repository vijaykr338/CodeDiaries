
import { Outlet, useParams } from 'react-router-dom'

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Profile from './Profile.jsx';

function ProfilePage() {
  const { email } = useParams();
  return (
    <div>
    
    <Profile email={email} />
    
    </div>
  )
}

export default ProfilePage