import * as THREE from 'three';
import { useEffect, useRef } from "react";
import earth from '../assets/8k_earth_daymap.jpg';

function MyThree() {
    const refContainer = useRef(null);

    useEffect(() => {
        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Append renderer to the ref container instead of document.body
        const currentContainer = refContainer.current; // Copy the ref value to a variable
        if (currentContainer) {
            currentContainer.appendChild(renderer.domElement);
        }

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load(earth);

        // Create sphere geometry (planet) with texture
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: earthTexture });
        const planet = new THREE.Mesh(geometry, material);
        scene.add(planet);

        // Set camera position
        camera.position.z = 5;

        // Animate the planet (rotation)
        const animate = function () {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.001; // Rotate around the Y axis
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentContainer) { // Use the stored variable for cleanup
                currentContainer.removeChild(renderer.domElement);
            }
        };

    }, []);

    return <div ref={refContainer}></div>;
}

export default MyThree;
