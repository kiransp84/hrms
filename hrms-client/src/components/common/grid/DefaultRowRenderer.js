import React from "react";
import { ReactHeight } from 'react-height';
import { PropTypes } from 'prop-types'
/**
 * class responsible for rendering rows
 */
export default class DefaultRowRendererComponent extends React.PureComponent {

  constructor(props) {    
    super(props);
    this.state = { measured: false }
    this.fixedRowHeight=0;
  }


 static getDerivedStateFromProps(nextProps, prevState){
    
    if(prevState.rowClicked===true){
      return {...prevState,'rowClicked':false}
    }else{
      return {...prevState,isSelectedRow:nextProps.isSelectedRow}
    }
  }

  //Function called on row height change. Triggered from <ReactHeight> component
  onRowHeightChange = (height) => {
    if(height){
      console.log(`onRowHeightChange state trigger for row ${this.props.index} with new height `,height );
      this.props.onRowHeightChange({ index: this.props.index, height })
      /*if( height !== this.state.measuredHeight ) {

      }*/
      if( !this.props.expandableRows) {
        this.setState(() => ({
          measured: true
        }))
      }
    }

  }

  /**
  * Get the element height of the row. Row could be a fragment with multiple children
  * or it can be a single Child containing multiple children. Calculate height 
  * accordingly
  */
  /**
  * Get the element height of the row. Row could be a fragment with multiple children
  * or it can be a single Child containing multiple children. Calculate height 
  * accordingly
  */
  getElementHeight = (element) => {
   // console.log(`Inside getElementHeight for row ${this.props.index}`);

    let newHeight = 0;
    if (element) {
      // previously there was a height cache check I removed this check let is calculate the element height and return the new height only if there is a change in height 
      // if( this.fixedRowHeight==0 || this.props.expandableRows ){
        if (element.children.length === 1) {
          let elementToMeasure = this.props.expandableRows === true ? element.children[0] : element;        
          let marginTop = elementToMeasure.style.marginTop;		
          let marginBottom = elementToMeasure.style.marginBottom;		
          if (!marginTop && !marginBottom) {		
            const computedStyles = window.getComputedStyle(elementToMeasure);		
            marginTop = computedStyles.marginTop;		
            marginBottom = computedStyles.marginBottom;		
          }		
          newHeight= (elementToMeasure.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom))          
        }

        if( newHeight !== this.fixedRowHeight && Math.abs(newHeight-this.fixedRowHeight)>2 ) {
         // console.log(`Found height changed for row ${this.props.index} with new height `,newHeight );
          this.fixedRowHeight = newHeight 
        }

        //console.log('calculating getElement Height for ',this.props.index,': ',this.fixedRowHeight)
      }
      
      return this.fixedRowHeight
      //}
    return 0;
  }

  rowClick = event => {

   if( this.props.shouldSelectRow(event)){
    let keyValue=this.props.keyForRowSelection?(this.props.rowData[this.props.keyForRowSelection]?this.props.rowData[this.props.keyForRowSelection]:this.props.index):this.props.index;
    let selectedIndexes= this.props.getSelectedRows();
    const isSelected=selectedIndexes.indexOf(keyValue)>-1?true:false;
      if(!isSelected){       
        this.setState(() => ({
          rowClicked: true,
          isSelectedRow:true
        }))
      }else{
        this.setState(() => ({
          isSelectedRow: false,
          rowClicked: true,
        }))
      }
    }
    if (this.props.onRowClick) {
      this.props.onRowClick({ event, index: this.props.index, rowData: this.props.rowData });
    }

  }

  render() {

    const { _key, className, columns, style } = this.props

    const rowProps = {};
    rowProps["aria-label"] = "row";
    rowProps.tabIndex = 0;

    const computedStyle = this.state.measured ? style : {}

    return (
      <ReactHeight
        key={_key}
        className={this.state.isSelectedRow?`${className} ReactVirtualized__Table__row__selected`:className}
        {...rowProps}
        role="row"
        style={{ ...computedStyle, outline: "none" ,height:'auto' }}
        onHeightReady={this.onRowHeightChange}
        getElementHeight={this.getElementHeight} onClick={this.rowClick} >
        <div style={{display:'flex',flexGrow:1}}>
          {columns}
        </div>
      </ReactHeight>
    );
  }
}

DefaultRowRendererComponent.propTypes = {
  _index: PropTypes.number,
  onRowHeightChange: PropTypes.func,
  onRowClick: PropTypes.func,
  rowData: PropTypes.object,
  _key: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.object,
  rowClassName: PropTypes.string,
  expandableRows:PropTypes.bool
}

DefaultRowRendererComponent.defaultProps = {		
  expandableRows : false    		
}		