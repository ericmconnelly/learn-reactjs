'use strict';

import $ from 'jquery';

//var _host = 'localhost:8080';
var _host = 'contacts.dev.web.nd';
export default {
    load: function (page, size, success) {
        $.ajax({
            url: 'http://' +_host + '/v0.1/tag/pageable/common/0?page=' + page + '&size=' + size,
            headers: {"Authorization": "DEBUG userid= 987011,realm=contacts.sdp.nd"},
            dataType: 'json',
            cache: false,
            success: function (data) {
                success(data);
            },
            error: function (err) {
                console.error(err.responseText, status, err.toString());
            }
        });
    }

    //TODO 增加获取部署环境API 增加

};