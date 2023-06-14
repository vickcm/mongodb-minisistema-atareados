import * as challengeService from '../../services/challenges.services.js'


async function createChallenge(req, res) {
    console.log('Create Challenge Request:', req.body); // Agrega este console.log
    console.log('Create Challenge Account:', req.account); // Agrega este console.log
    return challengeService.createChallenge(req.body, req.account)
    .then (() => {
        res.status(201).json({ message: "Desafío creado exitosamente." })
    })
    .catch(err => {
        res.status(400).json({ error: { message: err.message } });
    }
    );

}

export { createChallenge };

