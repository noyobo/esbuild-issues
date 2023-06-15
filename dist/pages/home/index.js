import {
  actions,
  dpCodes_default,
  dp_default,
  store,
  useSelector
} from "../../chunk-AFYZHPWT.js";

// src/pages/home/index.tsx
var { powerCode, workModeCode } = dpCodes_default;
var { dispatch } = store;
function Home() {
  console.log(dp_default, useSelector, store, actions, dispatch);
}
var home_default = Home;
export {
  Home,
  home_default as default
};
