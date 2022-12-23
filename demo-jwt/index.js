const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret key to hash token";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const createJWT = (info, expiresIn = "24h") => {
    return jwt.sign(
        { info },
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

app.post('/get_token', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username == "admin" && password == "123") {
        let expiresIn = "1m";
        let token = createJWT(username, expiresIn);
        return res.json({ token });
    }
    return res.json({});
})

app.get('/verify_token', (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        let token = authHeader.substring(7, authHeader.length);
        let result = verifyJWT(token);
        return res.send({ isValid: result });
    }
    return res.json({
        message: 'Bad Request'
    });
})

app.get('/secured_data', (req, res) => {
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        let token = authHeader.substring(7, authHeader.length);
        if (verifyJWT(token)) {
            return res.json({
                message: 'You can see this message because you have a valid JWT!'
            })
        }
    }
    return res.json({
        message: 'Unauthorized Access'
    });
})

app.get('/data', (req, res) => {
    res.json({
        message: 'Everybody can get this data'
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})