import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.0.4:3000/api/v1/users/new-user",
});