import * as challengeService from '../../services/challenges.services.js'


async function createChallenge(req, res) {
    console.log('Create Challenge Request:', req.body); // Agrega este console.log
    console.log('Create Challenge Account linea 6 controller:', req.account); // Agrega este console.log
    const challenge = req.body;
    const account = req.account;

    return challengeService.createChallenge(challenge, account)
    .then (() => {
        res.status(201).json({ message: "Desafío creado exitosamente." })
    })
    .catch(err => {
        res.status(400).json({ error: { message: err.message } });
    }
    );

}

async function getChallengesByUserId(req, res) {
    const account = req.account;

    return challengeService.getChallengesByUserId(account._id)
    .then (challenges => {
        res.status(200).json(challenges);
    })
    .catch(err => {
        res.status(400).json({ error: { message: err.message } });
    }
    );

}


export { createChallenge, getChallengesByUserId };

