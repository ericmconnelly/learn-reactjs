'use strict';

import _ from 'lodash';

var _filters = {};

export default {

    /**
     * 注册过滤器
     */
    registerFilters: function (columns) {
        var columnNames = Object.keys(columns);
        columnNames.forEach(function (column) {
            var filterText = columns[column].filterText;
            _filters[column] = null;
            if (filterText.length > 0 && filterText != "excluded") {
                _filters[column] = function (x) {
                    if (!x) {
                        return false;
                    }
                    return (x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                };
            }
        }, this);
    },

    /**
     * 执行过滤器
     * @returns {*}
     */
    doFilter: function (columns, tags) {
        var columnNames = Object.keys(columns);
        var filteredItems = _.filter(tags, function (item) {
            return _.every(columnNames, function (c) {
                return (!_filters[c] || _filters[c](item[c]));
            }, this);
        }, this);

        return filteredItems;
    },

    /**
     * 查找所有匹配
     * @returns {*}
     */
    doAllFilter: function (searchText, tags) {
        var filteredItems = _.filter(tags, function (item) {
            if(!searchText){
                return true;
            }
            var result = false;
            Object.keys(_filters).forEach(function (c) {
                if (item[c] && (item[c].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1)) {
                    result = true;
                }
            });
            return result;
        }, this);

        return filteredItems;
    }
};