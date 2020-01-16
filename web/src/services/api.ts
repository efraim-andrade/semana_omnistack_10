import axios from 'axios';

const apiEndpoint = 'http://localhost:3333/';

export default axios.create({
  baseURL: apiEndpoint,
});
