import { percentEncode } from './helpers/percentEncode'
import { parseField } from './helpers/parseField'
import { hasInputsValues } from './helpers/hasInputsValues'
import { getSpans } from './helpers/getSpans'
import { createWarning } from './helpers/createWarning'

export const submitHandler = (hashtagsInput, keywordsInput, unwantedInput) => {
    let { hashtags, keywords, unwanted } = getSpans()

    if (hasInputsValues) {
        let url = new URL('https://twittear-jobs.herokuapp.com/search/'),
            params = {
                hashtags: parseField(hashtags, hashtagsInput),
                keywords: parseField(keywords, keywordsInput),
                unwanted: parseField(unwanted, unwantedInput),
            }
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key]))
        window.location.href = url.href
    } else {
        if (!(document.getElementsByClassName('message').length > 0)) {
            createWarning()
        }
    }
}

