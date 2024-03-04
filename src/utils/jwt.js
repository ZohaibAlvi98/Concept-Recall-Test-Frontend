import jwtDecode from 'jwt-decode';
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (token) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
};

const setSession = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers = `${token}`;
        // This function below will handle when token is expired
        // const { exp } = jwtDecode(token);
        // handleTokenExpired(exp);
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers;
    }
};

export { isValidToken, setSession };
