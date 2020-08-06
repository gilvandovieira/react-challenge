import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:8080/api`,
    headers: { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' },
    responseType: "json"
});