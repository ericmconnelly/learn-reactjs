'use strict';

import React, { PropTypes, Component } from 'react';

var ENTER_KEY_CODE = 13;

/**
 * 文本输入框控件
 */
export default class TextInput extends Component {

    /**
     * 定义属性内容
     */
    propTypes: {
        className: PropTypes.string,
        id: PropTypes.string,
        placeholder: PropTypes.string,
        onSave: PropTypes.func.isRequired,
        onSubmit: PropTypes.func,
        value: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = { value: this.props.value || '' };
    }

    render() {
        return (
            <input
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
                onChange={this._onChange.bind(this)}
                onBlur={this._save.bind(this)}
                onKeyDown={this._onKeyDown.bind(this)}
                value={this.state.value}
                />
        );
    }


    _save() {
        this.props.onSave(this.props.id, this.state.value);
    }

    _submit() {
        this.props.onSubmit();
    }


    _onChange(event) {
        this.setState({
            value: event.target.value
        });
    }


    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
            this._submit();
        }
    }

}