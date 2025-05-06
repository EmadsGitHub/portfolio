import data from "../../data/index.json";
import IconPage from "../../Pages/Home/IconPage.js";
import IconPage2 from "../../Pages/Home/IconPage2.js";
import { SiAltiumdesigner } from "react-icons/si";
import { SiArduino } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiC } from "react-icons/si";
import { SiCplusplus } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiAutocad } from "react-icons/si";
import { SiTinkercad } from "react-icons/si";
import { SiOpencv } from "react-icons/si";


const iconMapping = {
    SiAltiumdesigner: SiAltiumdesigner,
    SiArduino: SiArduino,
    SiAutocad: SiAutocad,
    FaPython: FaPython,
    FaReact: FaReact,
    IoLogoJavascript: IoLogoJavascript,
    SiC: SiC,
    SiCplusplus: SiCplusplus,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaNodeJs: FaNodeJs,
    SiTinkercad: SiTinkercad,
    SiOpencv:SiOpencv

};
export default function ProjectsPreview(){
    const openGitHub = () => {
        window.open("https://github.com/EmadsGitHub", "_blank");
    };
    const openCADWork = () => {
        window.open("https://docs.google.com/document/d/1uuxL8J5RSgUU1B5gS67Th3O46MTvXO0cjE8d2IyDh-c/edit?usp=sharing", "_blank");
    };
    return (
        
        <section id = "myProjects" className = "projects_preview">
            <script src="https://kit.fontawesome.com/ba05d75742.js" crossorigin="anonymous"></script>
            <div className = "projects_header">
                <div className = "header_title">
                    <h1>Highlighted Projects</h1>
                </div>
                <div className = "github_button">

                    <button id="gitHub" onClick={openGitHub}>Check out my GitHub!<IconPage /></button>
                    <button id="gitHub" onClick={openCADWork}>Check out my CAD work!<IconPage /></button>
                    
                </div>    
            </div>
            <div className = "projects_container">
                {data?.portfolio?.map((item, index) => (
                    <div className = {item.class}>
                        <div className = "photo_container">
                            <div key = {index} className = "project_photo">
                                <img src = {item.src} alt = "image"></img>
                            </div>
                        </div>
                        <div className = "text_container">
                            <div key = {index} className = "project_title">
                                <h2>{item.title}</h2>
                            </div>
                            <div key = {index} className = "project_desc">
                                <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                            </div>
                            <div key = {index} className = "projects_icons">
                                {item.icons.map((iconName, index)=> {
                                    const IconComponent = iconMapping[iconName];
                                    return IconComponent ? <IconComponent key = {index} className = "icon" /> : null;
                                })}
                            </div>
                            <div className = "github">
                                <a href = {item.href} target="_blank">More Info</a>
                                <IconPage2 />
                            </div>
                                
                            
                        </div>

                        
                    </div>  
                )

                )}
            </div>
        </section>
    );
}