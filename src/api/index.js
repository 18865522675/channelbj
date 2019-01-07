import { PREFIX_URL, HOST } from "./axios";
import auth from "./api_auth";
import channel from "./api_channel";
//模块目录
const api = {
  global: {
    url: PREFIX_URL,
    host: HOST,
    img: HOST
  },
  auth,
    channel
};

export default api;
