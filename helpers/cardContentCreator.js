const timeago = require('timeago.js')

const cardContentCreator = (body, CARD_NUMBER) => {
    let cardBody = {}
    cardBody.links = body.statuses[i].full_text.match(/https:\/\/t.co\/[a-zA-Z0-9]+/gm);
    cardBody.mentions = body.statuses[i].full_text.match(/@\w{0,}(?!\s)./g);
    cardBody.hashtags = body.statuses[i].full_text.match(/\B(\#[a-zA-Z0-9]+\b)/g)
    cardBody.full_text = body.statuses[i].full_text

    cardBody.links.forEach(e => {
        full_text = body.statuses[i].full_text.replace(e, `<a target="_blank" href="${e}">${e}></a>`);
    })
    cardBody.full_text = full_text.replace(mentions, '<h5>' + mentions + '</h5>');
    cardBody.hashtags.forEach(e => {
        full_text = full_text.replace(e, '<b>' + e + '</b>');
    })

    cardData[CARD_NUMBER] = {
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
    return cardData
}

module.exports = cardContentCreator