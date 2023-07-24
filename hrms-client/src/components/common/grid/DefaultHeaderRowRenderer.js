import React from "react";
import { ReactHeight } from 'react-height';
import { PropTypes } from 'prop-types'
/**
 * class responsible for rendering rows
 */
export default class DefaultHeaderRowRendererComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { measured: false }
  }


  //Function called on row height change. Triggered from <ReactHeight> component
  onHeaderRowHeightChange = (height) => {
    if(height){
      this.props.onHeaderRowHeightChange({ height })
      this.setState(() => ({
        measured: true
      }))
    }
  }

  /**
  * Get the element height of the row. Row could be a fragment with multiple children
  * or it can be a single Child containing multiple children. Calculate height 
  * accordingly
  */
  getElementHeight = (element) => {
    if (element) {
        let marginTop = element.style.marginTop;
        let marginBottom = element.style.marginBottom;
        if (!marginTop && !marginBottom) {
          const computedStyles = window.getComputedStyle(element);
          marginTop = computedStyles.marginTop;
          marginBottom = computedStyles.marginBottom;
        }
        return (element.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom))
    }
    return 0;
  }



  render() {

    const { className, columns, style } = this.props


    let computedStyle = this.state.measured ? style : {}
    delete computedStyle.height

    return (
      <ReactHeight
        className={className}
        role="row"
        style={{ ...computedStyle,height:'auto' }}
        onHeightReady={this.onHeaderRowHeightChange}
        getElementHeight={this.getElementHeight}  >
        {columns}
      </ReactHeight>
    );
  }
}

DefaultHeaderRowRendererComponent.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.object,
  onHeaderRowHeightChange: PropTypes.func
}
