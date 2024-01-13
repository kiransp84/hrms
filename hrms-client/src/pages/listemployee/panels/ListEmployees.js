
import React from 'react';
import SortDirection from './SortDirection';
import SortIndicator from './SortIndicator';
import styles from './Table.example.css';
import { MultiGrid, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { columnMap } from './ListEmployeesColumnMap';
import { Link } from 'react-router-dom';
import {Container} from "reactstrap";

const STYLE = {
    border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
    borderRight: '2px solid #aaa',
    backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID = {
    borderBottom: '2px solid #aaa',
    borderRight: '2px solid #aaa',
    fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
    borderBottom: '2px solid #aaa',
    fontWeight: 'bold',
};


//employees
class ListEmployees extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
		const sortBy = 'companyCode'; 
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({ sortBy, sortDirection });
        const rowCount = sortedList.size + 1;

        this.state = {
            disableHeader: false,
            headerHeight: 50,
            height: 270,
            hideIndexRow: true, // changed to true for now 
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: rowCount,
            scrollToIndex: undefined,
            sortBy,
            sortDirection,
            sortedList,
            useDynamicRowHeight: false,
        };

        this._getRowHeight = this._getRowHeight.bind(this);
        this._headerRenderer = this._headerRenderer.bind(this);
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._rowClassName = this._rowClassName.bind(this);
        this._sort = this._sort.bind(this);

        this.cache = new CellMeasurerCache({
            defaultWidth: 100,
            minWidth: 75,
            fixedHeight: true
        });
    }

    _sortList({ sortBy, sortDirection }) {
        const list = this.props.employees;
        return list
            .sortBy(item => item[sortBy])
            .update(list =>
                sortDirection === SortDirection.DESC ? list.reverse() : list,
        );
		
		return list;
    }

    _getRowHeight({ index }) {
        const list = this.props.employees;

        return this._getDatum(list, index).size;
    }

    _getDatum(list, index) {
		const datum = list.get(index-1);
        return datum;
    }

    _headerRenderer({ dataKey, sortBy, sortDirection, label }) {
        return (
            <div>
                {label}
                {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
            </div>
        );
    }

    _isSortEnabled() {
        const list = this.props.employees;
        const { rowCount } = this.state;

        return rowCount <= list.size;
    }

    _noRowsRenderer() {
        return <div className={styles.noRows}>No rows</div>;
    }

    _onScrollToRowChange(event) {
        const { rowCount } = this.state;
        let scrollToIndex = Math.min(
            rowCount - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }

        this.setState({ scrollToIndex });
    }

    _rowClassName({ index }) {
        if (index < 0) {
            return styles.headerRow;
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow;
        }
    }

    _sort({ sortBy, sortDirection }) {
        const sortedList = this._sortList({ sortBy, sortDirection });

        this.setState({ sortBy, sortDirection, sortedList });
    }

    _cellRenderer = (args) => {
        const { columnIndex, key, rowIndex, style, parent } = args;
        const columnProperty = columnMap[columnIndex];
        if (rowIndex === 0) {
            const label = columnProperty.label;
			
			

            return (
                <CellMeasurer
                    cache={this.cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div className={styles.Cell}  key={key} style={{
                        ...style,
                        height: 35,
                        whiteSpace: 'nowrap',
                        padding: '2px'
                    }}>
                        {label}
                    </div>
                </CellMeasurer>
            );
        } else {
            const dataKey = columnProperty.dataKey;
            const rowData = this._getDatum(this.state.sortedList, rowIndex);
            return (
                <CellMeasurer
                    cache={this.cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div className={this._rowClassName({index:rowIndex})} key={key} style={{
                        ...style,
                        height: 35,
                        whiteSpace: 'nowrap',
                        padding: '2px'
                    }}>
                        {
                            ( columnIndex !== 0 ) ? 
                            rowData[dataKey] :
                            (
                            <Link to="/employee/modify" state={{id:rowData['_id']}}>
                                {rowData[dataKey]}
                            </Link>
                            )
                        }                        
                    </div>
                </CellMeasurer>

            );
        }

    }

    render() {
        const {
            height,
            rowHeight,
            rowCount,
            sortedList,
            useDynamicRowHeight,
        } = this.state;

        const rowGetter = ({ index }) => this._getDatum(sortedList, index);

        return (
			<Container fluid>
            <div className={styles.employeeContainer}>
                <AutoSizer>
                    {({ height,width }) => (
                        <MultiGrid
                            fixedColumnCount={1}
                            fixedRowCount={1}
                            scrollToColumn={0}
                            scrollToRow={0}
                            columnCount={columnMap.length}
                            enableFixedColumnScroll
                            height={height}
                            rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                            rowCount={rowCount}
                            style={STYLE}
                            styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                            styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                            styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                            width={width}
                            hideBottomLeftGridScrollbar
                            rowGetter={rowGetter}
                            columnWidth={this.cache.columnWidth}
                            deferredMeasurementCache={this.cache}
                            cellRenderer={this._cellRenderer}
                        >
                        </MultiGrid>
                    )}
                </AutoSizer>
            </div>
			</Container>

        );
    }


}

export default ListEmployees;