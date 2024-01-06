import React , {useState,useCallback} from 'react';

import {Container} from "reactstrap";

import SortDirection from './SortDirection';
import SortIndicator from './SortIndicator';
import styles from './SalaryPreview.css';
import { MultiGrid, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { columnMap } from './SalaryPreviewColumnMap';
import { Link } from 'react-router-dom';

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


export default ({salaryData}) => {
    const sortBy = 'salaryMonth';
    const sortDirection = SortDirection.ASC;


    const _sortList = useCallback(
        ({ sortBy, sortDirection }) => {
            const list = salaryData;
            console.log('list _sortList ', list);
            return list
                .sortBy(item => item[sortBy])
                .update(list =>
                    sortDirection === SortDirection.DESC ? list.reverse() : list,
            );
        }
    ); 

    const sortedList = _sortList({ sortBy, sortDirection });
    const rowCount = sortedList.size + 1;
    console.log(' sortedList constructor ', sortedList);
    console.log(' rowCount  constructor ', rowCount);

    const [tableProps,setTableProps] = useState(
        {
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
        }
    );

    const cache = new CellMeasurerCache({
        defaultWidth: 100,
        minWidth: 75,
        fixedHeight: true
    });

    const _getDatum = useCallback(
        (list, index) => {
            const datum = list.get(index % list.size);
            console.log(`  row data for index : ${index} is ${JSON.stringify(datum)} `);
            return datum;
        }
    );

    const _getRowHeight = useCallback(
        ({ index }) => {
            const list = salaryData;
            return _getDatum(list, index).size;
        }
    )   

    const _headerRenderer = useCallback(
        ({ dataKey, sortBy, sortDirection, label }) => {
            return (
                <div>
                    {label}
                    {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
                </div>
            );
        }
    );

    const _noRowsRenderer = useCallback( () => {
        return <div className={styles.noRows}>No rows</div>;
    });

    const _onScrollToRowChangeFn = (tableProps,setTableProps) => (event) => {
        const { rowCount } = tableProps;
        let scrollToIndex = Math.min(
            rowCount - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }

        setTableProps((prevState)=>{
            return {
                ...prevState,
                scrollToIndex
            }
        });
    }

    const _rowClassName = useCallback(
        ({ index }) => {
            if (index < 0) {
                return styles.headerRow;
            } else {
                return index % 2 === 0 ? styles.evenRow : styles.oddRow;
            }
        }
    );

    const _sort = useCallback(
        ({ sortBy, sortDirection }) =>  {
            const sortedList = _sortList({ sortBy, sortDirection });
            this.setState({  });
            setTableProps((prevState)=>{
                return {
                    ...prevState,
                    sortBy, 
                    sortDirection, 
                    sortedList
                }
            } );
        }
    );


    const _cellRenderer = useCallback( (args) => {
        console.log(' args ', args);
        const { columnIndex, key, rowIndex, style, parent } = args;
        const columnProperty = columnMap[columnIndex];
        if (rowIndex === 0) {
            const label = columnProperty.label;
            return (
                <CellMeasurer
                    cache={cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div className={styles.Cell} key={key} style={{
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
            const rowData = _getDatum( tableProps.sortedList, rowIndex);
            console.log(' columnIndex ',columnIndex);
            return (
                <CellMeasurer
                    cache={cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div className={styles.Cell} key={key} style={{
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
    );



    const {
        height,
        rowHeight,                
        useDynamicRowHeight,
    } = tableProps;

    const rowGetter = ({ index }) => _getDatum(sortedList, index);



    return (
        <Container className="bg-light border">
            <div className={styles.employeeContainer}>
                <AutoSizer disableHeight>
                    {({ width }) => (
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
                            columnWidth={cache.columnWidth}
                            deferredMeasurementCache={cache}
                            cellRenderer={_cellRenderer}
                        >
                        </MultiGrid>
                    )}
                </AutoSizer>
            </div>
        </Container>
    );
}