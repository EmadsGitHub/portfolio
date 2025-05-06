import { useInView } from 'react-intersection-observer';
import {useState, useEffect} from 'react';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {Link} from "react-scroll";
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
            

                    <div className = "hero_section_content_box">
                        <div ref = {ref} className = {`hero_section_content ${isLoaded||hasAnimated ? 'visible': ''}`}>
                            <p className = "section_title">Hey, my name is Emad</p>
                            <h1 className = "hero_section_title">
                                <span className = "hero_title_color">Embedded Systems and AI</span>{" "}
                                <br />
                                Developer
                            </h1>
                            <p className = "hero_section_desc">
                                Who's technical expertise is out of this world!
                            </p>
                            <div className = "button_primary">
                            <Link  activeClass = "navbar_active_content" spy = {true} smooth = {true} offset = {-70} duration = {2000} to = "contactPage" className = "navbar_content"><button>Contact Me</button></Link>
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