const cardContentCreator = require('./cardContentCreator')

function cardsGroupCreator(body, QUERIES_AMOUNT) {
    const cardsContent = [];
    let CARD_NUMBER = 0;

    for (let i = 0; i < QUERIES_AMOUNT; i++) {
        if (!/^RT/.test(body.statuses[i].full_text)) {
            let cardData = cardContentCreator(body, CARD_NUMBER)
            CARD_NUMBER++
            cardsContent.push(cardData)
        }
    }
    return cardsContent
}

module.exports = cardsGroupCreator