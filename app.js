'use strict'

require('dotenv').config();
const endpoints = require('./constants/endpoints');
const request = require('./utils/request');

/**
 * Gets the authorization token and instance url.
 * 
 * @returns {Object} - Object with the instance and token information.
 */
const login = async () => {
    console.log('Executing login...')
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

    return response;
}

/**
 * Create a job via Bulk API 2.0.
 *
 * @param {Object} options
 * @property {String} options.url - Its the instance url and the endpoint to create the job concatenated.
 * @property {Object} options.headers - Has the bearer token and the content type
 * @property {Object} options.body - Options to create the job. More details at https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm
 * @returns {Object} - Object with job information. More details at https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm
 *  
 */
const createJob = async(options) => {
    console.log('Executing createJob...')
    const response = await request.request(options.url, options.headers, 'POST', JSON.stringify(options.body));
    return response;
}

/**
 * Upload data to job via Bulk API 2.0.
 *
 * @param {Object} options
 * @property {String} options.url - Its the instance url and the content url from the job response.
 * @property {Object} options.headers - Has the bearer token and the content type
 * @property {Object} options.body - Stream of the chunk of the csv file
 * @returns {Object} - Object with job information. More details at https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm
 *  
 */
const uploadJobData = async(options) => {
    console.log('Executing uploadJobData...')
    return await request.request(options.url, options.headers, 'PUT', options.body, true);
}

/**
 * Upload data to job via Bulk API 2.0.
 *
 * @param {Object} options
 * @property {String} options.url - Its the instance url and the endpoint to create the job concatenated without the batches.
 * @property {Object} options.headers - Has the bearer token and the content type
 * @property {Object} options.body - State with UploadComplete
 * @returns {Object} - Object with job information. More details at https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm
 */
const closeJob = async (options) => {
    console.log('Executing closeJob...')
    return await request.request(options.url, options.headers, 'PATCH', JSON.stringify(options.body));
}

/**
 * Upload data to job via Bulk API 2.0.
 *
 * @param {Object} options
 * @property {String} options.url - Its the instance url and the endpoint to create the job concatenated without the batches.
 * @property {Object} options.headers - Has the bearer token and the content type
 * @returns {Object} - Object with job information. More details at https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm
 */
const getJobInfo = async (options) => {
    console.log('Executing getJobInfo...')
    return await request.request(options.url, options.headers, 'GET', null);
}

const getErroredRecords = async (options) => {
    console.log('Executing getErroredRecords...')
    return await request.request(options.url, options.headers, 'GET', null);
}

module.exports = {
    login,
    createJob,
    uploadJobData,
    closeJob,
    getJobInfo,
    getErroredRecords,
    endpoints
}