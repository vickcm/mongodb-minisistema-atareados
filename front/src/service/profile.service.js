import API from './api.service'

async function createProfile(profile) {
    return API.call({ uri: 'profiles', method: 'POST', body: profile })
}

async function getProfile() {
    return API.call({ uri: 'profiles',  })
}

async function updateProfile(profile) {
    return API.call({ uri: 'profiles', method: 'PATCH', body: profile })
}


export default {
    createProfile,
    getProfile, 
    updateProfile
}