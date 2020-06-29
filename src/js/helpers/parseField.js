export const parseField = (tags, input) => (
  Array.isArray(tags) && tags.length
        ? tags.join(' ') + ' ' + input.getValue().trim() || ''
        : input.getValue() || ''
  )

