'use strict';
import Crypto from 'crypto-js'

export default {
    getAuthHeader (url, method) {
        var access_token = localStorage.getItem('access_token');
        var mac_key = localStorage.getItem('mac_key');
        if (!access_token || !mac_key) {
            return;
        }
        if (!Crypto) {
            alert('please include crypto lib in the page.')
        }

        var strAuth = 'MAC id="' + access_token + '",nonce="';
        var nonce = new Date().getTime() + ':' + this.randomCode();
        strAuth += nonce + '",mac="';
        //var host = 'contacts.sdp.nd';
        var host = config.host;

        var path;
        var pos = url.indexOf("://");
        if (pos > 0) {
            path = url.substring(pos + 3);
            pos = path.indexOf("/");
            host = path.substr(0, pos);
            path = path.substring(pos);
        } else {
            path = url;
        }
        var request_content = nonce + '\n' + method + '\n' + path + '\n' + host + '\n';
        var hash = Crypto.HmacSHA256(request_content, mac_key);
        var mac = hash.toString(Crypto.enc.Base64);
        strAuth += mac + '"';
        return strAuth;
    },

    randomCode () {
        var code = "";
        var codeLength = 8;//验证码的长度
        var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        //所有候选组成验证码的字符，当然也可以用中文的

        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += chars[charIndex];
        }
        return code;
    }
};