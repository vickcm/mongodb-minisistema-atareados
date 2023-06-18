import API from './api.service'

async function createChallenge(challenge) {
    return API.call({ uri: 'desafios', method: 'POST', body: challenge })
}

async function getChallengesByUserId(id) {
    return API.call({ uri: 'desafios', method: 'POST', body: id })
}

async function getChallenges() {
    return API.call({ uri: 'desafios', method: 'GET' })
}




export default {
    createChallenge,
    getChallengesByUserId,
    getChallenges
}