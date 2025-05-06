import data from "../../data/index.json";
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
    SiExpress: SiExpress,
    SiFlask: SiFlask,
    SiSqlite: SiSqlite,
    SiGit: SiGit,
    SiPostman: SiPostman,
    SiFigma: SiFigma,
    SiRaspberrypi: SiRaspberrypi,
    IoLogoNpm: IoLogoNpm,
    IoLogoGithub: IoLogoGithub,
    SiTypescript: SiTypescript,
    SiOpencv: SiOpencv,

};

export default function MySkills(){
    return(
        <section className = "skills" id = "mySkills">
            <div className = "skillsTitleContainer">
                <h1 className = "skillsHeading">My Expertise</h1>
            </div>
            <div className = "skillsContentContainer">
                {data?.skills?.map((item, index)=> (
                    <div className = "full_skills">
                        <div className = "grandSize">
                            <div key = {index} className = {item.class}>
                                <div className = "skills_pic">
                                    <img src = {item.src} alt = "image"></img>
                                </div>
                            </div>           
                        </div>
                        <div key = {index} className = "skills_title">
                            <h2>{item.title}</h2>
                        </div> 
                        <div key = {index} className = "skills_desc">
                            <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                        </div>
                        <div key = {index} className = "skills_icons">
                            {item.icons.map((iconName, index)=> {
                                const IconComponent = iconMapping[iconName];
                                return IconComponent ? <IconComponent key = {index} className = "icon" /> : null;
                            })}
                        </div>
                    </div>
                )
                )}
            </div>
        </section>
    );
}