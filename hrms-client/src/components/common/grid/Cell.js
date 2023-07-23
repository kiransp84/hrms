import React from 'react';

export class Cell extends React.PureComponent {
  render() {
    return (
      this.props.children
    );
  }
}
