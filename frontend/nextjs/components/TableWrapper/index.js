/* eslint-disable react/jsx-fragments */
/* eslint-disable react/destructuring-assignment */

import React, { Component, } from 'react';
import { Table, Input, Button, Icon, } from 'antd';
import Highlighter from 'react-highlight-words';
import _ from 'lodash';


class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            columns: [],
            dataSource: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqualWith(prevProps.dataSource, this.props.dataSource, _.isEqual)) {
            this.updateState();
        }
    }

    componentDidMount() {
        this.updateState();
    }

    updateState = () => {
        const { columns = [], dataSource = [] } = this.props;
        this.setState({
            columns: columns.map((item, index) => {
                const { searchable = false, dataIndex } = item;
                if (searchable) {
                    return {
                        ...this.getColumnSearchProps(dataIndex),
                        ...item,
                    }
                }
                return item;
            }),
            dataSource: dataSource.map((item, index) => ({ key: index, ...item }))
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
          </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
          </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return (<Table {...this.props} dataSource={this.state.dataSource} columns={this.state.columns} />);
    }
}

export default TableWrapper;