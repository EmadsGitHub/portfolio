import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import React from 'react';

export default function Contact({ hoverHandlers, handleLeave, showTwitter, hideTwitter }){
    const handleTwitterClick = (e) => {
        e.preventDefault();
        showTwitter();
    };

    return (
        <section id="contactPage">
            <div className="contact-page">
                <div className="contact-header">
                    <h2>Contact Me</h2>
                </div>
                <div className="contact-content">
                    <div className="quick-contacts">
                        <div className="LinkedIn">
                            <div className="LinkedinHeader">
                                <h3>[LINKEDIN]</h3>
                            </div>
                            <div className="LinkedinContent">
                                <FaLinkedin />
                                <a href="https://www.linkedin.com/in/emadrahman1/" target="_blank" rel="noopener noreferrer">Click Here</a>
                            </div>
                        </div>
                        <div className="Twitter">
                            <div className="TwitterHeader">
                                <h3>[X/TWITTER]</h3>
                            </div>
                            <div className="TwitterContent">
                                <FaTwitterSquare />
                                <button 
                                    onClick={handleTwitterClick}
                                    className="twitter-viewer-button"
                                    onMouseEnter={hoverHandlers?.navContact}
                                    onMouseLeave={handleLeave}
                                >
                                    View Top Tweets
                                </button>
                                <a 
                                    href="https://x.com/emadddd_r" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="twitter-profile-link"
                                >
                                    Visit Profile
                                </a>
                            </div>
                        </div>
                        <div className="Email">
                            <div className="EmailHeader">
                                <h3>[EMAIL]</h3>
                            </div>
                            <div className="EmailinContent">
                                <MdMarkEmailUnread />
                                <a href="mailto:e2rahman@uwaterloo.ca">e2rahman@uwaterloo.ca</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
