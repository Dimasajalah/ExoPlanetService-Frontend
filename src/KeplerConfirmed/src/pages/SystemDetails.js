import React from 'react';
import { useSelector } from 'react-redux';
import { useGenerateImageFromTextMutation } from '../state/api/models-lab';
import { generateStableDiffusionPrompt } from '../utils/transformers';
import PlanetRenderer from '../components/PlanetRenderer';

// Styling object using JavaScript
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',

        padding: '0rem 4rem',
        textAlign: 'center',
        color: '#333',
        background: 'white',
    },
    hostInfo: {
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#2c3e50',
    },
    description: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#555',
    },
    planetList: {
        listStyleType: 'none',
        padding: '0',
    },
    planetItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f1f2f6',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '15px',
        textAlign: 'left',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    planetTitle: {
        fontSize: '22px',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#1abc9c',
    },
    planetDescription: {
        fontSize: '15px',
        color: '#34495e',
        lineHeight: '1.5',
    },
    imageContainer: {
        marginTop: '20px',
        marginBottom: '30px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '30px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#3498db',
    },
    loading: {
        fontSize: '18px',
        color: '#333',
    }
};

const SystemDetails = () => {
    const systemData = useSelector((state) => state.host.selectedHost);
    const { hostname, star, planets } = systemData;
    const [generateImage, { isLoading, data }] = useGenerateImageFromTextMutation();

    const handleGenerateImage = async () => {
        if (systemData) {
            const prompt = generateStableDiffusionPrompt(systemData);
            await generateImage({ prompt });
        }
    };

    const renderPlanetDetail = (label, value) => {
        return (
            <span>
                <strong>{label}:</strong> {value ?? 'Undocumented'} <br />
            </span>
        );
    };

    return (
        <div style={styles.container}>

            {/* Host Information */}
            <div style={styles.hostInfo}>
                <h1 style={styles.title}>{hostname}</h1>
                <p style={styles.description}>
                    <strong>Star Details:</strong> <br />
                    Effective Temperature: {star.st_teff} K <br />
                    Radius: {star.st_rad} Solar Radii <br />
                    Mass: {star.st_mass} Solar Masses <br />
                    Distance: {star.sy_dist} light years <br />
                    Visible Magnitude: {star.sy_vmag} <br />
                    Coordinates (RA/Dec): {star.rastr}, {star.decstr}
                </p>
                {/* Button to generate the image */}
                <button style={styles.button} onClick={handleGenerateImage} disabled={isLoading}>
                    {isLoading ? 'Generating Image...' : 'Generate Image'}
                </button>

                {data && (
                    <div style={styles.imageContainer}>
                        {data.output.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Generated ${index}`} style={styles.image} />
                        ))}
                    </div>
                )}

            </div>

            {/* Planets List */}
            <h2 style={styles.title}>Planets</h2>
            <ul style={styles.planetList}>
                {planets.map((planet, index) => (
                    <li key={index} style={styles.planetItem}>
                        <h3
                            style={{
                                ...styles.planetTitle,
                                color: planet.planet_colour_approximation || 'black', // Set color based on planet's color approximation
                            }}
                        >
                            {planet.pl_name}
                        </h3>
                        <PlanetRenderer
                            planetClassification={planet.planet_classification}
                            width={700}
                            height={400}
                            planetColor={planet.planet_colour_approximation}
                        />
                        <p style={styles.planetDescription}>
                            {renderPlanetDetail('Discovery Method', planet.discoverymethod)}
                            {renderPlanetDetail('Discovery Year', planet.disc_year)}
                            {renderPlanetDetail('Discovery Facility', planet.disc_facility)}
                            {renderPlanetDetail('Orbital Period', planet.pl_orbper && `${planet.pl_orbper} days`)}
                            {renderPlanetDetail('Mass', planet.pl_bmasse && `${planet.pl_bmasse} Earth Masses`)}
                            {renderPlanetDetail('Eccentricity', planet.pl_orbeccen)}
                            {renderPlanetDetail('Assumed planet type', planet.planet_classification)}
                            {renderPlanetDetail('Assumed colour', planet.planet_colour_approximation)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SystemDetails;
