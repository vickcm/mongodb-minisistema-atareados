import API from './api.service'

async function createProfile(profile) {
    return API.call({ uri: 'profiles', method: 'POST', body: profile })
}

async function getProfile() {
    return API.call({ uri: 'profiles',  })
}

export async function getCurrent() {
    return API.call({ uri: 'profiles' })
}


export default {
    createProfile,
    getProfile,
    getCurrent
}