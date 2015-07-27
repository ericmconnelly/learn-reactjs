'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TagConstants from '../constants/TagConstants';

export default {

    /**
     * 创建sTag
     * @param tag
     */
    create: tag => {
        AppDispatcher.dispatch({
            actionType: TagConstants.TAG_CREATE,
            tag: tag
        });
    },
    /**
     * 从后端获取Tags
     * @param data
     */
    receive: data => {
        AppDispatcher.dispatch({
            actionType: TagConstants.TAGS_RECEIVE,
            data: {
                items: data.items,
                page: data.page
            }
        })
    },

    /**
     * 重新获取Tags
     * @param data
     */
    reload: data  => {
        AppDispatcher.dispatch({
            actionType: TagConstants.TAGS_RELOAD,
            data: {
                items: data.items,
                page: data.page
            }
        })
    },

    /**
     * 排序Tag列表
     * @param sort
     */
    sort: sort  => {
        AppDispatcher.dispatch({
            actionType: TagConstants.TAG_SORT,
            sort: sort
        });
    },

    /**
     * 过滤Tag列表
     * @param columns
     */
    filter: columns  => {
        AppDispatcher.dispatch({
            actionType: TagConstants.TAG_FILTER,
            columns: columns
        });
    }

};
