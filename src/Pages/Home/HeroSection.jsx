import { useInView } from 'react-intersection-observer';
import {useState, useEffect} from 'react';
import {Link} from "react-scroll";

export default function HeroSection(){

    const { ref, inView } = useInView({
        threshold: 0.05,
        rootMargin: '-50px',
        initialInView: true
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasAnimated(true);
            setIsLoaded(true);
        }, 100);
        return () => {
            clearTimeout(timer)
        };
    }, []);

    useEffect(() => {
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
    }, [inView, hasAnimated])


    return (
        <section id="heroSection" className="heroSec">
            <div className="hero_section_content_box">
                <div ref={ref} className={`hero_section_content ${isLoaded || hasAnimated ? 'visible': ''}`}>
                    
                    {/* Terminal prompt */}
                    <div className="terminal_prompt">$ whoami</div>
                    
                    {/* Name title */}
                    <h1 className="hero_name_title">
                        HEY, I'M EMAD
                    </h1>
                    
                    {/* Terminal prompt for about */}
                    <div className="terminal_prompt">$ cat about.txt</div>
                    
                    <p className="hero_section_desc">
                        Mechatronics Engineering @ UWaterloo
                        <br/><br/>
                        Embedded Development and Vehicle Systems 
                    </p>
                    
                    {/* Expertise section */}
                    <div className="contact_text_section">
                        <div className="terminal_prompt">$ cat expertise.txt</div>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            <li className="contact_me_text">Hardware Design & PCB Development</li>
                            <li className="contact_me_text">Embedded Software </li>
                            <li className="contact_me_text">Full Stack Development & AI </li>
                            <li className="contact_me_text">Vehicle Systems & Communication Protocols </li>
                        </ul>
                    </div>
                    
                    {/* Status section */}
                    <div className="contact_text_section">
                        <div className="terminal_prompt">$ ls -la status.txt</div>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            <li className="contact_me_text">Available for work</li>
                            <li className="contact_me_text">Looking for jobs; Summer 2026</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
