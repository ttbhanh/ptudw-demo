const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret key to hash token";

const createJWT = (email, expiresIn = "24h") => {
    return jwt.sign(
        { email },
        SECRET_KEY,
        { expiresIn }
    );
}

const verifyJWT = (token) => {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

app.get('/', (req, res) => {
    res.send('Hello')
})
app.get('/creat_jwt', (req, res) => {
    let expiresIn = "30s";
    let token = createJWT(req.query.email, expiresIn);
    res.json({ token });
})

app.get('/verify_jwt', (req, res) => {
    let result = verifyJWT(req.query.token);
    res.send(result);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})