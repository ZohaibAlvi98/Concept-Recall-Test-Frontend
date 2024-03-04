import axios from "axios";
import ApiResolver from "../apis/ApiResolver";

class CoreHttpHandlerClass {
    constructor() {
        //this.apiEndpoint = process.env.REACT_APP_FRONTEND_ENDPOINT
        // this.apiEndpoint = 'https://bowapi-dev.cubestagearea.xyz/api/v1';
        this.apiEndpoint = 'http://localhost:4040/api';

        this.config = {
            headers: {
                'content-type': 'text/plain'
            }
        };
    }

    beforeSend = (data) => {};

    afterSend = (data) => {};

    get(args) {
        return axios['get'].apply(this, [args]);
    }

    request(name, service, params, success, failure, promise = false) {
        const resolvedApi = ApiResolver.resolve(name, service);
        const apiCall = { ...resolvedApi };
        let apiPath = `${this.apiEndpoint}${apiCall.path}`;
        // if (
        // 	apiCall.headers.hasOwnProperty("xt-client-token") &&
        // 	apiCall.headers["xt-client-token"] === null
        // ) {
        // 	apiCall.headers["xt-client-token"] = localStorage.getItem("client_token");
        // 	if (apiCall.headers["xt-client-token"] === null)
        // 		throw new Error(
        // 			`Cannot call remote service without authentication token`
        // 		);
        // }
        if (apiCall.headers.hasOwnProperty('token') && apiCall.headers['token'] === null) {
            apiCall.headers['token'] = localStorage.getItem('token')
                ? localStorage.getItem('token')
                : localStorage.getItem('dm_token');
            if (apiCall.headers['token'] === null)
                throw new Error(`Cannot call remote service without user authentication token`);
        }
        const _config = { headers: { ...apiCall.headers } };
        if (params.key !== undefined && apiCall.method === 'get') {
            apiPath = apiPath.replace(params.key, params.value);
            apiPath = apiPath.replace(params.key2, params.value2);
            apiPath = apiPath.replace(params.key3, params.value3);
        }
        if (apiCall.method === 'get' && params) {
            const queryParams = new URLSearchParams(params); // Convert params to URLSearchParams
            apiPath = `${apiPath}?${queryParams.toString()}`; // Append query parameters to the URL
        }
        if (
            params.key !== undefined &&
            (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete')
        ) {
            apiPath = apiPath.replace(params.key, params.value);
            if (params.key2 !== undefined) apiPath = apiPath.replace(params.key2, params.value2);
        }
        if (apiCall.method === 'put' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }
        if (apiCall.method === 'delete' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }

        const args = [apiPath];
        if (apiCall.method === 'get') {
            args.push(_config);
        } else {
            if (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete') {
                if (params.params) {
                    args.push(params.params);
                } else args.push(params);
            } else {
                args.push(params);
            }
            args.push(_config);
        }
        if (promise) {
            return axios[apiCall.method].apply(this, args);
        } else {
            axios[apiCall.method]
                .apply(this, args)
                .then((result) => {
                    success(result);
                })
                .catch((error) => {
                    const ah = JSON.stringify(error);
                    const ff = JSON.parse(ah);
                    if (ff.message === 'Request failed with status code 401') {
                        alert('Your session has expired please try to login in again');
                        // localStorage.clear();
                        // window.location.reload(false);
                        return;
                    }
                    failure(error);
                });
        }
    }
    requestCustomer(name, service, params, success, failure, promise = false) {
        const resolvedApi = ApiResolver.resolve(name, service);

        const apiCall = { ...resolvedApi };
        let apiPath = `${this.apiEndpoint}${apiCall.path}`;
        if (apiCall.headers.hasOwnProperty('xt-client-token') && apiCall.headers['xt-client-token'] === null) {
            apiCall.headers['xt-client-token'] = localStorage.getItem('client_token');
            if (apiCall.headers['xt-client-token'] === null)
                throw new Error(`Cannot call remote service without authentication token`);
        }
        if (apiCall.headers.hasOwnProperty('xt-user-token') && apiCall.headers['xt-user-token'] === null) {
            apiCall.headers['xt-user-token'] = localStorage.getItem('user_token');
            if (apiCall.headers['xt-user-token'] === null)
                throw new Error(`Cannot call remote service without user authentication token`);
        }
        const _config = { headers: { ...apiCall.headers } };
        if (params.key !== undefined && apiCall.method === 'get') {
            apiPath = apiPath.replace(params.key, params.value);
            apiPath = apiPath.replace(params.key2, params.value2);
            apiPath = apiPath.replace(params.key3, params.value3);
        }
        if (
            params.key !== undefined &&
            (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete')
        ) {
            apiPath = apiPath.replace(params.key, params.value);
        }
        if (apiCall.method === 'put' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }
        if (apiCall.method === 'delete' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }

        const args = [apiPath];
        args.push(_config);

        if (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete') {
            if (params.params) {
                args.push(params.params);
            } else args.push(params);
        } else {
            args.push(params);
        }
        if (promise) {
            return axios[apiCall.method].apply(this, args);
        } else {
            axios[apiCall.method]
                .apply(this, args)
                .then((result) => {
                    success(result);
                })
                .catch((error) => {
                    const ah = JSON.stringify(error);
                    const ff = JSON.parse(ah);
                    if (ff.message === 'Request failed with status code 401') {
                        alert('Your session has expired please try to login in again');
                        localStorage.clear();
                        window.location.reload(false);
                        return;
                    }
                    failure(error);
                });
        }
    }
}

const CoreHttpHandler = new CoreHttpHandlerClass();
export default CoreHttpHandler;