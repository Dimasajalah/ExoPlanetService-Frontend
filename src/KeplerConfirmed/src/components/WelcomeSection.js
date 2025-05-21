import React from 'react';
const WelcomeSection = () => {
    return (
        <div style={styles.container}>

            <h1 style={styles.mainTitle}>Welcome</h1>
            <pr style={styles.prr}>"Welcome to Exoplorers! Our platform is dedicated to sparking curiosity and providing an immersive learning experience about exoplanets. Let’s dive into the wonders of the universe and explore planets beyond our solar system."</pr>
        </div>
    );
};

const styles = {
    container: {
        padding: '5rem',
        fontFamily: 'poppins',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // This makes the background image fixed during scrolling
        backgroundPosition: 'center',

    },
    mainTitle: {
        textAlign: 'center',
        fontSize: '50px',
        fontWeight: 'bold',
        color: '#fff',
    },
    prr: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}
export default WelcomeSection;