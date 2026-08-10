import { toast, ToastOptions, ToastPosition } from "react-toastify";

import debounce from "./debounce";

export function notify(
  msg: string,
  type: "success" | "error" = "success",
  position: ToastPosition = "top-center",
) {
  const opt = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  } as ToastOptions;

  if (type === "success") {
    toast.success(msg, opt);
  } else {
    toast.error(msg, opt);
  }
}

export const debounceNotify = debounce(
  (msg, type: "success" | "error" = "success", isMobile) =>
    notify(msg, type, isMobile ? "bottom-center" : "top-center"),
  1000,
);
