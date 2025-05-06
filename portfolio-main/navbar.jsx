import {Link} from "react-scroll"
import {useState, useEffect} from "react"

function Navbar(){
    const [navActive, setnavActive] = useState(false);
    const toggleNav = ()=> {
        setnavActive(!navActive)
    }
    const closeMenu = ()=>{
        setnavActive(false)
    }
    useEffect(()=>
    {
        const handleResize = ()=>{
            if (window.innerWidth <= 500){
                closeMenu();
            }
        };
        window.addEventListener("resize", handleResize);
        return()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, [])
    useEffect(()=>{
        if (window.innerWidth<=1200){
            closeMenu;
        }
    }, [])
    return (
    <nav className = {`navbar ${navActive ? "active":""}`}>
        <div>
            <img src = "./img/logo.png" alt="ER" width = "125" height = "75"/>
        </div>
        <a className = {`nav_toggle ${navActive ? "active":""}`} onClick={toggleNav}>
            <span className="nav_hamburger_line"></span>
            <span className="nav_hamburger_line"></span>
            <span className="nav_hamburger_line"></span>
        </a>
        <div className = {`navbar--items ${navActive? "active":""}`}>
            <ul>{/*Spy: Monitors where you are based on scrolling. Smooth: Smoothly scrolls to area instead of jumping there. Offset: Difference of viewpot between 2 targets.
                Duration: How long the scroll is.*/} 
                <li> 
                    <Link onClick = {closeMenu} activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {500} to = "heroSection" className = "navbar_content">
                        Home
                    </Link>
                    
                </li>
                <li> 
                    <Link onClick = {closeMenu} activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {500} to = "myProjects" className = "navbar_content">
                        Projects
                    </Link>
                    
                </li>
                <li> 
                    <Link onClick = {closeMenu} activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {500} to = "aboutMe" className = "navbar_content">
                        About Me
                    </Link>
                    
                </li>
                <li> 
                    <Link onClick = {closeMenu} activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {500} to = "contactPage" className = "navbar_content">
                        Blog
                    </Link>
                    
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;