'use strict';

import React, { Component } from 'react';
import TagComponent from './components/TagComponent.react';

class Application extends Component {
    render() {
        return (
            <div className="container theme-showcase" role="main">
                <div className="page-header">
                    <h3 className="text-muted">公共标签</h3>
                </div>
                <TagComponent/>
            </div>
        );
    }
}

React.render(<Application />, document.body);
