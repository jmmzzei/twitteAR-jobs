export const hasInputsValues = ({
  hashtagsInput,
  unwantedInput,
  keywordsInput,
}) =>
  hashtagsInput.getValue() ||
  unwantedInput.getValue() ||
  keywordsInput.getValue() ||
  unwanted.length > 0 ||
  keywords.length > 0 ||
  hashtags.length > 0
