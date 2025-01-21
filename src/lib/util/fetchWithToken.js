import getAuthToken from "./getAuthToken";

const fetchWithToken = async (url, options) => {
  options.headers = options.headers || {};

  const token = getAuthToken();

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, options).then((resp) => {
    if (resp.status === 401) {
      localStorage.clear();
    }

    return resp;
  });

  return response;
};

export default fetchWithToken;
