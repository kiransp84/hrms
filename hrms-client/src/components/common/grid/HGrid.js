import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import createFragment from 'react-addons-create-fragment';
import classnames from 'classnames'
import { Table, AutoSizer, Column } from 'react-virtualized';
import clsx from 'clsx';

import DefaultRowRenderer from './DefaultRowRenderer'
import DefaultHeaderRowRenderer from './DefaultHeaderRowRenderer'
import { HeadCell } from './Head'
import { RowCell } from './Row'
import {
  ContentBox
} from './ContentBox';
import styles from './Grid.example.css';
import '!style-loader!css-loader!react-virtualized/styles.css';

export default class GridExample extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    console.log('inside HGrid construct');

    const { data, rowHeight, name, form, onSubmit, sortEnabled, rowCount, enableDragDrop, registerChild, rowClassName, formKey, destroyFormOnUnmount,
      resetSelectionOnDataChange, ...restProps } = props;

    //Data to be shown in ITable
    let listData = data ? props.result && props.searchText ? props.data.filter(
      (data) => props.result.indexOf(data.id) > -1
    ) : data : [];

    this.state = {
      columnCount: 3, // To-Do can be removed after changing to Table 
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: listData.length,
      scrollToColumn: undefined,
      scrollToRow: undefined,
      useDynamicRowHeight: false,
      list: listData,
    };

    console.log(' this.state.list gives ', this.state.list);




    this.rowclassName = rowClassName;
    this._cellRenderer = this._cellRenderer.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
    this._getRowClassName = this._getRowClassName.bind(this);
    this._getRowHeight = this._getRowHeight.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
    this._onColumnCountChange = this._onColumnCountChange.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToColumnChange = this._onScrollToColumnChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
  }

  render() {
    console.log('inside HGrid render method ');
    const {
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToColumn,
      scrollToRow,
      useDynamicRowHeight,
    } = this.state;

    // reading the columns
    //<Columns>  
    const columns = this.props.children;
    this.tableColumnsObj = this.getColumnProperties(columns)
    this.columns = this.updateColumns(this.props.hiddenDataIds, this.props.restrictedDataIds)
    console.log('inside HGrid render this.columns.length  ', this.columns.length);

    //decide the type of renderer
    if (this.rowRenderer === null || this.state.renderSubRow) {
      console.log('inside HGrid decide the type of renderer  ');
      this.rowRenderer = this.tableColumnsObj.customRow.component ? this.getCustomRowRenderer
        : this.getDefaultRowRenderer
    }

    return (
      <ContentBox>

        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              width={width}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              height={height}
              rowGetter={this.rowGetter}
              cellDataGetter={this.cellDataGetter}
              rowCount={rowCount}
              rowRenderer={this.rowRenderer}
              headerRowRenderer={this.getDefaultHeaderRowRenderer}
              className={styles.BodyGrid}
            >
              {this.columns}
            </Table>
          )}
        </AutoSizer>
      </ContentBox>
    );
  }

  /**
 * function that returns object corresponding to each row from the list
 */
  rowGetter = ({ index }) => {
    console.log(' rowGetter invoked for index ', index);
    console.log(' rowGetter found row data ', this.state.list[index]);
    return this.state.list[index];
  }

  cellDataGetter = ({
    dataKey,
    rowData,
  }) => {
    console.log(' cellDataGetter invoked with dataKey ', dataKey);
    console.log(' with rowData ', rowData);
    if (rowData) {
      if (typeof rowData.get === 'function') {
        console.log(' cellDataGetter found a function ');
        return rowData.get(dataKey);
      } else {
        console.log(' rowData.get is  not a function ');
        return rowData[dataKey];
      }
    } else {
      console.log(' cellDataGetter return null');
      return null;
    }
  }


  //moised method that will be called to recalculate columns , whenever columns are hidden or added
  //through column selector
  updateColumns = (hiddenDataIds, restrictedDataIds) => this.tableColumnsObj && this.tableColumnsObj.columnArray.map((obj, index) => {
    console.log(' Inside updateColumns for column index ', index);
    return hiddenDataIds && hiddenDataIds.indexOf(obj.columnProps.id) > -1 ||
      restrictedDataIds && restrictedDataIds.indexOf(obj.columnProps.id) > -1 ? null
      : <Column key={index} {...obj.columnProps} />
  })

  /**
     * function to resolve row class name
     */
  getRowClassName = (rowData, index) => {
    return typeof this.rowclassName === 'function' ? this.rowclassName({ rowData, index }) : this.rowclassName;
  }

  /**
 * Returns a function responsible for rendering default row (For simple tables without subrows). 
 * and if table is marked as draggable, rendered rows are wrapped inside dragSourceWrapper
 */
  getDefaultRowRenderer = (props) => {
    console.log('inside getDefaultRowRenderer ');
    //const DraggableRow = this.dragSourceWrapper;
    const rowClassName = this.getRowClassName(props.rowData, props.index);
    const className = classnames(props.className, rowClassName);
    const selectedIndexes = this.state.selectedIndexes;
    let keyValue = props.keyForRowSelection ? (props.rowData[props.keyForRowSelection] ? props.rowData[props.keyForRowSelection] : props.index) : props.index;
    const isSelectedRow = selectedIndexes.indexOf(keyValue) >= 0 ? true : false;
    const modifiedProps = { ...props, className, onRowHeightChange: this.onRowHeightChange, expandableRows: this.props.expandableRows, isSelectedRow: isSelectedRow, shouldSelectRow: this.shouldSelectRow, getSelectedRows: this.getSelectedRows }
    let row = this.enableDragDrop ? <SortableDefaultRowRendererComponent {...modifiedProps} /> : <DefaultRowRenderer {...modifiedProps} />
    if (this.props.isDragSource && DraggableRow) {
      return <DraggableRow item={props.rowData} handleBeginDrag={this.props.handleBeginDrag} handleEndDrag={this.props.handleEndDrag}>{row}</DraggableRow>
    } else return row
  }

  getDefaultHeaderRowRenderer = (props) => {
    return <DefaultHeaderRowRenderer {...props} onHeaderRowHeightChange={this.onHeaderRowHeightChange} />
  }

  onHeaderRowHeightChange = ({ height }) => {
    this.headerRowHeight = height;
    this.forceUpdate();
  }

  getColumnProperties = (columns) => {
    //HColumn 
    const columnArray = React.Children.map(columns.props.children, (column, index) => {
      console.log(' Inside HColumn at index ', index);
      if (column instanceof Object) {
        console.log(' Inside HColumn is an object ');
        const { children: cell, ...rest } = column.props;
        const cellChildren = React.Children.toArray(cell.props.children);
        let headCell, rowCell;
        let headerCellObjectProps = {}
        for (let i = 0; i < cellChildren.length; i++) {
          const childType = cellChildren[i].type;

          if (childType === HeadCell) {
            console.log(' Inside Headcell  ');
            headCell = cellChildren[i]
          } else if (childType === RowCell) {
            console.log(' Inside RowCell  ');
            rowCell = cellChildren[i]
          }
        }

        if (!this.props.disableHeader && headCell) {
          headerCellObjectProps = { ...headCell.props, headerRenderer: this.headerRendererFn(headCell) }
        }

        if (!rowCell) {
          throw new Error('A row cell must be defined for a Column')
        }

        //moized the cellrender function
        const columnProperties = {
          columnProps: { ...rest, ...headerCellObjectProps, cellRenderer: this.cellRendererFn(rowCell, this.state.additionalData) },
        }
        console.log(' Inside HColumn columnProperties ', columnProperties.columnProps);
        return columnProperties;

      }
    })

    return { columnArray };
  }

  cellRendererFn = (rowCell, additionalData) => ({ cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex }) => {
    //console.log(additionalData)

    const rowKey = this.props.keyForRowSelection ? rowData[this.props.keyForRowSelection] : null;
    //To-Do later 
    /*const customRowDataKey = this.tableColumnsObj.customRow.customRowDataKey;
    if (rowCell.props.rowToggler) {
        return customRowDataKey && rowData[customRowDataKey] && rowData[customRowDataKey].length > 0 ? <RowToggler  keyForRowSelection={this.props.keyForRowSelection} rowkey={rowKey} unsubscribeActiveIndex={this.unsubscribeActiveIndex} subscribeActiveIndex={this.subscribeActiveIndex} rowIndex={rowIndex} toggle={this.state.activeIndex.indexOf(rowIndex) >= 0} /> : ''
    }
    else if (rowCell.props.selectOption) {
        return <RowSelect keyForRowSelection={this.props.keyForRowSelection} rowIndex={rowIndex} rowkey={rowKey}  onRowCheckBoxSelect={this.onRowCheckBoxSelect} unsubscribeSelectedIndexes={this.unsubscribeSelectedIndexes} subscribeSelectedIndexes={this.subscribeSelectedIndexes} id={'select-' + rowIndex} name={this.props.tableId + '-select'} key={this.state.rowCount + rowIndex} className="m-l-5 m-r-5" />
    }
    else {
        const content = rowCell.props.children({ cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex, additionalData })
        return content.props.children;
    }*/
    const content = rowCell.props.children({ cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex, additionalData })
    return content.props.children;
  }

  headerRendererFn = headCell => ({ columnData, dataKey, disableSort, label: labelKey, sortBy, sortDirection }) => {
    //To-Do later 
    /*if (headCell.props.rowToggler) {
        return <RowToggler unsubscribeActiveIndex={this.unsubscribeActiveIndex} subscribeActiveIndex={this.subscribeActiveIndex} rowIndex={-1} allRowsToggler={true} toggle={this.toggleAllRows} />
    }
    else if (headCell.props.selectOption) {
        return <RowSelect rowIndex={-1} onHeaderCheckBoxSelect={this.handleSelectAllChange} unsubscribeSelectedIndexes={this.unsubscribeSelectedIndexes} subscribeSelectedIndexes={this.subscribeSelectedIndexes} className="m-l-5 m-r-5" />
    }
    const sortComponent = !disableSort ? sortBy === dataKey ? <SortIndicator sortDirection={sortDirection} /> : <SortIndicator /> : ''
    */
    const sortComponent = '';

    /**
       * invoke the children as a function and pass properties required for the header cell
       * required to generate the markup for the column
       */
    const label = labelKey;
    const content = headCell.props.children({ columnData, dataKey, disableSort, label, sortBy, sortDirection, sortComponent })
    // console.log('header cell props in rendered',{ columnData, dataKey, disableSort, label, sortBy, sortDirection })
    // console.log('header cell childs',children)
    /**
       * if sort is disabled against head cell. the SortComponent is undefined
       */
    const headChildren = createFragment({
      cellChildren: content.props.children,
      //To-do later 
      //sortComponent,
    })

    return headChildren;
  }




  _cellRenderer({ columnIndex, key, rowIndex, style }) {
    console.log(' columnIndex ', columnIndex);
    console.log(' rowIndex ', rowIndex);
    if (columnIndex === 0) {
      return this._renderLeftSideCell({ columnIndex, key, rowIndex, style });
    } else {
      return this._renderBodyCell({ columnIndex, key, rowIndex, style });
    }
  }

  _getColumnWidth({ index }) {
    switch (index) {
      case 0:
        return 25;
      case 1:
        return 100;
      case 2:
        return 300;
      default:
        return 80;
    }
  }

  _getDatum(index) {
    const { data } = this.props;

    return data[index] ? data[index] : null;
  }

  _getRowClassName(row) {
    return row % 2 === 0 ? styles.evenRow : styles.oddRow;
  }

  _getRowHeight({ index }) {
    return this._getDatum(index).size;
  }

  _noContentRenderer() {
    return <div className={styles.noCells}>No cells</div>;
  }

  _renderBodyCell({ columnIndex, key, rowIndex, style }) {
    const rowClass = this._getRowClassName(rowIndex);
    const datum = this._getDatum(rowIndex);
    console.log(' style ', style);

    let content;

    switch (columnIndex) {
      case 1:
        content = datum.name;
        break;
      case 2:
        content = datum.empid;
        break;
      default:
        content = `r:${rowIndex}, c:${columnIndex}`;
        break;
    }

    const classNames = clsx(rowClass, styles.cell, {
      [styles.centeredCell]: columnIndex > 2,
    });

    return (
      <div className={classNames} key={key} style={style}>
        {content}
      </div>
    );
  }

  _renderLeftSideCell({ key, rowIndex, style }) {
    const datum = this._getDatum(rowIndex);

    const classNames = clsx(styles.cell, styles.letterCell);

    // Don't modify styles.
    // These are frozen by React now (as of 16.0.0).
    // Since Grid caches and re-uses them, they aren't safe to modify.
    style = {
      ...style,
      backgroundColor: datum.color,
    };

    return (
      <div className={classNames} key={key} style={style}>
        {datum.name.charAt(0)}
      </div>
    );
  }

  _updateUseDynamicRowHeights(value) {
    this.setState({
      useDynamicRowHeight: value,
    });
  }

  _onColumnCountChange(event) {
    const columnCount = parseInt(event.target.value, 10) || 0;

    this.setState({ columnCount });
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({ rowCount });
  }

  _onScrollToColumnChange(event) {
    const { columnCount } = this.state;
    let scrollToColumn = Math.min(
      columnCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToColumn)) {
      scrollToColumn = undefined;
    }

    this.setState({ scrollToColumn });
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;
    let scrollToRow = Math.min(rowCount - 1, parseInt(event.target.value, 10));

    if (isNaN(scrollToRow)) {
      scrollToRow = undefined;
    }

    this.setState({ scrollToRow });
  }
}
