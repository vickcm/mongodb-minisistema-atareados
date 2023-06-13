import API from './api.service'

export async function login({email, password}) {
    return API.call({ uri: 'session', method: 'POST', body: { email, password } })
}
export async function logout() {
    return API.call({ uri: 'session', method: 'DELETE' })
}

// agregar login 


export default {
    logout,
    login
}
