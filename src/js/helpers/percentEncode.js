const percentEncode = (str) =>
  encodeURIComponent(str).replace(
    /[!*()']/g,
    (char) => '%' + char.charCodeAt(0).toString(16),
  )

