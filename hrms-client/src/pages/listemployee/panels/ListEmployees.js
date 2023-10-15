
import React from 'react';
import SortDirection from './SortDirection';
import SortIndicator from './SortIndicator';
import styles from './Table.example.css';
import { Table, AutoSizer, Column } from 'react-virtualized';


//employees
class ListEmployees extends React.PureComponent {
    constructor(props, context) {
        console.log(' Inside constructor ');
        super(props, context);
        const sortBy = 'empid';
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({ sortBy, sortDirection });
        const rowCount = sortedList.size;
        console.log(' sortedList constructor ', sortedList);
        console.log(' rowCount  constructor ', rowCount);

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
        //this._onRowCountChange = this._onRowCountChange.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._rowClassName = this._rowClassName.bind(this);
        this._sort = this._sort.bind(this);

        console.log(' constructor EXIT ');
    }

    _sortList({ sortBy, sortDirection }) {
        const list = this.props.employees;
        console.log('list _sortList ', list);

        return list
            .sortBy(item => item[sortBy])
            .update(list =>
                sortDirection === SortDirection.DESC ? list.reverse() : list,
        );
    }

    _getRowHeight({ index }) {
        const list = this.props.employees;

        return this._getDatum(list, index).size;
    }

    _getDatum(list, index) {
        const datum = list.get(index % list.size);
        console.log(`  row data for index : ${index} is ${JSON.stringify(datum)} `);
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

    render() {
        const {
            disableHeader,
            headerHeight,
            height,
            hideIndexRow,
            overscanRowCount,
            rowHeight,
            rowCount,
            scrollToIndex,
            sortBy,
            sortDirection,
            sortedList,
            useDynamicRowHeight,
        } = this.state;

        const rowGetter = ({ index }) => this._getDatum(sortedList, index);

        return (
            <div className={styles.employeeContainer}>
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <Table
                            ref="Table"
                            disableHeader={disableHeader}
                            headerClassName={styles.headerColumn}
                            headerHeight={headerHeight}
                            height={height}
                            noRowsRenderer={this._noRowsRenderer}
                            overscanRowCount={overscanRowCount}
                            rowClassName={this._rowClassName}
                            rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                            rowGetter={rowGetter}
                            rowCount={rowCount}
                            scrollToIndex={scrollToIndex}
                            sort={this._sort}
                            sortBy={sortBy}
                            sortDirection={sortDirection}
                            width={width}>
                            {!hideIndexRow && (
                                <Column
                                    label="Index"
                                    cellDataGetter={({ rowData }) => rowData.index}
                                    dataKey="empid"
                                    disableSort={!this._isSortEnabled()}
                                    width={60}
                                />
                            )}
                            <Column
                                dataKey="employeeCode"
                                label="Employee Id"
                                disableSort={!this._isSortEnabled()}
                                headerRenderer={this._headerRenderer}
                                width={90}
                            />
                            <Column
                                dataKey="employeeName"
                                label="Employee Name"
                                disableSort={!this._isSortEnabled()}
                                headerRenderer={this._headerRenderer}
                                width={90}
                            />
                            <Column
                                width={120}
                                label="Name of father / husband"
                                dataKey="guardian"
                                headerRenderer={this._headerRenderer}
                            />
                            <Column
                                width={90}
                                label="Gender"
                                dataKey="gender"
                                headerRenderer={this._headerRenderer}
                            />
                            <Column
                                width={200}
                                label="Date of Birth"
                                dataKey="dateOfBirth"
                                className={styles.exampleColumn}
                                headerRenderer={this._headerRenderer}
                                cellRenderer={({ cellData }) => {
                                    console.log('cellData', cellData);
                                    return cellData.toLocaleString();
                                }}
                            />
                            <Column
                                width={90}
                                label="Designation"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />
                            <Column
                                width={90}
                                label="Date of joining"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Status"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Mobile Number"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="UAN (EPF)"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="EPF No"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="ESI Number"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Welfare Fund Number"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="EPF"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Nominee	Relation"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />


                            <Column
                                width={90}
                                label="ESI Nominee	Relation"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />


                            <Column
                                width={90}
                                label="GPAIP Nominee"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />


                            <Column
                                width={90}
                                label="Relation"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Gratuity Nominee"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Relation"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Last Working Date"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Date of Releaving"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />

                            <Column
                                width={90}
                                label="Remarks"
                                dataKey="designation"
                                headerRenderer={this._headerRenderer}
                            />


                        </Table>
                    )}
                </AutoSizer>
            </div>

        );
    }


}

export default ListEmployees;