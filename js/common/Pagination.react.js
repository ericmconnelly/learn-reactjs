'use strict';

import React, { PropTypes, Component } from 'react';

export default class Pagination extends Component {

    propTypes: {
        initialCollection: PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        maximumPages: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    _nextPage(e) {
        e.preventDefault();
        var pageNumber = this.props.currentPage + 1;
        this.props.onChangePage(pageNumber);
    }

    _previousPage(e) {
        e.preventDefault();
        var pageNumber = this.props.currentPage - 1;
        this.props.onChangePage(pageNumber);
    }

    _changePage(e) {
        e.preventDefault();
        var pageNumber = e.target.getAttribute('data-page');
        this.props.onChangePage(pageNumber);
    }

    _renderNext() {
        if(this.props.currentPage < this.props.totalPages){
            return (<li className=""><a href="javascript: void 0;" onClick={this._nextPage.bind(this)}>&raquo;</a></li>)
        } else {
            return (<li className="disabled"><a href="javascript: void 0;">&raquo;</a></li>)
        }
    }

    _renderPrevious () {
        if (this.props.currentPage > 1) {
            return (<li className=""><a href="javascript: void 0;" onClick={this._previousPage.bind(this)}>&laquo;</a></li>)
        } else {
            return (<li className="disabled"><a href="javascript: void 0;" >&laquo;</a></li>)
        }
    }
    /**
     * Pages渲染方法
     * 如果page超过maximumPages用省略号ellipsis表示
     * 处理active样式
     */
    _renderPages () {
        if (this.props.maximumPages > this.props.totalPages) {
            return this._renderNormalPages();
        } else {
            return this._renderEllipsisPages();
        }
    }

    _renderNormalPages(){
        var pages = [];
        for (let page = 1; page <= this.props.totalPages; page++) {
            if (page !== this.props.currentPage) {
                pages.push(<li><a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={page} className="">{page}</a></li>)
            } else {
                pages.push(<li className="active"><a href="javascript: void 0;" >{page}</a></li>)
            }
        }
        return pages;
    }

    _renderEllipsisPages(){
        var pages = [];
        var startPage = 1;
        var endPage = startPage + this.props.maximumPages -1;

        if (this.props.currentPage >= 4) {
            startPage = this.props.currentPage - 1;
            endPage = startPage + this.props.maximumPages -3;
            //占去前两个位置
            pages.push(
                <li key='1'>
                    <a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={1}
                       className="">{1}</a>
                </li>);
            pages.push(
                <li key='ellipsisLeft' className="disabled">
                    <a href="javascript: void 0;">&hellip;</a>
                </li>);
            if ((this.props.totalPages - this.props.currentPage) < (this.props.maximumPages - 3)) {
                startPage = this.props.totalPages - (this.props.maximumPages - 3);
            }
        }

        if ((this.props.totalPages - (startPage - 1)) > (this.props.maximumPages - 2)) {
            endPage = endPage - 2;
        }

        for (let page = startPage; page <= endPage && page <= this.props.totalPages; ++page) {
            if (page !== this.props.currentPage) {
                pages.push(
                    <li key={page}>
                        <a href="javascript: void 0;" onClick={this._changePage.bind(this)} data-page={page}
                           className="">{page}</a>
                    </li>)
            } else {
                pages.push(
                    <li key={page} className="active">
                        <a href="javascript: void 0;" >{page}</a>
                    </li>)
            }
        }

        //判断starterPage到结尾是否需要省略
        if ((this.props.totalPages - (startPage - 1)) > (this.props.maximumPages - 2)) {
            pages.push(
                <li key='ellipsisRight'className="disabled">
                    <a href="javascript: void 0;">&hellip;</a>
                </li>);
            pages.push(
                <li key={this.props.totalPages}>
                    <a href="javascript: void 0;" onClick={this._changePage.bind(this)}
                       data-page={this.props.totalPages} className="">{this.props.totalPages}</a>
                </li>)
        }
        return pages;
    }

    render () {
        var next = this._renderNext();
        var pages = this._renderPages();
        var previous = this._renderPrevious();
        return (
            <ul className="pagination">
                {previous}
                {pages}
                {next}
            </ul>
        );
    }
}