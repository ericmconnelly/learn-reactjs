'use strict';

import React, { Component } from 'react';
import TagActions  from '../actions/TagActions';
import TagStore from '../stores/TagStore';

export default class TagListHeader extends Component {

    constructor(props) {
        super(props);
        this.state = TagStore.getTagTable();
    }

    /**
     * 排序更新
     * @param column
     * @returns {function(this:TagListHeader)}
     */
    _sortColumn(column) {
        return function () {
            var newSortOrder = (this.state.sort.order == "asc") ? "desc" : "asc";
            if (this.state.sort.column != column) {
                newSortOrder = this.state.columns[column].defaultSortOrder;
            }
            this.setState({sort: {column: column, order: newSortOrder}});
            //通知顺序更新
            TagActions.sort({column: column, order: newSortOrder});
        }.bind(this);
    }

    /**
     * 判断头部排序样式
     * @param column
     * @returns {string}
     */
    _sortClass(column) {
        var ascOrDesc = (this.state.sort.order == "asc") ? "headerSortAsc" : "headerSortDesc";
        return (this.state.sort.column == column) ? ascOrDesc : "";
    }

    /**
     * 头部过滤输入框更新
     * @param column
     * @returns {function(this:TagListHeader)}
     */
    _handleFilterTextChange(column) {
        return function (newValue) {
            var obj = this.state.columns;
            obj[column].filterText = newValue;
            //通知过滤器更新
            TagActions.filter(this.state.columns);
        }.bind(this);
    }

    render() {
        var columnNames = Object.keys(this.state.columns);

        //可排序头部
        var headers = columnNames.map(function (column) {
            return (
                <th key={column} onClick={this._sortColumn(column)} className={"header " + this._sortClass(column)}>
                    {this.state.columns[column].name}
                </th>
            );
        }, this);
        headers.push(<th key=''></th>);

        var filterLink = function (column) {
            return {
                value: this.state.columns[column].filterText,
                requestChange: this._handleFilterTextChange(column)
            };
        }.bind(this);

        var filterInputs = columnNames.map(function (c) {
            if (this.state.columns[c].filterText == "excluded") {
                return <td key={c}><input type="text" disabled="disabled" className="form-control"/></td>;
            }
            return <td key={c}><input type="text" valueLink={filterLink(c)} className="form-control"/></td>;
        }, this);

        return (
            <thead>
                <tr>
                    {headers}
                </tr>
                <tr>
                    {filterInputs}
                </tr>
            </thead>
        );
    }
}