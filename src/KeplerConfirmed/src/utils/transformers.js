export function generateStableDiffusionPrompt(system) {
    const { star, planets } = system;

    // Generalized star description with dynamic values
    const starDescription = `A distant star system located approximately ${Math.round(star.sy_dist)} light-years away. ` +
        `The star shines brightly with a surface temperature of ${star.st_teff} Kelvin. ` +
        `It has a radius of ${star.st_rad} times that of our Sun, and its mass is ${star.st_mass} times the mass of the Sun. ` +
        `This system contains ${star.sy_pnum} planet${star.sy_pnum > 1 ? 's' : ''} in orbit around it. `;

    // Dynamically describing each planet
    const planetDescriptions = planets.map(planet => {
        return `One of its planets, 2MASS J19383260+4603591 b, is classified as an ${planet.planet_classification}. ` +
            (planet.pl_bmasse ? `This planet has a mass ${Math.round(planet.pl_bmasse)} times that of Earth. ` : "") +
            (planet.pl_orbper ? `It takes ${planet.pl_orbper} days to complete an orbit around the star. ` : "") +
            `The planet follows an elliptical orbit with an eccentricity of ${planet.pl_orbeccen}. ` +
            `Its approximate color is represented by ${planet.planet_colour_approximation}.`;
    }).join(" ");

    // Final prompt with imaginative language
    const finalPrompt = `${starDescription}${planetDescriptions} Picture this distant system in space, with the star emitting a steady glow, ` +
        `while its planets move in smooth elliptical paths. Visualize the star and planets in the vastness of space, creating a serene and mesmerizing cosmic landscape.`;

    return finalPrompt;
}
