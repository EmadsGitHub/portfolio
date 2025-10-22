import React from 'react';

export default function Experience() {
    return (
        <section id="experience" className="experience_section">
            {/* Experience Section Header */}
            <div className="experience_header">
                <h2 className="experience_title">MY EXPERIENCE</h2>
                <p className="experience_subtitle">Professional Journey & Key Positions</p>
            </div>

            {/* Experience Items Container */}
            <div className="experience_container">
                
                {/* Experience Item 1 - Image Left, Text Right */}
                <div className="experience_item experience_item_left">
                    <div className="experience_image_container">
                        <img 
                            src="./img/geotab.png" 
                            alt="Geotab Logo" 
                            className="experience_image"
                        />
                    </div>
                    <div className="experience_content">
                        <div className="experience_header_info">
                            <h3 className="experience_position">Vehicle Systems Engineer Intern</h3>
                            <h4 className="experience_company">Geotab</h4>
                            <p className="experience_duration">September 2025 - January 2026</p>
                        </div>
                        <div className="experience_description">
                            <p>
                                Reverse-engineered embedded vehicle subsystems and communication protocols (CAN, UART) in a Polestar using 
                                CANalyzer and C++ scripts, validating 90% of the current records of the vehicle. Executed detailed bench 
                                simulations on the Vehicle Diagnostic Simulator, remotely modulating 100+ CAN messages per session.
                            </p>
                            <ul className="experience_achievements">
                                <li>Validated 90% of vehicle records through reverse-engineering embedded subsystems</li>
                                <li>Improved GoDevice reliability by 20% through signal validation and fault investigation</li>
                                <li>Collaborated with Firmware teams to ensure stable communication post-deployment</li>
                                <li>Executed bench simulations with 100+ CAN messages per session for ECU validation</li>
                            </ul>
                        </div>
                        <div className="experience_skills">
                            <span className="skill_tag">C++</span>
                            <span className="skill_tag">CAN Protocol</span>
                            <span className="skill_tag">CANalyzer</span>
                            <span className="skill_tag">UART</span>
                            <span className="skill_tag">Vehicle Systems</span>
                            <span className="skill_tag">Embedded Systems</span>
                        </div>
                    </div>
                </div>

                {/* Experience Item 2 - Image Right, Text Left */}
                <div className="experience_item experience_item_right">
                    <div className="experience_content">
                        <div className="experience_header_info">
                            <h3 className="experience_position">Firmware and Electrical Engineer</h3>
                            <h4 className="experience_company">UW Formula Electric</h4>
                            <p className="experience_duration">September 2024 - Present</p>
                        </div>
                        <div className="experience_description">
                            <p>
                                Designed and programmed CAN-based diagnostic functions for 60+ CAN messages in 6 different ECUs to 
                                monitor vehicle state changes. Developed C++ traction control algorithms using PID controllers in 
                                MATLAB/Simulink, stabilizing wheel slip and optimizing vehicle torque response during acceleration.
                            </p>
                            <ul className="experience_achievements">
                                <li>Improved real-time fault detection across subsystems by 20% through CAN diagnostics</li>
                                <li>Enhanced vehicle torque response by 10% using PID-based traction control algorithms</li>
                                <li>Programmed STM32 microcontrollers for PWM-based safety and power system control</li>
                                <li>Reduced telemetry log graphing time from 25 to 10 minutes with CAN data dashboard</li>
                            </ul>
                        </div>
                        <div className="experience_skills">
                            <span className="skill_tag">C++</span>
                            <span className="skill_tag">Python</span>
                            <span className="skill_tag">MATLAB/Simulink</span>
                            <span className="skill_tag">STM32</span>
                            <span className="skill_tag">CAN Protocol</span>
                            <span className="skill_tag">C++</span>
                            <span className="skill_tag">Altium Designer</span>
                        </div>
                    </div>
                    <div className="experience_image_container">
                        <img 
                            src="./img/uwfe.png" 
                            alt="UW Formula Electric Logo" 
                            className="experience_image"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
