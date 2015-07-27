'use strict';

import React, { PropTypes, Component } from 'react';

/**
 * 下拉选择控件
 */
export default class DropdownList extends Component {

    propTypes: {
        id: PropTypes.string,
        currentValue: PropTypes.number,
        onChange: PropTypes.func,
        options: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            currentValue: this.props.currentValue
        };
    }

    _onSelect(e) {
        e.preventDefault();
        var value = parseInt(e.target.getAttribute('data-value'));
        this.setState({currentValue: value});
        this.props.onChange(this.props.id, value);
    }

    render() {
        var _onSelect = this._onSelect.bind(this);
        var currentSelected = this.state.options.length > 1 ? this.state.options[0] : {};
        var currentValue = this.state.currentValue;
        this.state.options.forEach(valueObject => {
            if (valueObject.value === currentValue) {
                currentSelected = valueObject;
            }
        });

        return (
            <div className="btn-group open">
                <button type="button"
                        className={"btn btn-sm btn-" + currentSelected.className}>{currentSelected.display}</button>
                <button type="button" className={"btn btn-sm dropdown-toggle-sm btn-" + currentSelected.className}
                        data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                    {
                        this.state.options.map(valueObject => {
                            return (<li><a data-value={valueObject.value} onClick={_onSelect}>{valueObject.display}</a></li>);
                        })
                    }
                </ul>
            </div>
        );
    }


}