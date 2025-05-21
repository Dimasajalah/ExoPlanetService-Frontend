import React from 'react';
import HeroSection from '../components/HeroSection';
import ButtonRow from '../components/ButtonRow';
import backgroundImage from '../assets/background1.jpg'; // Import the image
import backgroundImage2 from '../assets/background0.jpg'; // Import the image
import WelcomeSection from '../components/WelcomeSection';

const Home = () => {
    return (
        <div>
            <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
                <div style={styles.overlay}></div>
                <HeroSection />
                <ButtonRow />
            </div>
            <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage2})` }}>
                <div style={styles.overlay}></div>
                <WelcomeSection />
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'poppins',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
};

export default Home;
