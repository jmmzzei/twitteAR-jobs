"use strict";

require("core-js/modules/web.dom.iterable");

const submitHandler = () => {
  let hashtags = Array.from(document.getElementsByClassName('hash-span')).map(el => percentEncode(el.innerText.slice(1, -2)));
  let keywords = Array.from(document.getElementsByClassName('keyw-span')).map(el => percentEncode(el.innerText.slice(0, -2)));
  let unwanted = Array.from(document.getElementsByClassName('unwanted-span')).map(el => percentEncode(el.innerText.slice(1, -2)));

  if (hashtagsInput.getValue() || unwantedInput.getValue() || keywordsInput.getValue() || unwanted.length > 0 || keywords.length > 0 || hashtags.length > 0) {
    let url = new URL('https://twittear-jobs.herokuapp.com/search/'),
        params = {
      hashtags: Array.isArray(hashtags) && hashtags.length ? hashtags.join(' ') + ' ' + hashtagsInput.getValue().trim() || '' : hashtagsInput.getValue() || '',
      keywords: Array.isArray(keywords) && keywords.length ? keywords.join(' ') + ' ' + keywordsInput.getValue().trim() || '' : keywordsInput.getValue() || '',
      unwanted: Array.isArray(unwanted) && unwanted.length ? unwanted.join(' ') + ' ' + unwantedInput.getValue().trim() || '' : unwantedInput.getValue() || ''
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    window.location.href = url.href;
  } else {
    if (!(document.getElementsByClassName('message').length > 0)) {
      const wrapper = document.getElementsByClassName('wrapper')[0];
      const messageWrapper = document.createElement('div');
      const message = document.createElement('p');
      messageWrapper.className = 'message-wrapper';
      message.innerText = 'NOTHING TO SEARCH';
      message.className = 'message';
      const submessage = document.createElement('p');
      submessage.innerText = 'Please, fill at least one input.';
      submessage.className = 'submessage';
      messageWrapper.appendChild(message);
      messageWrapper.appendChild(submessage);
      wrapper.appendChild(messageWrapper);
    }
  }
};