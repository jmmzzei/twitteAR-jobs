const cardContentCreator = require('./cardContentCreator')

function cardsGroupCreator(bodyStatuses, QUERIES_AMOUNT) {
    const cardsContent = []
    for (let i = 0; i < QUERIES_AMOUNT; i++) {
        if (!/^RT/.test(bodyStatuses[i].full_text)) {
            let cardData = cardContentCreator(bodyStatuses[i])
            cardsContent.push(cardData)
        }
    }
    return cardsContent
}

module.exports = cardsGroupCreator