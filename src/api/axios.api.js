import axios from "axios";

const instance = axios.create({
  baseURL: "https://cinema-api-test.y-media.io/v1/",
});
export default instance;
