import React from 'react';
import backgroundImage from '../assets/contact.jpg';

const ContactUs = () => {
    return (
        <div>
            <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
                <div style={styles.overlay}></div>
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

export default ContactUs;
