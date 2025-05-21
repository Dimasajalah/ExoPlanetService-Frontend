import React from 'react';

const Section = ({ title, text, backgroundImage, reverse }) => {
    return (
        <div style={{ 
            ...styles.section, 
            flexDirection: reverse ? 'row-reverse' : 'row', 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain', // Adjusted to make the image fit without cropping
            backgroundRepeat: 'no-repeat' // Prevent repeating of the background image
        }}>
            <div style={styles.overlay}></div>
            <div style={styles.textContainer}>
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.text}>{text}</p>
            </div>
        </div>
    );
};

const styles = {
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        color: 'white',
        position: 'relative',
        backgroundPosition: 'center',
        margin: '20px 0',
        height: '400px', // Set height as needed
        borderRadius: '10px',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    textContainer: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '20px',
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

export default Section;
