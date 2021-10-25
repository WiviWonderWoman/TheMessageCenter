import axios from 'axios';

const Caller = axios.create({
    baseURL: 'https://localhost:5001/Chat/rooms'
});
export default Caller;