'use strict';

import React, { Component } from 'react';
import TextInput from '../common/TextInput.react';
import DropdownList from '../common/DropdownList.react';
import TagStore from '../stores/TagStore';
import TagConstant from '../constants/TagConstants';
import DateFormatUtils from '../utils/DateFormatUtils';
import TagsWebAPIUtils from '../utils/TagsWebAPIUtils';

export default class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            tag: props.tag
        };
    }

    _onEnableEdit() {
        this.setState({isEditing: true});
    }

    _onSubmit() {
        var postData = {
            "imei": "",
            "platform": "android",
            "items": []
        };
        postData.items.push(this.state.tag);
        TagsWebAPIUtils.update(postData, data => {
            var tag = this.state.tag;
            tag.cur_version = data[0].cur_version;
            this.setState({isEditing: false, tag: tag});
        });
    }

    _onSave(propName, value) {
        var tag = this.state.tag;
        if(propName){
            tag[propName] = value;
            tag.modify_time = new Date().getTime();
            tag.modify_time_text = DateFormatUtils.formatCurrentMillis(tag.modify_time);
        }
        this.setState({
            tag: tag
        });
    }

    /**
     * 渲染编辑模式的Tag
     * @returns {XML}
     * @private
     */
    _renderEditableTag() {
        var _onSubmit = this._onSubmit.bind(this);
        var _onSave = this._onSave.bind(this);
        var tag = this.state.tag;
        var columns = TagStore.getTagTable().columns;
        var columnNames = Object.keys(columns);
        var displayColumns = columnNames.map(columnName => {
            var column = columns[columnName];
            switch (column.type) {
                case  TagConstant.COLUMN_TYPE_READONLY_TIME:
                    return (<td key={tag.id + '.' + columnName}> {tag[columnName + '_text']} </td>);
                case  TagConstant.COLUMN_TYPE_TEXT:
                    return (
                        <td key={tag.id + '.' + columnName}>
                            <TextInput className="form-control"
                                       id={columnName} onSubmit={_onSubmit}
                                       onSave={_onSave}
                                       value={tag[columnName]}/>
                        </td>
                    );
                case TagConstant.COLUMN_TYPE_STATE_DROPDOWN:
                    return (
                        <td key={tag.id + '.' + columnName}>
                            <DropdownList id={columnName} onChange={_onSave}
                                          options={TagStore.getTagTable().stateDropdownOptions}
                                          currentValue={tag[columnName]}/>
                        </td>
                    );
                default :
                    return (<td key={tag.id + '.' + columnName}> {tag[columnName]} </td>);
            }
        });

        return (
            <tr>
                {displayColumns}
                <td key={tag.id + '.'}>
                    <button onClick={_onSubmit} className="btn btn-sm btn-success edit">
                        <span>保存</span>
                    </button>
                </td>
            </tr>
        );
    }

    /**
     * 渲染只读模式的Tag
     * @returns {XML}
     * @private
     */
    _renderTag() {
        var _onEnableEdit = this._onEnableEdit.bind(this);
        var tag = this.state.tag;
        var columns = TagStore.getTagTable().columns;
        var columnNames = Object.keys(columns);
        var displayColumns = columnNames.map(columnName => {
            var column = columns[columnName];
            switch (column.type) {
                case  TagConstant.COLUMN_TYPE_READONLY_TIME:
                    return (<td key={tag.id + '.' + columnName}> {tag[columnName + '_text']} </td>);
                case  TagConstant.COLUMN_TYPE_TEXT:
                    return (
                        <td key={tag.id + '.' + columnName} onDoubleClick={_onEnableEdit}>
                            <label>
                                {tag[columnName]}
                            </label>
                        </td>
                    );
                case TagConstant.COLUMN_TYPE_STATE_DROPDOWN:
                    var matched ={};
                    TagStore.getTagTable().stateDropdownOptions.forEach(valueObj => {
                        if (valueObj.value === tag[columnName]) {
                            matched = valueObj;
                        }
                    });
                    return (
                        <td key={tag.id + '.' + columnName}>
                            <span className={"label label-" +matched.className}>{matched.display}</span>
                        </td>
                    );
                default :
                    return (<td key={tag.id + '.' +columnName}> {tag[columnName]} </td>);
            }
        });

        return (
            <tr>
                {displayColumns}
                <td key={tag.id + '.'}>
                    <button onClick={_onEnableEdit} className="btn btn-sm btn-success edit">
                        <span>编辑</span>
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.isEditing) {
            return this._renderEditableTag();
        }
        return this._renderTag();
    }
}