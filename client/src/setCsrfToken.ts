import axios from 'axios';

const setCsrfToken = (token: string) => {
    if(token) {
        axios.defaults.headers.common['csrf-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['csrf-token'];
    }
}

export default setCsrfToken;