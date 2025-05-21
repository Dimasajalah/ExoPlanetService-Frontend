const fs = require('fs');

// Load the data from a JSON file
const data = JSON.parse(fs.readFileSync('data_analysis_stuff/kepler_confirmed.json', 'utf8'));

// Function to restructure the data
function restructureData(data) {
    const hosts = {};

    data.forEach(item => {
        const hostname = item.hostname;

        // If the host does not exist yet, create it
        if (!hosts[hostname]) {
            hosts[hostname] = {
                hostname: hostname,
                // Properties related to the star system
                star: {
                    sy_snum: item.sy_snum,
                    sy_pnum: item.sy_pnum,
                    st_refname: item.st_refname,
                    st_spectype: item.st_spectype,
                    st_teff: item.st_teff,
                    st_rad: item.st_rad,
                    st_mass: item.st_mass,
                    st_met: item.st_met,
                    st_metratio: item.st_metratio,
                    st_logg: item.st_logg,
                    sy_dist: item.sy_dist,
                    sy_vmag: item.sy_vmag,
                    sy_kmag: item.sy_kmag,
                    sy_gaiamag: item.sy_gaiamag,
                    rastr: item.rastr,
                    ra: item.ra,
                    decstr: item.decstr,
                    dec: item.dec,
                    sy_refname: item.sy_refname
                },
                // Planets list
                planets: []
            };
        }

        // Push planet details into the planets list of the corresponding host
        hosts[hostname].planets.push({
            // Planet-specific properties
            pl_name: item.pl_name,
            default_flag: item.default_flag,
            discoverymethod: item.discoverymethod,
            disc_year: item.disc_year,
            disc_facility: item.disc_facility,
            soltype: item.soltype,
            pl_controv_flag: item.pl_controv_flag,
            pl_refname: item.pl_refname,
            pl_orbper: item.pl_orbper,
            pl_orbsmax: item.pl_orbsmax,
            pl_rade: item.pl_rade,
            pl_radj: item.pl_radj,
            pl_bmasse: item.pl_bmasse,
            pl_bmassj: item.pl_bmassj,
            pl_bmassprov: item.pl_bmassprov,
            pl_orbeccen: item.pl_orbeccen,
            pl_insol: item.pl_insol,
            pl_eqt: item.pl_eqt,
            ttv_flag: item.ttv_flag,
            rowupdate: item.rowupdate,
            pl_pubdate: item.pl_pubdate,
            releasedate: item.releasedate,
            planet_classification: item.planet_classification,
            planet_colour_approximation: item.planet_colour_approximation
        });
    });

    // Convert hosts object to an array of star systems
    return Object.values(hosts);
}

// Restructure the data
const structuredData = restructureData(data);


fs.writeFileSync('restructured_data.json', JSON.stringify(structuredData, null, 2), 'utf8');
