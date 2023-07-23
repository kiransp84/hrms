import React from 'react';
import { Column } from 'react-virtualized'

export class HColumn extends React.PureComponent {
  render() {
    return (
      <Column {...this.props} />
    );
  }
}

