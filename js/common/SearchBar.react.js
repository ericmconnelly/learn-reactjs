'use strict';

import React, { PropTypes, Component } from 'react';

var ENTER_KEY_CODE = 13;

export default class SearchBar extends Component {

    propTypes:{
        onSearch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    _onSearch(){
       let text =  React.findDOMNode(this.refs.searchText).value.trim();
       this.props.onSearch(text);
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._onSearch();
        }
    }

    render() {
        return (
            <div className="form-group col-sm-4 pull-right">
                <div className="col-sm-12">
                    <div className=" col-sm-10">
                        <input type="search" ref='searchText' className="form-control "
                               onKeyDown={this._onKeyDown.bind(this)}
                               placeholder="查找"/>
                    </div>
                    <button className="btn btn-info col-sm-2" onClick={this._onSearch.bind(this)}>
                        Go!
                    </button>
                </div>
            </div>
        );
    }
}