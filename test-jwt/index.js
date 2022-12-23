const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const session = require('express-session');
const axios = require('axios');
const api_host = "http://localhost:2000";

app.use(session({
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
    secret: 'secret to hash session id',
    resave: false,
    saveUninitialized: false
}))

async function verifyToken(token) {
    try {
        let result = await axios.get(`${api_host}/verify_token`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return result.data.isVerify;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getToken() {
    try {
        let result = await axios.post(`${api_host}/get_token`, {
            username: 'admin',
            password: '123'
        });
        return result.data.token;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function keepToken(req, res, next) {
    try {
        if (req.session.token) {  // neu da co token
            let token = req.session.token;
            // kiem tra token hop le
            if (await verifyToken(token)) {
                return next();
            }
        }
        // nguoc lai lay token moi
        req.session.token = await getToken();
        next();
    }
    catch (err) {
        res.json({
            message: 'Can not get JWT form WEB API'
        })
    }
}

async function getSecuredData(token) {
    try {
        let result = await axios.get(`${api_host}/secured_data`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return result.data;

    } catch (err) {
        console.error(err);
        return err;
    }
}

app.get('/', async (req, res) => {
    res.send('Demo access secured API with JWT');
})

app.get('/secured_data', keepToken, async (req, res) => {
    let result = await getSecuredData(req.session.token);
    res.json(result);
})

app.get('/get_token', async (req, res) => {
    res.json({
        token: await getToken()
    })
})

app.get('/secured_data/:token', async (req, res) => {
    let result = await getSecuredData(req.params.token);
    res.json(result);
})

app.get('/data', async (req, res) => {
    try {
        let result = await axios.get(`${api_host}/data`);
        res.json(result.data);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})