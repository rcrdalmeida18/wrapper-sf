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

     
        console.log('fetch data :: ' , url, method, headers)
        const response = await request.json();

        if (noresponse) {
            console.log('noresponse :: ' , response )
        }
        

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