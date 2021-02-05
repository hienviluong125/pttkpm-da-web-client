import axios from "axios";

import { getToken } from "../libs/token";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

export default instance;
