import { $ } from "./axios";

export default {
  login: params => $.get("/admin/login", params, { lock: true }),
  logout: params => $.post("/admin/logout", params, { lock: true }),
};
