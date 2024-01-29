import React , {useState} from 'react';
import {
    RecoilRoot
  } from 'recoil';

import DetailsContainer from './components/containers/DetailsContainer';

const GenerateSalary = () => {
    return <RecoilRoot><DetailsContainer /></RecoilRoot>
}
            
export default GenerateSalary;