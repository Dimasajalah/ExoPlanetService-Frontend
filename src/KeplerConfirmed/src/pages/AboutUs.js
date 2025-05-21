import React from 'react';
import aboutImage from '../assets/about1.jpg';
import visionImage from '../assets/vision1.jpg';
import missionImage from '../assets/mission1.jpg';
import teamImage from '../assets/team.jpg';
import backgroundContainer from '../assets/bg1.jpg'; // Import your background image

const AboutUs = () => {
    return (
        <div style={styles.container}>
            {/* Background Image Container */}
            <div style={styles.backgroundContainer}></div>

            {/* Main Title */}
            <h1 style={styles.mainTitle}>About Us</h1>

            {/* Sections */}
            <Section
                title="Welcome to Explorers!"
                text="Our solution is to make learning about the wonders of space and exoplanets accessible and engaging for preparatory students. Understanding our universe is crucial for inspiring future scientists and fostering curiosity. Our platform offers interactive tools, animated videos, holographic visualizations, and quizzes to make the study of exoplanets fun and educational."
                backgroundImage={aboutImage}
                textOnRight={false} // Photo on left, text on right
            />
            <Section
                title="Our Vision"
                text="We envision a world where every preparatory student, regardless of background, has the opportunity to explore and understand the universe through innovative and interactive learning tools. By integrating cutting-edge technologies such as holograms, 3D animations, and AI, we aim to transform complex scientific concepts into accessible knowledge for all."
                backgroundImage={visionImage}
                textOnRight={true} // Photo on right, text on left
            />
            <Section
                title="Our Mission"
                text="Our mission is to empower preparatory students by providing an immersive, interactive learning experience that demystifies exoplanet research. We strive to inspire young minds to explore space by combining science and creativity through engaging animated videos, interactive quizzes, and holographic visualizations, making learning an exciting journey into the wonders of the cosmos."
                backgroundImage={missionImage}
                textOnRight={false} // Photo on left, text on right
            />
            <Section
                backgroundImage={teamImage}
            />
        </div>
    );
};

// Section component
const Section = ({ title, text, backgroundImage, textOnRight }) => {
    return (
        <div style={{
            ...styles.section,
            flexDirection: textOnRight ? 'row-reverse' : 'row', // Change direction based on the textOnRight prop
            backgroundImage: `url(${backgroundImage})`,
        }}>
            <div style={styles.imageContainer}>
                <div style={{ backgroundImage: `url(${backgroundImage})`, ...styles.image }}></div>
            </div>
            <div style={styles.textContainer}>
                {title && <h2 style={styles.title}>{title}</h2>}
                {text && <p style={styles.text}>{text}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative', // Allows absolute positioning of children
        fontFamily: 'Poppins',
        bacgroundColor: 'black',
        zIndex: 1, // Ensures container is above the background
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'flexible', // Full height of the container
        backgroundImage: `url(${backgroundContainer})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        zIndex: 0, // Lower z-index than sections and title
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: '48px',
        marginBottom: '50px',
        color: 'white',
        position: 'relative', // Ensure the title is above the background
        zIndex: 2, // Higher z-index than the background
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '50px',
        color: 'white',
        position: 'relative',
        margin: '20px 0',
        height: '400px', // Set height as needed
        borderRadius: '10px',
        marginBottom: '50px', // Adds space below each section
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    imageContainer: {
        flex: '1', // Allows the image to take half the width
        margin: '0 20px', // Space between image and text
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    textContainer: {
        flex: '1', // Allows the text to take half the width
        textAlign: 'left', // Aligns text to the left
    },
    title: {
        fontSize: '32px',
        margin: '10px 0',
    },
    text: {
        fontSize: '18px',
        maxWidth: '600px',
        margin: '0 auto',
    },
};

export default AboutUs;
