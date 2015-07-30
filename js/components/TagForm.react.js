'use strict';

import $ from 'jquery';
import React, { Component } from 'react';
import TagActions  from '../actions/TagActions';
import UUIDUtils  from '../utils/UUIDUtils';
import TagsWebAPIUtils from '../utils/TagsWebAPIUtils';

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

        var newTag = {
            id: UUIDUtils.uuid(),
            type: type,
            tag_name: tagName,
            category_one: cateOne,
            category_two: cateTwo,
            category_three: cateThree,
            create_time: new Date().getTime(),
            modify_time: new Date().getTime(),
            cur_version: 0,
            del_state: 0
        };

        //var postData = {
        //    "imei": "",
        //    "platform": "android",
        //    "items": []
        //};
        //postData.items.push(newTag);
        //TagsWebAPIUtils.update(postData, data => {
        //    newTag.cur_version = data[0].cur_version;
        //    TagActions.create(newTag);
        //});
        TagActions.create(newTag);
    }

    render () {
        return (
            <form className="form-horizontal" role="form" id="tagForm">
                <fieldset>
                    <legend>新增标签</legend>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" >标签类型</label>
                        <div className="col-sm-4">
                            <input className="form-control"  ref='type' type="text" required placeholder="标签类型"/>
                        </div>
                        <label className="col-sm-2 control-label" required>标签名称</label>
                        <div className="col-sm-4">
                            <input className="form-control" ref='tagName' type="text" required placeholder="标签名称"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label"  >一级菜单</label>
                        <div className="col-sm-4">
                            <input className="form-control" ref='cateOne'type="text" placeholder="一级菜单"/>
                        </div>
                        <label className="col-sm-2 control-label" for="ds_password">二级菜单</label>
                        <div className="col-sm-4">
                            <input className="form-control" ref='cateTwo' type="text" placeholder="二级菜单"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" >三级菜单</label>
                        <div className="col-sm-4">
                            <input className="form-control" ref='cateThree'type="text" placeholder="三级菜单"/>
                        </div>
                        <label for="disabledSelect"  className="col-sm-2 control-label">状态</label>
                        <div className="col-sm-4">
                            <select id="" disabled='disabled' className="form-control">
                                <option selected>存在</option>
                                <option>删除</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <button type="button" onClick={this._onSubmit.bind(this)} className="btn  btn-success">提交</button>
            </form>
        );
    }

}
