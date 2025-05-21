import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedHost: {
        hostname: null,
        star: {
            sy_snum: null,
            sy_pnum: null,
            st_refname: null,
            st_spectype: null,
            st_teff: null,
            st_rad: null,
            st_mass: null,
            st_met: null,
            st_metratio: null,
            st_logg: null,
            sy_dist: null,
            sy_vmag: null,
            sy_kmag: null,
            sy_gaiamag: null,
            rastr: null,
            ra: null,
            decstr: null,
            dec: null,
            sy_refname: null
        },
        planets: [
            {
                pl_name: null,
                default_flag: null,
                discoverymethod: null,
                disc_year: null,
                disc_facility: null,
                soltype: null,
                pl_controv_flag: null,
                pl_refname: null,
                pl_orbper: null,
                pl_orbsmax: null,
                pl_rade: null,
                pl_radj: null,
                pl_bmasse: null,
                pl_bmassj: null,
                pl_bmassprov: null,
                pl_orbeccen: null,
                pl_insol: null,
                pl_eqt: null,
                ttv_flag: null,
                rowupdate: null,
                pl_pubdate: null,
                releasedate: null
            }
        ]
    }
}

export const hostSlice = createSlice({
    name: 'host',
    initialState,
    reducers: {
        setSelectedHost: (state, action) => {
            state.selectedHost = action.payload
        }
    },
})

export const { setSelectedHost } = hostSlice.actions

export default hostSlice.reducer