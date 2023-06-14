import API from './api.service'


async function createProfile(profile) {
    return API.call({ uri: 'profiles', method: 'POST', body: profile })
}

export default {
    createProfile
}


