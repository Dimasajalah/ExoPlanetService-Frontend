import React from 'react';

const Section = ({ title, text, image, reverse }) => {
    return (
        <div style={{ ...styles.section, flexDirection: reverse ? 'row-reverse' : 'row' }}>
            <div style={styles.textContainer}>
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.text}>{text}</p>
            </div>
            <div style={styles.imageContainer}>
                <img src={image} alt={title} style={styles.image} />
            </div>
        </div>
    );
};

const styles = {
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 100px',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '50px',
        borderRadius: '10px',
    },
    textContainer: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: 'white',
    },
    text: {
        fontSize: '18px',
        lineHeight: '1.6',
        color: 'white',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
    },
};

export default Section;
