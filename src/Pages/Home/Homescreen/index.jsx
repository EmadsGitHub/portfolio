import HeroSection from "../HeroSection";
import AboutMe from "../AboutMe";
import ProjectsPreview from "../ProjectsPreview";
import Contact from "../Contact";
import Experience from "../Experience";

export default function Home({ refs, hoverHandlers, handleLeave }) {
    return (
        <>  
            <div ref={refs.heroRef}>
                <HeroSection hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
            </div>
            <div ref={refs.aboutRef}>
                <AboutMe hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
            </div>
            <div ref={refs.experienceRef}>
                <Experience hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
            </div>
            <div ref={refs.projectsRef}>
                <ProjectsPreview hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
            </div>
            <div ref={refs.contactRef}>
                <Contact hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
            </div>
        </>
    );
}
