import React, { useState } from 'react';

import {
    Alert
} from 'reactstrap';

export const AlertPanel = ({message,onDismiss}) => {
    const [visible, setVisible] = useState(true);
  
    //const onDismiss = () => setVisible(false);
  
    return message ? (
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        {message}
      </Alert>
    ):
    null ;
}
  