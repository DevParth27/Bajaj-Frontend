import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/hackrx/run';
const TOKEN = '433c9562217435ac71d779508405bfa9b20d0f58ff2aeb482c16c0e251f9f85f';

export const getAnswers = (documents, questions) => {
  return axios.post(
    API_URL,
    { documents, questions },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      withCredentials: false,
    }
  );
};