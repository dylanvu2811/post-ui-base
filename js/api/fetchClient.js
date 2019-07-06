import queryString from "./queryString.js";

const request = async (url, option) => {

    try {
        const requestOptions = {
            ...option,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        // fetch data
        const reponse = await fetch(url, requestOptions);
    
        // check data
        if(reponse.status >= 200 && reponse.status < 300){
            const data = await reponse.json();
            return data;
        }
    
        // handle error
        const error = new Error(reponse.status);
        throw error;
    } catch (error) {
        throw error;
    }
};

// const get = (url, params) => request(url, {method:'GET'});
const get = async (url, params) => {
    const paramString = params ? `?${queryString.stringify(params)}` : '';
    const requestUrl = `${url}${paramString}`;
    return request(requestUrl, { method: 'GET' });
};

const post = (url, body) => request(url, {body: JSON.stringify(body), method:'POST'});

const patch = (url, body) => request(url, {body: JSON.stringify(body), method:'PATCH'});

const deleteRequest = (url) => request(url, {method:'DELETE'});

const fetchClient = {
    get,
    post,
    patch,
    delete: deleteRequest,
}

export default fetchClient;