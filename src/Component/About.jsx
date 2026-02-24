
import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {

    useEffect(() => {
        const sections = document.querySelectorAll(".fade-section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.2 }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

    }, []);

    const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = 0; // 🔥 reset so it keeps running
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [target, duration]);

  return <h3>{count}+</h3>;
};
    return (
        <div className="about-wrapper">

            {/* HERO */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1>Welcome To LA COLLECTION</h1>
                    <p>
                        Where Style Meets Passion. Experience premium fashion like never before.
                    </p>
                </div>
            </section>

            {/* STORY */}
            <section className="about-story fade-section">
                  <h2>Our Journey</h2>
                <div className="story-content">
                    <div className="story-text">
                      
                        <p>
                            LA COLLECTION was built to redefine online shopping with
                            premium quality, fast delivery and trusted service.
                            We aim to deliver not just products — but experiences.
                        </p>
                    </div>
                    <div className="story-img">
                        <img src="/assets/download.jpg" alt="fashion" />
                    </div>
                </div>
                <div className="story-content">
                    <div className="story-img">
                        <img src="/assets/code.jpg" alt="fashion" />
                    </div>
                    <div className="story-text">
                       
                        <p>
                            LA COLLECTION was built to redefine online shopping with
                            premium quality, fast delivery and trusted service.
                            We aim to deliver not just products — but experiences.
                        </p>
                    </div>

                </div>
            </section>

            {/* STATS */}
         <section className="about-stats">
      <div className="stat-card">
        <Counter target={10000} duration={2000} />
        <p>Happy Customers</p>
      </div>

      <div className="stat-card">
        <Counter target={500} duration={2000} />
        <p>Premium Products</p>
      </div>

      <div className="stat-card">
        <h3>24/7</h3>
        <p>Support</p>
      </div>
    </section>

            {/* TEAM */}
            <section className="about-team fade-section">
                <h2>Meet Our Creative Team</h2>
                <div className="team-grid">

                    <div className="team-card">
                        <div className="team-img">
                            <img src="https://i.pravatar.cc/200?img=11" alt="team" />
                        </div>
                        <h4>Rahul Sharma</h4>
                        <p>Founder & CEO</p>
                    </div>

                    <div className="team-card">
                        <div className="team-img">
                            <img src="https://i.pravatar.cc/200?img=32" alt="team" />
                        </div>
                        <h4>Anjali Verma</h4>
                        <p>Marketing Head</p>
                    </div>

                    <div className="team-card">
                        <div className="team-img">
                            <img src="https://i.pravatar.cc/200?img=45" alt="team" />
                        </div>
                        <h4>Arjun Mehta</h4>
                        <p>Lead Developer</p>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default About;