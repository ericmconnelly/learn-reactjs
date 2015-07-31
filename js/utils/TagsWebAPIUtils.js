'use strict';

import $ from 'jquery';

export default {
    load: function (page, size, success) {
        $.ajax({
            url: 'http://' + config.host + '/v0.1/tag/pageable/common/0?page=' + page + '&size=' + size,
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
    },

    update: function (data, success) {
        var postData =JSON.stringify(data);
        $.ajax({
            url: 'http://' + config.host + '/v0.1/tag/batch/common',
            headers: {
                "Authorization": "DEBUG userid= 987011,realm=contacts.sdp.nd",
                "Content-Type": "application/json; charset=UTF-8"
            },
            dataType: 'json',
            type:'put',
            data: postData,
            success: function (data) {
                success(data);
            },
            error: function (err) {
                console.error(err.responseText, status, err.toString());
            }
        });
    }
};