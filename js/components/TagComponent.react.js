'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import Pagination from '../common/Pagination.react';
import SearchBar from '../common/SearchBar.react';
import Tag from './Tag.react';
import TagList from './TagList.react';
import TagForm from './TagForm.react';
import TagActions  from '../actions/TagActions';
import TagStore from '../stores/TagStore';
import TagsWebAPIUtils from '../utils/TagsWebAPIUtils';
import ColumnFilterUtils from '../utils/ColumnFilterUtils';

export default class TagComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: TagStore.getAllTags(),
            pageSize: 50,
            page: TagStore.getTagPage()
        };
    }

    _onChange() {
        this.setState({
            tags: TagStore.getAllTags(),
            page: TagStore.getTagPage()
        });
    }

    _onChangeOrder() {
        var sortedItems = _.sortBy(this.state.tags, TagStore.getTagTable().sort.column);
        if (TagStore.getTagTable().sort.order === "desc") {
            sortedItems.reverse();
        }
        this.setState({tags: sortedItems});
    }

    _onSearch(text) {
        ColumnFilterUtils.registerFilters(TagStore.getTagTable().columns);
        var filteredItems = ColumnFilterUtils.doAllFilter(text, TagStore.getAllTags());
        this.setState({tags: filteredItems});
    }


    _onChangeFilter() {
        ColumnFilterUtils.registerFilters(TagStore.getTagTable().columns);
        var filteredItems = ColumnFilterUtils.doFilter(TagStore.getTagTable().columns, TagStore.getAllTags());

        var sortedItems = _.sortBy(filteredItems, TagStore.getTagTable().sort.column);
        if (TagStore.getTagTable().sort.order === "desc") {
            sortedItems.reverse();
        }
        this.setState({tags: sortedItems});
    }

    _onChangePage(page) {
        TagsWebAPIUtils.load(page - 1, this.state.pageSize, data => {
            data.page = {
                currentPage: page - 1,
                pageSize: this.state.pageSize,
                totalPage: data.total_page,
                count: data.count
            };
            TagActions.reload(data);
        });
    }

    /**
     * 组件加载: componentWillMount
     * componentWillMount会在组件render之前执行，并且永远都只执行一次
     */
    componentWillMount() {
        TagsWebAPIUtils.load(0, this.state.pageSize, data => {
            data.page = {
                currentPage: 0,
                pageSize: this.state.pageSize,
                totalPage: data.total_page,
                count: data.count
            };
            TagActions.receive(data);
        });
    }

    /**
     * 组件加载: componentDidMount
     * 这个方法会在组件加载完毕之后立即执行。在这个时候之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问
     * 如果你想和其他JavaScript框架一起使用，可以在这个方法中执行setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
     */
    componentDidMount() {
        TagStore.addChangeListener(this._onChange.bind(this));
        TagStore.addChangeTableListener(this._onChangeOrder.bind(this));
        TagStore.addChangeFilterListener(this._onChangeFilter.bind(this));
    }

    /**
     * 在组件从DOM unmount后立即执行
     * 主要用来执行一些必要的清理任务。例如清除setTimeout等函数，或者任意的在componentDidMount创建的DOM元素
     */
    componentWillUnmount() {
        TagStore.removeChangeListener(this._onChange.bind(this));
        TagStore.removeChangeTableListener(this._onChangeOrder.bind(this));
        TagStore.removeChangeFilterListener(this._onChangeFilter.bind(this));
    }


    render() {
        let paginationProps = {
            initialCollection: this.state.tags,
            currentPage: this.state.page.currentPage + 1,
            totalPages: this.state.page.totalPage,
            maximumPages: this.props.maximumPages ? this.props.maximumPages : 7,
            onChangePage: this._onChangePage.bind(this)
        };
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">公共标签的维护</div>
                    <div className="panel-body">
                        <SearchBar onSearch={this._onSearch.bind(this)}/>
                    </div>
                    <TagList tags={this.state.tags}/>
                </div>
                <Pagination {...paginationProps} />
            </div>
        );
    }
}