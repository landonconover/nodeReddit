#!/usr/bin/env node

var request = require("request")

var url = "http://www.reddit.com/r/climbing/.json"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        // console.log(body.data.children);

        for(var i = 0; i < body.data.children.length; i++) {
            var obj = body.data.children[i];

            console.log(obj.data.title);
        }
    }
})