export default function AboutMe() {
    return (
        <section className="aboutMeContainer" id="aboutMe">
            <div className="aboutme_Pic">
                <img src="/img/emad.png" alt="Emad" />
            </div>
            <div className="aboutme_text">
                <div className="aboutme_title">
                    <h1>About Me</h1>
                </div>
                <div className="aboutme_desc">
                    <ul>
                        <li>Hey, I'm Emad!</li>
                        <li>Current: Second-year Mechatronics Engineering student, University of Waterloo</li>
                        <li>Location: Waterloo, ON, Canada</li>
                        <li>Experience:</li>
                        <ul>
                            <li>Vehicle Systems Engineer Intern – Geotab (Sept 2025 – Jan 2026)</li>
                            <li>Firmware & Electrical Engineer – UW Formula Electric (Sep 2024 – Present)</li>
                        </ul>
                        <li>University Start Year: 2024</li>
                        <li>Focus: Embedded development and Vehicle Systems</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}