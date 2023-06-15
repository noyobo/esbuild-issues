import React from 'react';
import dpCodes from '@/config/dpCodes';
import { dpUtils } from '@/utils';
import { actions, store, useSelector } from '@/redux';

const { powerCode, workModeCode } = dpCodes;
const { dispatch } = store;

export function Home() {
  console.log(dpUtils, useSelector, store, actions, dispatch);
}

export default Home;
