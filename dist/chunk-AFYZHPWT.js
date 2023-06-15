// src/config/dpCodes.ts
var dpCodes_default = {
  // 开关
  powerCode: "switch_led",
  // 工作模式
  workModeCode: "work_mode",
  // 亮度
  brightCode: "bright_value",
  // 色温
  tempCode: "temp_value",
  // 彩光
  colourCode: "colour_data",
  // 实时调节dp
  controlCode: "control_data"
};

// src/redux/index.ts
import { shallowEqual, useSelector as useSelectorBase } from "react-redux";

// src/constant/index.ts
var DEV_INFO_CHANGE = "DEV_INFO_CHANGE";
var RESPONSE_UPDATE_DP = "RESPONSE_UPDATE_DP";
var UPDATE_CLOUD = "UPDATE_CLOUD";
var UPDATE_UI = "UPDATE_UI";

// src/redux/actions/common.ts
import { createAction } from "redux-actions";
var updateDp = () => {
};
var updateCloud = createAction(UPDATE_CLOUD);
var updateUi = createAction(UPDATE_UI);
var devInfoChange = (payload) => {
  return {
    type: DEV_INFO_CHANGE,
    payload
  };
};
var responseUpdateDp = (payload) => {
  return {
    type: RESPONSE_UPDATE_DP,
    payload
  };
};
var actions = {
  devInfoChange,
  responseUpdateDp,
  updateDp,
  updateUi,
  updateCloud
};

// src/redux/store.ts
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

// src/redux/reducers/common.ts
import { handleActions } from "redux-actions";
var dpState = (state = {}, action) => {
  switch (action.type) {
    case DEV_INFO_CHANGE: {
      return {
        ...state,
        ...action.payload.state
      };
    }
    case RESPONSE_UPDATE_DP: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
var uiState = handleActions(
  {
    [actions.updateUi.toString()]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  {
    colorIndex: -1,
    whiteIndex: -1,
    currentTab: "colour"
  }
);
var cloudState = handleActions(
  {
    [actions.updateCloud.toString()]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  {
    collectColors: [
      { hue: 0, saturation: 1e3, value: 1e3 },
      { hue: 120, saturation: 1e3, value: 1e3 },
      { hue: 240, saturation: 1e3, value: 1e3 }
    ],
    collectWhites: [
      { temperature: 0, brightness: 1e3 },
      { temperature: 500, brightness: 1e3 },
      { temperature: 1e3, brightness: 1e3 }
    ]
  }
);
var reducers = {
  dpState,
  uiState,
  cloudState
};

// src/redux/store.ts
var createDpKitMiddleware = () => {
};
var reducers2 = {
  ...reducers
};
var rootReducers = combineReducers(reducers2);
var isDebuggingInChrome = true;
var logger = createLogger({
  predicate: () => true,
  collapsed: true,
  duration: true
});
var dpKitMiddleware = createDpKitMiddleware({
  putDeviceData: (data) => {
    return dp_default.putDpDataOrigin(data);
  },
  rawDpMap: dp_default.dpMaps,
  sendDpOption: {}
});
var middleware = isDebuggingInChrome ? [thunk, logger, dpKitMiddleware] : [thunk, dpKitMiddleware];
function configureStore(initialState) {
  const appliedMiddleware = applyMiddleware(...middleware);
  const store2 = createStore(rootReducers, initialState, compose(appliedMiddleware));
  return store2;
}
var store = configureStore();

// src/redux/index.ts
var actions2 = {
  common: actions
};
function useSelector(selector, equalityFn) {
  return useSelectorBase(selector, equalityFn || shallowEqual);
}

// src/utils/dp/putDpData.ts
var getDpIdByCode = (dpCode) => {
};
var putDpDataOrigin = (dps) => {
};

// src/utils/dp/dpMaps.ts
var { colourCode, controlCode } = dpCodes_default;
var dpMaps_default = {
  [colourCode]: [
    {
      name: "hue",
      bytes: 2,
      default: 0
    },
    {
      name: "saturation",
      bytes: 2,
      default: 1e3
    },
    {
      name: "value",
      bytes: 2,
      default: 1e3
    }
  ],
  [controlCode]: 1
};

// src/utils/dp/index.ts
var putDpData = (dps, options, onSuccess) => {
  const { dispatch } = store;
  dispatch(
    actions.updateDp(dps, {
      // immediate: !!SupportUtils.isGroupDevice(),
      immediate: true,
      ...options,
      onResponseMatched(res) {
        onSuccess && onSuccess(res);
      }
    })
  );
};
var dp_default = {
  putDpData,
  putDpDataOrigin,
  dpCodes: dpCodes_default,
  dpMaps: dpMaps_default,
  getDpIdByCode
};

export {
  dpCodes_default,
  dp_default,
  store,
  actions2 as actions,
  useSelector
};
