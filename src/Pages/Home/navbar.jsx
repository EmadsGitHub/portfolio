import {Link} from "react-scroll"

function Navbar({ hoverHandlers, handleLeave }){
    
    return (
    <nav className="navbar">
        {/* Website Logo/Icon */}
        <div className="navbar_logo">
            <span className="text-accent" style={{fontSize: '1rem', fontWeight: 'bold'}}>{"> emad@portfolio"}</span>
        </div>
        
        {/* Navigation Buttons */}
        <div className="navbar_buttons">
            <Link 
                activeClass="navbar_button_active" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={1000} 
                to="heroSection" 
                containerId="scroll-container"
                className="navbar_button"
                onMouseEnter={hoverHandlers?.navHome}
                onMouseLeave={handleLeave}
            >
                home
            </Link>
            
            <Link 
                activeClass="navbar_button_active" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={1000} 
                to="aboutMe" 
                containerId="scroll-container"
                className="navbar_button"
                onMouseEnter={hoverHandlers?.navAbout}
                onMouseLeave={handleLeave}
            >
                about
            </Link>
            
            <Link 
                activeClass="navbar_button_active" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={1000} 
                to="experience" 
                containerId="scroll-container"
                className="navbar_button"
                onMouseEnter={hoverHandlers?.navExperience}
                onMouseLeave={handleLeave}
            >
                experience
            </Link>
            
            <Link 
                activeClass="navbar_button_active" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={1000} 
                to="myProjects" 
                containerId="scroll-container"
                className="navbar_button"
                onMouseEnter={hoverHandlers?.navProjects}
                onMouseLeave={handleLeave}
            >
                projects
            </Link>
            
            <Link 
                activeClass="navbar_button_active" 
                spy={true} 
                smooth={true} 
                offset={-100} 
                duration={1000} 
                to="contactPage" 
                containerId="scroll-container"
                className="navbar_button"
                onMouseEnter={hoverHandlers?.navContact}
                onMouseLeave={handleLeave}
            >
                contact
            </Link>
        </div>
    </nav>
    );
}

export default Navbar;
