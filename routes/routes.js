const express = require('express');
const router = express.Router();
const request = require('request');
const timeago = require('timeago.js');
const auth = require('../auth_twitter/auth');

const querys = 'TrabajoAr';
const count = 50;

router.get('/', (req, res) => {
    
    let autho = auth.getAuthorization('GET','https://api.twitter.com/1.1/search/tweets.json',{ 'q': querys, 'count': count, 'result_type': 'recent', 'tweet_mode': 'extended'});

    let opt = {
        url: `https://api.twitter.com/1.1/search/tweets.json?q=${querys}&count=${count}&result_type=recent&tweet_mode=extended`,
        method: 'GET',
        headers: {
            'Authorization': autho 
        },
        json: true
    }

     request(opt, (err, resp, body)=> {
        console.log(body);
         
        const arr = [];
        let counter = 0;
        for (let i = 0; i < count; i++) {
            if (!/^RT/.test(body.statuses[i].full_text)) {
                
                let links = body.statuses[i].full_text.match(/https:\/\/t.co\/[a-zA-Z0-9]+/gm);
                let mentions = body.statuses[i].full_text.match(/@\w{0,}(?!\s)./g);
                let hashtags = body.statuses[i].full_text.match(/\B(\#[a-zA-Z0-9]+\b)/g)
                let full_text = body.statuses[i].full_text

                links.forEach(e => {
                    full_text = body.statuses[i].full_text.replace(e, `<a target="_blank" href="${e}">${e}></a>`);
                })

                full_text = full_text.replace(mentions, '<h5>'+mentions+'</h5>');

                hashtags.forEach( e => {
                    full_text = full_text.replace(e, '<b>'+e+'</b>');
                })

                arr[counter] = {
                'text': {
                    'full': full_text, 
                    'links': links,
                    'mentions': mentions,
                    'hashtags': hashtags
                },
                'timestamp': timeago.format(body.statuses[i].created_at), 
                'username': body.statuses[i].user.screen_name, 
                'name': body.statuses[i].user.name, 
                'id': body.statuses[i].id_str, 
                };
                counter++;
            }
        }
        
        res.render('index', {arr});
    })
});

module.exports = router;