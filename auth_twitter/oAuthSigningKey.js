const oAuthSigningKey = (consumer_secret, token_secret) => {
    return consumer_secret + '&' + token_secret;
};

module.exports = oAuthSigningKey