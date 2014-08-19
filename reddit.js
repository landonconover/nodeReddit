#!/usr/bin/env node

var request = require("request");
var prompt = require('prompt');
var ASQ = require('asynquence');
var exec = require('child_process').exec;

//first ask what subreddit you want
ASQ().then(function(done,msg){
    prompt.start();

    prompt.get(['Subreddit'], function (err, result) {
        if (err) { return onErr(err); }
        done(result['Subreddit']);
      });

//next show the first 10 from that sub
}).then(function(done,msg){
    var url = "http://www.reddit.com/r/"+msg+"/.json"

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            for(var i = 0; i < 10; i++) {
                var obj = body.data.children[i];

                console.log("#" + i + ". " + obj.data.title);
                console.log("Up: "+obj.data.ups + " | Down: "+obj.data.downs + " | Score: "+obj.data.score);
                console.log();
                console.log("");
            }
            done(msg);
        }
    })
//ask the user if they want to see one
}).then(function(done,msg){
    prompt.start();

    prompt.get(['Selection'], function (err, result) {
        if (err) { return onErr(err); }
        var data = {
            sub: msg,
            selection: result['Selection']
        }

        done(data);
      });

    //open the correct choice
}).then(function(done,msg){
    var url = "http://www.reddit.com/r/"+msg.sub+"/.json";

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            for(var i = 0; i < 10; i++) {
                var obj = body.data.children[i];

                if (i==msg.selection) {
                    exec('open '+obj.data.url, function (error, stdout, stderr) {

                    });
                    console.log(obj.data.url);
                };
                
            }
        }
    })
})
