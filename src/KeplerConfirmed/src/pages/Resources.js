import React from 'react';
import backgroundImage from '../assets/background0.jpg'
const Resources = () => {
    // An array of references with text and URLs
    const references = [
        { text: "NASA Exoplanet Exploration", url: "https://science.nasa.gov/exoplanets/" },
        { text: "HD 209458b", url: "https://science.nasa.gov/resource/hd-209458b/" },
        { text: "Proxima b 3D Model", url: "https://science.nasa.gov/resource/proxima-b-3d-model/" },
        { text: "GJ 436 b", url: "https://exoplanets.nasa.gov/exoplanet_watch_results/gj_436_b/" },
        { text: "Webb Discovers Methane and Carbon Dioxide in Atmosphere of K2-18 b", url: "https://www.nasa.gov/universe/exoplanets/webb-discovers-methane-carbon-dioxide-in-atmosphere-of-k2-18-b/" },
        { text: "Exoplanet Archive", url: "https://exoplanetarchive.ipac.caltech.edu/docs/counts_detail.html" },
        { text: "Planet Types", url: "https://science.nasa.gov/exoplanets/planet-types/" },
        { text: "Gas Giant", url: "https://science.nasa.gov/exoplanets/gas-giant/" },
        { text: "Neptune-like", url: "https://science.nasa.gov/exoplanets/neptune-like/" },
        { text: "Super Earth", url: "https://science.nasa.gov/exoplanets/super-earth/" },
        { text: "Terrestrial", url: "https://science.nasa.gov/exoplanets/terrestrial/" },
        { text: "ExEP (Exoplanet Exploration Program)", url: "https://science.nasa.gov/astrophysics/programs/exep/" },
        { text: "How We Find and Characterize Exoplanets", url: "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/" },
    ];

    return (
        <div style={styles.container}>
            {/* References List */}
            <div style={styles.referencesContainer}>
                <h2 style={styles.referencesTitle}>References</h2>
                <ul style={styles.referencesList}>
                    {references.map((reference, index) => (
                        <li key={index} style={styles.referenceItem}>
                            <span>{reference.text}: </span>
                            <a
                                href={reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.link}
                            >
                                {reference.url}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensures the image covers the container
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center', // Centers the image in the container
    },
    referencesContainer: {
        padding: '20px',
        margin: '5rem 0rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
    },
    referencesTitle: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    referencesList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        textAlign: 'left', // Align text to the left for readability
    },
    referenceItem: {
        fontSize: '18px',
        margin: '5px 0',
    },
    link: {
        textDecoration: 'none', // Remove underline from links
        color: '#007BFF', // Link color
        transition: 'color 0.2s', // Transition effect for hover
    },
};

export default Resources;
