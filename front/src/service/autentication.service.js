
import API from './api.service'

export async function login({email, password}) {
    return API.call({ uri: 'session', method: 'POST', body: { email, password } })
}
export async function logout() {
    return API.call({ uri: 'session', method: 'DELETE' })
}

export  async function createAccount(account) {
    return API.call({ uri: 'accounts', method: 'POST', body: account })
}

export default {
    logout,
    login,
    createAccount
}