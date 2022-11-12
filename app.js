require('dotenv').config();
const endpoints = require('./constants/endpoints');
const request = require('./utils/request');

const login = async () => {
    const body = {
        grant_type: 'password',
        client_id: process.env.SF_CLIENT_ID,
        client_secret: process.env.SF_CLIENT_SECRET,
        username: process.env.SF_USERNAME,
        password: process.env.SF_PASSWORD+process.env.SF_SECURITY_TOKEN,
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const url = process.env.SF_URL + endpoints.login;

    const response = await request.request(url, headers, 'POST', new URLSearchParams(body))
    console.log(response)


}

module.exports = {
    login
}