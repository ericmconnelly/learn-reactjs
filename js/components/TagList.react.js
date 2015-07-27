'use strict';

import React, { Component } from 'react';
import Tag  from './Tag.react';
import TagListHeader from './TagListHeader.react';
import DateFormatUtils from '../utils/DateFormatUtils';

export default class TagList extends Component {
    render() {
        var tags = this.props.tags.map(function (tag) {
            tag.create_time_text = DateFormatUtils.formatCurrentMillis(tag.create_time);
            tag.modify_time_text = DateFormatUtils.formatCurrentMillis(tag.modify_time);
            return (
                <Tag tag={tag} key={tag.id}/>
            );
        });

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <TagListHeader/>
                    <tbody>
                        {tags}
                    </tbody>
                </table>
            </div>
        );
    }
}
