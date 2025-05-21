import React from 'react';
import systems from '../assets/restructured_data.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedHost } from '../state/hostSlice';

const SystemList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSystemClick = (system) => {
        dispatch(setSelectedHost(system))
        navigate('/system-details')
    }
    return (
        <div style={styles.container}>
            {systems.map((system, index) => (
                <div key={index} style={styles.systemCard} onClick={() => onSystemClick(system)}>
                    <h2 style={styles.hostname}>{system.hostname}</h2>
                    <p style={styles.info}>Star Temperature: {system.star.st_teff}K</p>
                    <p style={styles.info}>Number of Planets: {system.star.sy_pnum}</p>
                    <p style={styles.info}>Distance: {system.star.sy_dist} light years</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: '20px',
        padding: '20px',
    },
    systemCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        padding: '15px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    hostname: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    info: {
        fontSize: '14px',
        marginBottom: '5px',
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    planetCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '10px',
        marginTop: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    planetInfo: {
        fontSize: '13px',
        marginBottom: '5px',
    },
};

export default SystemList;
