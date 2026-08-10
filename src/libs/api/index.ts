import axios from "axios";

import initiate from "libs/config";
import { getStore } from "stores/index";
import { logout } from "stores/auth/authSlice";

const orchestrator = axios.create({
  baseURL: initiate().service.orchestrator,
});

orchestrator.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const store = getStore();

      if (store) {
        store.dispatch(logout());
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export { orchestrator };
