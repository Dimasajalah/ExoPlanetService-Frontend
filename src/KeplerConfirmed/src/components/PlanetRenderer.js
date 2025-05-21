import * as THREE from 'three';
import { useEffect, useRef } from "react";

// Textures for different planet types
import gasTexture from '../assets/textures/gas.jpeg';
import jupiterTexture from '../assets/textures/jupiter.jpg';
import neptuneTexture from '../assets/textures/neptune.jpg';
import terrestrialTexture from '../assets/textures/terrestial.jpg';
import superEarthTexture from '../assets/textures/superearth.png';

function PlanetRenderer({ planetClassification = 'Unknown type (insufficient data)', width = window.innerWidth, height = window.innerHeight, planetColor }) {
    const refContainer = useRef(null);

    useEffect(() => {
        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); // Use custom width and height

        // Append renderer to the ref container instead of document.body
        const currentContainer = refContainer.current;
        if (currentContainer) {
            currentContainer.appendChild(renderer.domElement);
        }

        // Determine texture based on planet classification (ignore color)
        const textureLoader = new THREE.TextureLoader();
        let planetTexture;

        switch (planetClassification.toLowerCase()) {
            case 'terrestrial (rocky planet like earth)':
            case 'terrestrial (based on mass)':
                planetTexture = textureLoader.load(terrestrialTexture); // Terrestrial planet texture
                break;
            case 'super-earth (larger rocky planet)':
            case 'super-earth (based on mass)':
                planetTexture = textureLoader.load(superEarthTexture); // Super-Earth planet texture
                break;
            case 'mostly gas (gas-dominant planet like neptune)':
            case 'neptune-like (gas planet like neptune)':
            case 'mostly gas (large gas-dominant planet)':
            case 'neptune-like (large gas-dominant planet)':
            case 'neptune-like (based on mass)':
                planetTexture = textureLoader.load(neptuneTexture); // Neptune-like planet texture
                break;
            case 'jupiter-like (gas giant like jupiter)':
            case 'mostly gas (gas-dominant planet)':
                planetTexture = textureLoader.load(jupiterTexture); // Jupiter-like planet texture
                break;
            case 'unknown type (in between sizes)':
            case 'unknown type (in between masses)':
            case 'unknown type (insufficient data)':
            default:
                planetTexture = textureLoader.load(gasTexture); // Default gas texture for unknown types
                break;
        }

        // Create material using the texture
        const material = new THREE.MeshBasicMaterial({ map: planetTexture });

        // Create sphere geometry (planet)
        const geometry = new THREE.SphereGeometry(1.7, 32, 32); // Adjust size if needed
        const planet = new THREE.Mesh(geometry, material);
        scene.add(planet);

        // Set camera position
        camera.position.z = 5;

        // Animate the planet (rotation)
        const animate = function () {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.005; // Rotate around the Y axis
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            renderer.setSize(width, height); // Set size to prop width and height
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentContainer) {
                currentContainer.removeChild(renderer.domElement);
            }
        };

    }, [planetClassification, width, height]); // Re-run effect if planetClassification or size changes

    return (
        <div
            ref={refContainer}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: '20px', // Add border radius
                overflow: 'hidden', // Ensure content respects the border radius
            }}
        ></div>
    );
}

export default PlanetRenderer;
