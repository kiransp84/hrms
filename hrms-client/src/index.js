import {render} from 'react-dom';
import React from 'react';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!./resources/styles/base.css';
import '!style-loader!css-loader!./resources/styles/common.css';

import App from "./App";

export default render( <App/> , document.querySelector("#container") );