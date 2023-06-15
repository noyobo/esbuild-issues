// dp处理工具
/* eslint-disable no-console */

export const supportDp = (code: string) => {};

export const getDpIdByCode = (dpCode: string) => {};
export const getDPCodeById = (dpId: string) => {};
export const onDpDataChange = (cb: (res: any) => void) => {
  if (!ty.device) {
    return;
  }
  ty.device.onDpDataChange(rest => {
    cb(rest);
  });
};

// dp下发原始方法
export const putDpDataOrigin = (dps: { [dp: string]: any }) => {};

export default putDpDataOrigin;
