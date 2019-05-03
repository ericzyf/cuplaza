const axios = require('axios')

const url = 'http://localhost:8081/api/search/'

/**
 * This is the search service api.
 * -------------------------------
 * This component handles all the requests related to
 * the search system. It can be used to search for
 * items that match with the search keyword.
 */

class SearchService {
  /**
   * make http GET request
   * retrieve the information of all the items that match with the search keyword
   * @param b64 base64url-encoded search keyword
   */
  static searchItem(b64) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${b64}`)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }
}

export default SearchService