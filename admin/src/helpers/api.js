/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
  return fetch(`http://149.28.143.152:6969/api/v1/${url}`, options)
    .then((response) => {
      if (!response.status === 200) {
        throw response.json();
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      throw error;
    });
};

export { fetchJSON };
