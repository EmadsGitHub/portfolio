import React from 'react';

// Ordered newest first (by start date). `logo` maps to an exp-logo-* class in App.css.
const experiences = [
    {
        position: 'Founding Engineer',
        company: 'Antefactory',
        duration: 'May 2026 - Present',
        location: 'San Francisco, CA',
        summary: 'Hire #5. Deep-tech manufacturing. Backed by 8VC, Hummingbird Ventures, BoxGroup, and SV Angel.',
        logo: 'stealth',
    },
    {
        position: 'Firmware Team Lead',
        company: 'UW Formula Electric',
        duration: 'Jan 2026 - Present',
        location: 'Waterloo, ON',
        summary: 'Low voltage electronics architecture, vehicle controls, battery systems, HIL.',
        logo: 'uwfe',
        hover: 'uwfe',
        achievements: [
            'Researched and led development for SOC, State of Health, Cooling Loop, and Endurance Mode algorithms on STM32 powered boards using FreeRTOS, improving vehicle functions by 50%',
            'Developed C++ traction control algorithms using PID controllers in MATLAB/Simulink, stabilizing wheel slip and optimizing vehicle torque response during acceleration by an additional 10%',
            'Programmed STM32 microcontrollers in C to implement PWM-based control for safety and power systems, improving vehicle safety to stay within FSAE guidelines',
            'Debugged hardware and firmware-related issues on various HIL and sensor boards using oscilloscopes, logic analyzers, and other measurement tools',
            'Redesigned state machine architecture for various ECUs to improve reliability and reduce ambiguity, improving efficiency in the car by 40%',
        ],
        skills: ['C++', 'MATLAB/Simulink', 'STM32', 'FreeRTOS', 'PID Controllers', 'HIL Testing', 'Oscilloscopes'],
    },
    {
        position: 'Vehicle Systems Engineer Intern',
        company: 'Geotab',
        duration: 'Sep 2025 - Jan 2026',
        location: 'Waterloo, ON',
        summary: 'Reverse-engineering and hacking cars.',
        logo: 'geotab',
        hover: 'geotab',
        achievements: [
            'Reverse-engineered embedded vehicle subsystems and communication protocols (CAN, UART) in a Polestar using CANalyzer and C++ scripts, validating 90% of the current records of the vehicle',
            'Executed detailed bench simulations on a Vehicle Diagnostic Simulator, remotely modulating 100+ CAN messages per session to validate ECU logic and enable firmware testing without physical vehicles',
            'Validated the signals and logs of Geotab GoDevices and investigated potential faults and bugs, improving their reliability by 20%',
            'Diagnosed tagging issues and validated changes in our Tesla Model S, Mercedes-Benz Vito, and Toyota Avanza fleets, ensuring reliable support for 1000+ customers around the world',
        ],
        skills: ['C++', 'CAN Protocol', 'CANalyzer', 'UART', 'Vehicle Systems', 'Embedded Systems', 'Vehicle Diagnostics', 'Reverse Engineering'],
    },
];

export default function Experience({ hoverHandlers, handleLeave }) {
    return (
        <section id="experience" className="experience_section">
            <div className="experience_header">
                <h2 className="experience_title">MY EXPERIENCE</h2>
                <p className="experience_subtitle">Professional Journey & Key Positions</p>
            </div>

            <div className="experience_container">
                {experiences.map((exp) => (
                    <div
                        key={`${exp.company}-${exp.position}`}
                        className={`experience_item exp-logo-${exp.logo}`}
                        onMouseEnter={exp.hover ? hoverHandlers?.[exp.hover] : undefined}
                        onMouseLeave={exp.hover ? handleLeave : undefined}
                    >
                        <div className="experience_content">
                            <div className="experience_header_info">
                                <h3 className="experience_position">{exp.position}</h3>
                                <h4 className="experience_company">{exp.company}</h4>
                                <p className="experience_duration">
                                    {exp.duration}{exp.location ? ` · ${exp.location}` : ''}
                                </p>
                            </div>
                            {exp.summary && <p className="experience_summary">{exp.summary}</p>}
                            {exp.achievements && (
                                <div className="experience_description">
                                    <ul className="experience_achievements">
                                        {exp.achievements.map((a) => <li key={a}>{a}</li>)}
                                    </ul>
                                </div>
                            )}
                            {exp.skills && (
                                <div className="experience_skills">
                                    {exp.skills.map((s) => <span key={s} className="skill_tag">{s}</span>)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
