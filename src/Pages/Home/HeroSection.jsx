export default function  HeroSection(){
    return (
        <section id = "heroSection" className = "heroSec">
            <div className = "hero_section_content_box">
                <div className = "hero_section_content">
                    <p className = "section_title">Hey, my name is Emad</p>
                    <h1 className = "hero_section_title">
                        <span className = "hero_title_color">Embedded Systems and AI</span>{" "}
                        <br />
                        Developer
                    </h1>
                    <p className = "hero_section_desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        <br/>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    </p>

                </div>
                <button className = "button_primary">Contact Me</button>
            </div>
            <div className = "img">
                <img src = "./img/robot.png" alt = "Image"/>
            </div>
        </section>
    );
}
