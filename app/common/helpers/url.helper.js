
/**
 * Parse url from: http://example.com/product/:id
 * To real url: http://example.com/product/123
 * @param {String} url
 * @param {Object} queryParam
 */
export const compileParamToUrl = (url, queryParam = {}) => {
  const regex = /:([A-Za-z0-9_]+)/g;
  let match = regex.exec(url);
  let parsedUrl = url;
  const params = { ...queryParam };
  while (match != null) {
    let queryData = match[1];
    if (params[match[1]] !== null && params[match[1]] !== undefined) {
      queryData = `${params[match[1]]}`;
      delete params[match[1]];
    }
    parsedUrl = parsedUrl.replace(`:${match[1]}`, queryData);
    match = regex.exec(parsedUrl);
  }
  return { url: parsedUrl, params };
};

/**
 * Parse url from: http://example.com/ with queryParam = {category: products}
 * To real url: http://example.com/?category=products
 * @param {String} url
 * @param {Object} queryParam
 */
export const compileQueryToUrl = (url, queryParam = {}) => {
  const queryString = Object.keys(queryParam).map(key => (`${key}=${queryParam[key] || ''}`)).join('&');
  if (url.indexOf('?') !== -1) {
    return `${url}&${queryString}`;
  }
  return `${url}?${queryString}`;
};

/**
 * Parse url from: http://example.com/product/:id
 * To real url: http://example.com/product/123?category=kitchen
 * @param {String} url
 * @param {Object} queryParam
 */
export const compileUrl = (url, queryParam = {}) => {
  const { url: pUrl, params } = compileParamToUrl(url, queryParam);
  return compileQueryToUrl(pUrl, params);
};
