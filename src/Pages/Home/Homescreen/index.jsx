import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import AboutMe from "../AboutMe";
import ProjectsPreview from "../ProjectsPreview";
import Contact from "../Contact";
import Experience from "../Experience";

export default function Home (){
    return (
        <>  
            <HeroSection />
            <AboutMe />
            <MySkills />
            <Experience />
            <ProjectsPreview />
            <Contact />
        </>
    );
}