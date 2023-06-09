import API from './api.service'


export async function logout() {
    return API.call({ uri: 'session', method: 'DELETE' })
}

// agregar login 


export default {
    logout
}
