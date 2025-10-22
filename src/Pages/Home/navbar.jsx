import {Link} from "react-scroll"
import {useState, useEffect} from "react"

function Navbar(){
    
    return (
    <nav className = "navbar">
        {/* Website Logo/Icon */}
        <div className="navbar_logo">
            <img src = "./img/logo.png" alt="ER" className="navbar_logo_img"/>
        </div>
        
        {/* Navigation Buttons */}
        <div className = "navbar_buttons">
            <Link 
                activeClass = "navbar_button_active" 
                spy = {true} 
                smooth = {true} 
                offset = {-70} 
                duration = {3000} 
                to = "heroSection" 
                className = "navbar_button"
            >
                Home
            </Link>
            
            <Link 
                activeClass = "navbar_button_active" 
                spy = {true} 
                smooth = {true} 
                offset = {-70} 
                duration = {1000} 
                to = "myProjects" 
                className = "navbar_button"
            >
                Projects
            </Link>
            
            <Link 
                activeClass = "navbar_button_active" 
                spy = {true} 
                smooth = {true} 
                offset = {-70} 
                duration = {1000} 
                to = "aboutMe" 
                className = "navbar_button"
            >
                About Me
            </Link>

            <Link 
                activeClass = "navbar_button_active" 
                spy = {true} 
                smooth = {true} 
                offset = {-70} 
                duration = {1000} 
                to = "experience" 
                className = "navbar_button"
            >
                Experience
            </Link>
            <Link 
                activeClass = "navbar_button_active" 
                spy = {true} 
                smooth = {true} 
                offset = {-70} 
                duration = {1000} 
                to = "contactPage" 
                className = "navbar_button"
            >
                Contact
            </Link>
        </div>
    </nav>
    );
}

export default Navbar;