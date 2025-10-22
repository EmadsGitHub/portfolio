import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
export default function Contact(){
        const form = useRef();

        const validateForm = () => {
            
            const formData = new FormData(form.current);
            let isValid = true;

            formData.forEach((value, key) =>{
                if (!value.trim()){
                    isValid = false;
                }
            });
            return isValid;
        }
        
      
        const sendEmail = (e) => {
          e.preventDefault();
      
          if (!validateForm()){
            alert("This form has empty fields");
          }
          else{

            emailjs
                .sendForm('service_63xgirb', 'template_c8pr8kg', form.current, {
                publicKey: 'qYb0rbyVtXXpWlD_F',
                })
                .then(
                () => {
                    alert('Thanks!');
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
          } 
    
    };

    return (<section id = "contactPage">
        <div className = "contact-page">
            <div className = "contact-header">
                <h2>Contact Me</h2>
            </div>
            <div className = "contact-content">
                <div className = "quick-contacts">
                    <div className = "LinkedIn">
                        <div className = "LinkedinHeader">
                            <h3>LinkedIn</h3>
                        </div>
                        <div className = "LinkedinContent">
                            <FaLinkedin />
                            <a href="https://www.linkedin.com/in/emadrahman1/" target="_blank">Click Here</a>
                        </div>

                    </div>
                    <div className = "Twitter">
                        <div className = "TwitterHeader">
                            <h3>X/Twitter</h3>
                        </div>
                        <div className = "TwitterContent">
                            <FaTwitterSquare />
                            <a href="https://x.com/emadddd_r" target="_blank">Click Here</a>
                        </div>
                    </div>
                    <div className = "Email">
                        <div className = "EmailHeader">
                            <h3>Email</h3>
                        </div>
                        <div className = "EmailinContent">
                            <MdMarkEmailUnread />
                            <p>e2rahman@uwaterloo.ca</p>
                        </div>
                    </div>
                </div>
                <div className = "emailForm">
                    <div className = "formTitle">
                        <h3>Shoot Me A Message!</h3>
                    </div>
                    <form ref = {form} onSubmit={sendEmail}>
                        <div className = "textboxes">
                            <textarea             
                                placeholder="Full Name"
                                aria-label="Full Name"
                                name = "from_name">
                            </textarea>
                            <textarea 
                                placeholder="Email"
                                aria-label="Email"
                                name = "user_email"
                            ></textarea>
                            <textarea 
                                placeholder="Type your message"
                                aria-label="Message"
                                name = "message"
                            ></textarea>
                        </div>
                        <div className = "sendForm">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                    
                </div>
            </div>

        </div>
    </section>)
};