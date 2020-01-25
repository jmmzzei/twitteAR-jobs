const timeago = require('timeago.js')

function cardsParser(QUERIES_AMOUNT) {
    const cardsContent = [];
    let CARD_NUMBER = 0;
    
    for (let i = 0; i < QUERIES_AMOUNT; i++) {
        if (!/^RT/.test(body.statuses[i].full_text)) {

            let links = body.statuses[i].full_text.match(/https:\/\/t.co\/[a-zA-Z0-9]+/gm);
            let mentions = body.statuses[i].full_text.match(/@\w{0,}(?!\s)./g);
            let hashtags = body.statuses[i].full_text.match(/\B(\#[a-zA-Z0-9]+\b)/g)
            let full_text = body.statuses[i].full_text

            links.forEach(e => {
                full_text = body.statuses[i].full_text.replace(e, `<a target="_blank" href="${e}">${e}></a>`);
            })

            full_text = full_text.replace(mentions, '<h5>' + mentions + '</h5>');

            hashtags.forEach(e => {
                full_text = full_text.replace(e, '<b>' + e + '</b>');
            })

            cardsContent[CARD_NUMBER] = {
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
            CARD_NUMBER++;
        }
    }
    return cardsContent
}

module.exports = cardsParser