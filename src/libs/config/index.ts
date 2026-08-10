// This file is to switch between every environment configs prior running the app
import development from "./development";
import staging from "./staging";
import production from "./production";

function initiate() {
  let config = undefined;

  if (process.env.NEXT_PUBLIC_APP_ENV === "production") {
    config = production;
  } else if (process.env.NEXT_PUBLIC_APP_ENV === "staging") {
    config = staging;
  } else {
    config = development;
  }

  return config;
}

export default initiate;
