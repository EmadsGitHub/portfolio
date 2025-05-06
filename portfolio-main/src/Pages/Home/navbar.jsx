import {Link} from "react-scroll"
import {useState, useEffect} from "react"

function Navbar(){
    
    return (
    <nav className = "navbar">
        <div>
            <img src = "./img/logo.png" alt="ER" width = "125" height = "75"/>
        </div>
        <a className = "nav_toggle" >
            <span className="nav_hamburger_line"></span>
            <span className="nav_hamburger_line"></span>
            <span className="nav_hamburger_line"></span>
        </a>
        <div className = "navbar--items">
            <ul>{/*Spy: Monitors where you are based on scrolling. Smooth: Smoothly scrolls to area instead of jumping there. Offset: Difference of viewpot between 2 targets.
                Duration: How long the scroll is.*/} 
                <li> 
                    <Link activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {3000} to = "heroSection" className = "navbar_content">
                        Home
                    </Link>
                    
                </li>
                <li> 
                    <Link activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {1000} to = "myProjects" className = "navbar_content">
                        Projects
                    </Link>
                    
                </li>
                <li> 
                    <Link activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {1000} to = "aboutMe" className = "navbar_content">
                        About Me
                    </Link>
                    
                </li>
                <li> 
                    <Link activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {1000} to = "contactPage" className = "navbar_content">
                        Contact
                    </Link>
                    
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;