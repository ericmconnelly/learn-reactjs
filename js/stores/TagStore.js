'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import events, { EventEmitter } from 'events';
import assign from 'object-assign';
import TagConstant from '../constants/TagConstants';

var _tags = [];

var _tagPage = {
    currentPage: 0,
    totalPage: 0,
    pageSize: 10,
    count: 0
};

var _tagTable = {
    sort: {column: "version", order: "desc"},
    columns: {
        cur_version: {name: "版本", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_READONLY},
        type: {name: "类型", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_TEXT},
        tag_name: {name: "标签名称", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_TEXT},
        category_one: {name: "一级菜单", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_TEXT},
        category_two: {name: "二级菜单", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_TEXT},
        category_three: {name: "三级菜单", filterText: "", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_TEXT},
        create_time: {name: "创建时间", filterText: "excluded", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_READONLY_TIME},
        modify_time: {name: "修改时间", filterText: "excluded", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_READONLY_TIME},
        del_state: {name: "状态", filterText: "excluded", defaultSortOrder: "desc", type: TagConstant.COLUMN_TYPE_STATE_DROPDOWN}
    },
    stateDropdownOptions : [
        {value: 0, display: '存在', className: 'success'},
        {value: 1, display: '删除', className: 'danger'}
    ]
};

function _addTags(tags) {
    tags.forEach(function(tag) {
        _tags.push(tag);
    });
}

function _setTags(tags) {
    _tags = tags;
}

function _setTagPage(tagPage) {
    _tagPage = tagPage
}


var TagStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    emitChangeTable: function() {
        this.emit('changeTable');
    },

    emitChangeFilter: function() {
        this.emit('changeFilter');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    addChangeTableListener: function(callback) {
        this.on('changeTable', callback);
    },

    addChangeFilterListener: function(callback) {
        this.on('changeFilter', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    removeChangeTableListener: function(callback) {
        this.removeListener('changeTable', callback);
    },

    removeChangeFilterListener: function(callback) {
        this.removeListener('changeFilter', callback);
    },

    getAllTags: function() {
        return _tags;
    },

    getTagTable: function() {
        return _tagTable;
    },

    getTagPage: function() {
        return _tagPage;
    }
});

AppDispatcher.register(function(action){
    switch (action.actionType){
        case TagConstant.TAG_CREATE:
            _addTags([action.tag]);
            //_tags.push(action.tag);
            TagStore.emitChange();
            break;

        case TagConstant.TAGS_RECEIVE:
            _addTags(action.data.items);
            _setTagPage(action.data.page);
            TagStore.emitChange();
            break;

        case TagConstant.TAGS_RELOAD:
            _setTags(action.data.items);
            _setTagPage(action.data.page);
            TagStore.emitChange();
            break;

        case TagConstant.TAG_SORT:
            _tagTable.sort = action.sort;
            TagStore.emitChangeTable();
            break;

        case TagConstant.TAG_FILTER:
            _tagTable.columns = action.columns;
            TagStore.emitChangeFilter();
            break;

        default :
    }
});

export default TagStore;