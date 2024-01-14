import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


  export const companyState = atom({
      key:'companyState',
      default:{}
  })