import { useInView } from 'react-intersection-observer';
import {useState, useEffect} from 'react';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {Link} from "react-scroll";
import { FaLinkedin, FaPhoneSquareAlt } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
export default function  HeroSection(){

    const { ref, inView, entry } = useInView({
        threshold: 0.05, // Change from '0.05' to 0 (number not string)
        rootMargin: '-50px', // Add some margin to trigger earlier
        initialInView: true // This ensures it's visible on first load
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(()=> {
        const timer = setTimeout(()=>{
            setHasAnimated(true);
            setIsLoaded(true);
        }, 100);
        return ()=> {
            clearTimeout(timer)};
    }, []);

    useEffect(()=> {

        if (!inView && hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        else if (inView && !hasAnimated){
            setIsLoaded(false);
            setHasAnimated(true);
        }
        
    }, [inView])


    return (
        <section id = "heroSection" className = "heroSec">
            
            {/* Left Side Social Rockets */}
            <div className = {`left_rockets_container ${isLoaded||hasAnimated ? 'rockets_visible': ''}`}>
                {/* LinkedIn Rocket - positioned more inward */}
                <a href="https://www.linkedin.com/in/emadrahman1/" target="_blank" rel="noopener noreferrer" className = "social_rocket_link linkedin_link">
                    <img src="./img/linkedinrocket.png" alt="LinkedIn Rocket" className="social_rocket linkedin_rocket" />
                </a>
                {/* Twitter Rocket - swapped from right side */}
                <a href="https://x.com/emadddd_r" target="_blank" rel="noopener noreferrer" className = "social_rocket_link twitter_link">
                    <img src="./img/twitterrocket.png" alt="Twitter Rocket" className="social_rocket twitter_rocket" />
                </a>
            </div>

            {/* Right Side Social Rockets */}
            <div className = {`right_rockets_container ${isLoaded||hasAnimated ? 'rockets_visible': ''}`}>
                {/* Email Rocket - positioned more inward */}
                <a href="mailto:e2rahman@uwaterloo.ca" className = "social_rocket_link email_link">
                    <img src="./img/emailrocket.png" alt="Email Rocket" className="social_rocket email_rocket" />
                </a>
                {/* GitHub Rocket - swapped from left side */}
                <a href="https://github.com/EmadsGitHub" target="_blank" rel="noopener noreferrer" className = "social_rocket_link github_link">
                    <img src="./img/githubrocket.png" alt="GitHub Rocket" className="social_rocket github_rocket" />
                </a>
            </div>

                    <div className = "hero_section_content_box">
                        <div ref = {ref} className = {`hero_section_content ${isLoaded||hasAnimated ? 'visible': ''}`}>

                            
          
                            {/* Name title */}
                            <h2 className = "hero_name_title">
                                I AM EMAD
                            </h2>
                            
                            <p className = "hero_section_desc">
                                Mechatronics Engineering @ UWaterloo <br/><br/> Embedded and Vehicle Systems Fanatic
                            </p>
                            
                            {/* Contact text instead of button */}
                            <div className = "contact_text_section">
                                <Link activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {2000} to = "contactPage" className = "contact_link">
                                    <p className = "contact_me_text">Looking for jobs; Summer 2026</p>
                                </Link>
                            </div>
                        </div>
                    
                    </div>
                   
                        


                        <div className="moon-container">

                            
                            <div className="img">
                                <img src="./img/robotandthemoon.png" alt="Moon crater"/>
                            </div>
                            
             
                        </div>
                        


            
            
                

            
        </section>
    );
}