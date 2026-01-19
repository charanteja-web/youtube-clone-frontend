import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import searchicon from '../../assets/search.png'
import uploadicon from '../../assets/upload.png'
import moreicon from '../../assets/more.png'
import notificationicon from '../../assets/notification.png'
import profileicon from '../../assets/profile.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ setSidebar, darkMode, setDarkMode }) => {

    const navigate=useNavigate();
    const[search,setSearch]=useState("");
    return (
       <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className="menu-icon" src={menu_icon} onClick={()=>setSidebar(prev=>prev===false?true:false)} alt=""/>
               <Link to='/'><img className="logo" src={logo} alt=""/></Link>
            </div>

            <div className='nav-middle flex-div'>
                <div className='searchbox flex-div'>
                <input type="text" placeholder='Search'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==="Enter" && search.trim())
                    {
                        navigate(`/search/${search}`);
                    }
                }}/>
                <img src={searchicon} 
                    onClick={()=>search.trim() && navigate(`/search/${search}`)}/>
                </div>
            </div>

            <div className='nav-right flex-div'>
                <img className='upload-icon' src={uploadicon} alt="" />
                <img className="more-icon" src={moreicon} alt="" />
                <img className="notification-icon" src={notificationicon} alt="" />
                <img className="profile-icon" src={profileicon} alt="" />
                <button
                     onClick={() => setDarkMode(!darkMode)}
                    className="dark-toggle"
                >
                 {darkMode ? "☀️" : "🌙"}
                </button>

            </div>
       </nav>
    )
}

export default Navbar
