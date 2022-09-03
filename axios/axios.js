// Setting up the axios library with the base url and the headers for the requests(bearer token)

import axios from "axios";

const instance = axios.create({
  baseURL: "https://temmyblogify.herokuapp.com/api",
  // solving localStorage not defined error
  headers: {
    Authorization: "",
  },
});

export default instance;
