import React from 'react';

export default function Experience({ hoverHandlers, handleLeave }) {
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
                <div 
                    className="experience_item experience_item_left"
                    onMouseEnter={hoverHandlers?.geotab}
                    onMouseLeave={handleLeave}
                >
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
                            <ul className="experience_achievements">
                                <li>Reverse-engineered embedded vehicle subsystems and communication protocols (CAN, UART) in a Polestar using CANalyzer and C++ scripts, validating 90% of the current records of the vehicle</li>
                                <li>Executed detailed bench simulations on a Vehicle Diagnostic Simulator, remotely modulating 100+ CAN messages per session to validate ECU logic and enable firmware testing without physical vehicles</li>
                                <li>Validated the signals and logs of Geotab GoDevices and investigated potential faults and bugs, improving their reliability by 20%</li>
                                <li>Diagnosed tagging issues and validated changes in our Tesla Model S, Mercedes-Benz Vito, and Toyota Avanza fleets, ensuring reliable support for 1000+ customers around the world</li>
                            </ul>
                        </div>
                        <div className="experience_skills">
                            <span className="skill_tag">C++</span>
                            <span className="skill_tag">CAN Protocol</span>
                            <span className="skill_tag">CANalyzer</span>
                            <span className="skill_tag">UART</span>
                            <span className="skill_tag">Vehicle Systems</span>
                            <span className="skill_tag">Embedded Systems</span>
                            <span className="skill_tag">Vehicle Diagnostics</span>
                            <span className="skill_tag">Reverse Engineering</span>
                        </div>
                    </div>
                </div>

                {/* Experience Item 2 - Image Right, Text Left */}
                <div 
                    className="experience_item experience_item_right"
                    onMouseEnter={hoverHandlers?.uwfe}
                    onMouseLeave={handleLeave}
                >
                    <div className="experience_content">
                        <div className="experience_header_info">
                            <h3 className="experience_position">Firmware Engineer</h3>
                            <h4 className="experience_company">UW Formula Electric</h4>
                            <p className="experience_duration">September 2024 - Present</p>
                        </div>
                        <div className="experience_description">
                            <ul className="experience_achievements">
                                <li>Researched and led development for SOC, State of Health, Cooling Loop, and Endurance Mode algorithms on STM32 powered boards using FreeRTOS, improving vehicle functions by 50%</li>
                                <li>Developed C++ traction control algorithms using PID controllers in MATLAB/Simulink, stabilizing wheel slip and optimizing vehicle torque response during acceleration by an additional 10%</li>
                                <li>Programmed STM32 microcontrollers in C to implement PWM-based control for safety and power systems, improving vehicle safety to stay within FSAE guidelines</li>
                                <li>Debugged hardware and firmware-related issues on various HIL and sensor boards using oscilloscopes, logic analyzers, and other measurement tools</li>
                                <li>Redesigned state machine architecture for various ECUs to improve reliability and reduce ambiguity, improving efficiency in the car by 40%</li>
                            </ul>
                        </div>
                        <div className="experience_skills">
                            <span className="skill_tag">C++</span>
                            <span className="skill_tag">MATLAB/Simulink</span>
                            <span className="skill_tag">STM32</span>
                            <span className="skill_tag">FreeRTOS</span>
                            <span className="skill_tag">PID Controllers</span>
                            <span className="skill_tag">HIL Testing</span>
                            <span className="skill_tag">Oscilloscopes</span>
                        </div>
                    </div>
                    <div className="experience_image_container">
                        <img 
                            src="./img/me_racing.jpeg" 
                            alt="UW Formula Electric" 
                            className="experience_image"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
