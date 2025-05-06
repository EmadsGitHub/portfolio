import HeroSection from "../HeroSection";
import MySkills from "../MySkills";
import AboutMe from "../AboutMe";
import ProjectsPreview from "../ProjectsPreview";
import Contact from "../Contact";

export default function Home (){
    return (
        <>
            
            <HeroSection />
            <MySkills />
            <AboutMe />
            <ProjectsPreview />
            <Contact />
        </>
    );
}