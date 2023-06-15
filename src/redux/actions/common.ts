import { DEV_INFO_CHANGE, RESPONSE_UPDATE_DP, UPDATE_CLOUD, UPDATE_UI } from '@/constant';
import { createAction } from 'redux-actions';

const updateDp = () => {};
const updateCloud = createAction(UPDATE_CLOUD);
const updateUi = createAction(UPDATE_UI);

type UpdatePayload = Record<string, any>;

const devInfoChange = (payload: UpdatePayload) => {
  return {
    type: DEV_INFO_CHANGE,
    payload,
  };
};

const responseUpdateDp = (payload: UpdatePayload) => {
  return {
    type: RESPONSE_UPDATE_DP,
    payload,
  };
};

export const actions = {
  devInfoChange,
  responseUpdateDp,
  updateDp,
  updateUi,
  updateCloud,
};
