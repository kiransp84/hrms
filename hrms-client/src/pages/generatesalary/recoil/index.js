import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

  export const filterPanelState = atom({
      key:'filterState',
      default:{}
  });
 