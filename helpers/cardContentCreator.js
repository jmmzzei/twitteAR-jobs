const timeago = require('timeago.js')

const cardContentCreator = (bodyStatuses) => {
  let cardBody = {}
  cardBody.links = bodyStatuses.full_text.match(
    /https:\/\/t.co\/[a-zA-Z0-9]+/gm,
  )
  cardBody.mentions = bodyStatuses.full_text.match(/@\w{0,}(?!\s)./g)
  cardBody.hashtags = bodyStatuses.full_text.match(/\B(\#[a-zA-Z0-9]+\b)/g)
  cardBody.full_text = bodyStatuses.full_text

  if (cardBody.links) {
    cardBody.links.forEach((e) => {
      cardBody.full_text = bodyStatuses.full_text.replace(
        e,
        `<a target="_blank" href="${e}">${e}></a>`,
      )
    })
  }

  cardBody.full_text = cardBody.full_text.replace(
    cardBody.mentions,
    '<p>' + cardBody.mentions + '</p>',
  )

  if (cardBody.hashtags) {
    cardBody.hashtags.forEach((e) => {
      cardBody.full_text = cardBody.full_text.replace(e, '<b>' + e + '</b>')
    })
  }

  cardData = {
    text: {
      full: cardBody.full_text,
      links: cardBody.links,
      mentions: cardBody.mentions,
      hashtags: cardBody.hashtags,
    },
    timestamp: timeago.format(bodyStatuses.created_at),
    username: bodyStatuses.user.screen_name,
    name: bodyStatuses.user.name,
    id: bodyStatuses.id_str,
  }
  return cardData
}

module.exports = cardContentCreator
