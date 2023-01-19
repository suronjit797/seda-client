import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

class RestAPI {
  get = (url, config = {}) => {
    const endpoint = BASE_URL + url;
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, {
          withCredentials: true,
          ...config,
        })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };

  put = (url, payload, config = {}) => {
    const endpoint = BASE_URL + url;
    return new Promise((resolve, reject) => {
      axios
        .put(endpoint, payload, {
          withCredentials: true,
          ...config,
        })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };

  post = (url, payload, config = {}) => {
    const endpoint = BASE_URL + url;
    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, payload, {
          withCredentials: true,
          ...config,
        })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };
  delete = (url, config = {}) => {
    const endpoint = BASE_URL + url;
    return new Promise((resolve, reject) => {
      axios
        .delete(endpoint, {
          withCredentials: true,
          ...config,
        })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };
}

export const api = new RestAPI();
