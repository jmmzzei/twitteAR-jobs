const getSpansByClassName = (span) => (
    Array.from(
        document.getElementsByClassName('hash-span'),
    ).map(el => percentEncode(
        el.innerText.slice(
           span == 'keyw-span'? 0 : 1, 
            -2)
    ))
)

export const getSpans = () => {
    let hashtags = getSpansByClassName('hash-span')
    let keywords = getSpansByClassName('keyw-span')
    let unwanted = getSpansByClassName('unwanted-span')
    return {hashtags, keywords, unwanted}
}
