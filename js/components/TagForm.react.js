'use strict';

import React, { Component } from 'react';
import TagActions  from '../actions/TagActions';

export default class TagForm extends Component {

    _onSubmit () {
        let [typeNode, tagNameNode, cateOneNode, cateTwoNode, cateThreeNode]
            = [this.refs.type.getDOMNode(), this.refs.tagName.getDOMNode(),
            this.refs.cateOne.getDOMNode(), this.refs.cateTwo.getDOMNode(),
            this.refs.cateThree.getDOMNode()];

        let [type, tagName, cateOne, cateTwo, cateThree]
            =[typeNode.value, tagNameNode.value, cateOneNode.value,
            cateTwoNode.value, cateThreeNode.value];

        typeNode.value = '';
        tagNameNode.value = '';
        cateOneNode.value = '';
        cateTwoNode.value = '';
        cateThreeNode.value = '';

        TagActions.create({
            type: type,
            tag_name: tagName,
            category_one: cateOne,
            category_two: cateTwo,
            category_three: cateThree,
            create_time: new Date().getTime(),
            modify_time: new Date().getTime(),
            del_state: 0
        });
    }

    render () {
        return (
            <div className="row pull-right">
                <div className="col-xs-2">
                    <input type="text" ref='type' className="form-control" placeholder="标签类型"/>
                </div>
                <div className="col-xs-2">
                    <input type="text" ref='tagName' className="form-control" placeholder="标签名称"/>
                </div>
                <div className="col-xs-2">
                    <input type="text" ref='cateOne' className="form-control" placeholder="一级菜单"/>
                </div>
                <div className="col-xs-2">
                    <input type="text" ref='cateTwo' className="form-control" placeholder="二级菜单"/>
                </div>
                <div className="col-xs-2">
                    <input type="text" ref='cateThree' className="form-control" placeholder="三级菜单"/>
                </div>
                <div className="col-xs-2">
                    <button type="button" onClick={this._onSubmit.bind(this)} className="btn btn-lg btn-success">提交</button>
                </div>
            </div>
        );
    }

}
