import axios from 'axios';

const myUrl =  'https://qikke.cn/api/'

axios.defaults.baseURL = myUrl;
axios.create({
  timeout: 5000
});

export default axios;