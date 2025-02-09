export function parseQueryString(queryString) {
  let query = queryString.substring(queryString.indexOf("?"), queryString.length);
  console.log(`Cleaned query string: ${query}`);
  const params = new URLSearchParams(query);

  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}