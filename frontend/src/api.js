import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const performOCR = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/ocr', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default api;
