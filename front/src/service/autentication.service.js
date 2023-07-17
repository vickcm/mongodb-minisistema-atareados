
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

export async function resetPassword(email) {
    return API.call({ uri: 'password/reset', method: 'POST', body:  {email}  })
}

export async function changePassword({token, newPassword, confirmPassword}) {
    return API.call({ uri: 'password/reset/token', method: 'POST', body:  {token, newPassword, confirmPassword}  })
}




export default {
    logout,
    login,
    createAccount, 
    resetPassword,
    changePassword
}