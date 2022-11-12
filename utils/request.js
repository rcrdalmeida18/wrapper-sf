const fetch = require('node-fetch')
const request = async (url, headers, method, data, noresponse) => {
    try {
        const request = await fetch(
            url, {
                method, 
                headers, 
                body: data
            }
        );

        if (noresponse) {
            return;
        }

        const response = await request.json();

        return {
            status: request.status,
            error: request.status < 200 || request.status > 300,
            response
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {request};