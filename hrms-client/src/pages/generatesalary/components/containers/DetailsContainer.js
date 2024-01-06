import React from 'react';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

import DetailsPanel from '../panels/DetailsPanel';

export default () => {
    return (
        <RecoilRoot>
        <DetailsPanel  />
        </RecoilRoot>
    )
}