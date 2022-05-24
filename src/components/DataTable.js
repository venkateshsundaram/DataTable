import React, { useState } from 'react'
import Draggable from 'react-draggable';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { CaretDownIcon } from "../commons/components";

import styled from 'styled-components';

const DataTable = (props) => {
    const { rows, rowHeight, headerHeight, tableHeight, onSelectionChange, onRowClick } = props;
    const columns = [{ type: "multi-select", id: "multi-select", width: 40 }].concat(props.columns);
    const [selectAllRows, updateSelectAllRows] = useState(false);
    const [selectedRows, updateSelectedRows] = useState([]);

    const getTableWidthMap = (headers) => {
        let width_map = {};
        for (var i = 0; i < headers.length; i++) {
            let colLength = headers.length;
            let colWidth = 1 / colLength;
            width_map[headers[i].id] = colWidth;
        }

        return width_map;
    }
    const [widthMap, updateWidthMap] = useState(getTableWidthMap(columns))

    const resizeRow = ({ dataKey, deltaX }, params) => {
        const delta = deltaX / params.width;
        const nextDataKeyIndex = Object.keys(widthMap).indexOf(dataKey) + 1; // this is to resize the selected column alone
        const nextDataKey = Object.keys(widthMap)[nextDataKeyIndex];

        updateWidthMap({
            ...widthMap,
            [dataKey]: widthMap[dataKey] + delta,
            [nextDataKey]: widthMap[nextDataKey] - delta

        });
    };

    const handleSelectRows = (rowIndex) => {
        const newSelectedRows = selectedRows.includes(rowIndex) ? selectedRows.filter(index => index !== rowIndex) : selectedRows.concat(rowIndex);
        updateSelectedRows(newSelectedRows);
        onSelectionChange(newSelectedRows);
    }


    const cellRenderer = (cellData, item) => {
        const isMultiSelect = item.type === "multi-select";

        if (isMultiSelect) {
            return <input type="checkbox" checked={selectedRows.includes(cellData.rowIndex)} onChange={() => handleSelectRows(cellData.rowIndex)} />
        }
        return <StyledRowContainer
            isPositionRight={item.numeric}
            isPositionLeft={isMultiSelect}
            className='rowTruncatedText'>
            {item.id === "product" && <img alt='' width="40" height="40" src={cellData.rowData.thumbnailUrl} />}
            <span className='title'>{item.id === "product" ? cellData.rowData.title : cellData.cellData}</span>
        </StyledRowContainer>;
    };

    const handleSelectAllRows = () => {
        const value = !selectAllRows;
        updateSelectAllRows(value);
        updateSelectedRows(value ? rows.map((obj, index) => index) : [])
        onSelectionChange(value ? "All" : []);
    }

    const headerRenderer = (cellData, item, params) => {
        const { dataKey, label } = cellData
        const title = label;
        const isMultiSelect = item.type === "multi-select";

        if (isMultiSelect) {
            return (
                <SelectionBoxWrapper>
                    <input type="checkbox" checked={selectAllRows} onChange={handleSelectAllRows} />
                    <StyledIcon><CaretDownIcon fill="gray" /></StyledIcon>
                </SelectionBoxWrapper>
            )
        }

        return (
            <StyledHeaderWrapper
                isPositionRight={item.numeric}
                isPositionLeft={isMultiSelect} key={dataKey}>
                <div className="headerTruncatedText" title={title}>
                    {title}
                </div>
                <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                        resizeRow({
                            dataKey,
                            deltaX,
                        }, params)
                    }
                    position={{ x: 0 }}
                    zIndex={999}
                >
                    {label ? <span className="drag-handle-icon">⋮</span> : <></>}
                </Draggable>
            </StyledHeaderWrapper>
        );
    };

    return (
        <StyledDataTable>
            <AutoSizer disableHeight>
                {({ width }) => (
                    <Table
                        headerHeight={headerHeight}
                        rowHeight={rowHeight}
                        overscanRowCount={10}
                        rowGetter={({ index }) => rows[index]}
                        rowCount={rows.length}
                        width={width}
                        onRowClick={params => onRowClick(params.rowData, params.index)}
                        height={tableHeight}
                    >
                        {columns.map((item, idx) => {
                            return (
                                <Column
                                    key={idx}
                                    headerRenderer={cellData => headerRenderer(cellData, item, { width })}
                                    dataKey={item.id}
                                    label={item.label}
                                    cellRenderer={cellData => cellRenderer(cellData, item)}
                                    width={item.width || widthMap[item.id] * width}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        </StyledDataTable>

    )
}

const StyledDataTable = styled.div`
.headerTruncatedText, .rowTruncatedText {
    width: 100%;
    padding-right: 10px;
  }

  input[type="checkbox"] {
    cursor: pointer;
}
`;

const StyledIcon = styled.div`
    padding-top: 2px;
`;

const getPosition = (props) => {
    if (props.isPositionLeft) {
        return 'left';
    } else if (props.isPositionRight) {
        return 'right';
    }
    return 'center';
}

const StyledHeaderWrapper = styled.div`
 text-align: ${props => getPosition(props)};
 position: relative;
 display:flex;
 width: 100%;
`;

DataTable.defaultProps = {
    headerHeight: 15,
    rowHeight: 50,
    tableHeight: 800
}

const StyledRowContainer = styled.div`
    display: flex;
    text-align: ${props => getPosition(props)};
    position: relative;

    .title {
        padding-left: 6px;
        padding-top: 10px;
        padding-right: 10px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

const SelectionBoxWrapper = styled.div`
    display: flex;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 3px;
`;

export default DataTable;