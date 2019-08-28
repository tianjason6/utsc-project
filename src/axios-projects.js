import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://utsc-projects.firebaseio.com/'
});

export default instance;