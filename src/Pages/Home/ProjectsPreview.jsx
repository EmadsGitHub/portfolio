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
import { SiFlask } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiSqlite } from "react-icons/si";
import { SiGit } from "react-icons/si";
import { SiPostman } from "react-icons/si";
import { SiFigma } from "react-icons/si";
import { SiRaspberrypi } from "react-icons/si";
import { SiOpencv } from "react-icons/si";
import { IoLogoNpm } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { RiGeminiFill } from "react-icons/ri";


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
    SiOpencv:SiOpencv,
    IoLogoNpm:IoLogoNpm,
    IoLogoGithub:IoLogoGithub,
    SiTypescript:SiTypescript,
    SiFigma:SiFigma,
    SiRaspberrypi:SiRaspberrypi,
    SiFlask:SiFlask,
    SiExpress:SiExpress,
    SiSqlite:SiSqlite,
    SiGit:SiGit,
    SiPostman:SiPostman,
    RiGeminiFill: RiGeminiFill,
};

export default function ProjectsPreview(){
    const openGitHub = () => {
        window.open("https://github.com/EmadsGitHub", "_blank");
    };

    return (
        <section id="myProjects" className="projects_preview">
            <div className="projects_header">
                <div className="header_title">
                    <h1>Highlighted Projects</h1>
                </div>
                <div className="github_button">
                    <button onClick={openGitHub}>
                        Check out my GitHub!
                        <IconPage />
                    </button>
                </div>    
            </div>
            
            <div className="projects_container">
                {data?.portfolio?.map((item, index) => (
                    <div key={index} className={item.class}>
                        <div className="photo_container">
                            <div className="project_photo">
                                <img src={item.src} alt={item.title}></img>
                            </div>
                        </div>
                        <div className="text_container">
                            <div className="project_title">
                                <h2>{item.title}</h2>
                            </div>
                            <div className="project_desc">
                                <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                            </div>
                            <div className="projects_icons">
                                {item.icons.map((iconName, iconIndex) => {
                                    const IconComponent = iconMapping[iconName];
                                    return IconComponent ? <IconComponent key={iconIndex} className="icon" /> : null;
                                })}
                            </div>
                            <div className="github">
                                <a href={item.href} target="_blank" rel="noopener noreferrer">
                                    More Info
                                    <IconPage2 />
                                </a>
                            </div>
                        </div>
                    </div>  
                ))}
            </div>
        </section>
    );
}
