// Setting up the axios library with the base url and the headers for the requests(bearer token)

import axios from "axios";

const instance = axios.create({
  baseURL: "https://temmyblogify.up.railway.app/api",
});

export default instance;
