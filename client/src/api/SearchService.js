const axios = require('axios')
const base64url = require('base64url')

const url = 'http://localhost:8081/api/search/'

class SearchService {
  static searchItem(keyword) {
    const b64 = base64url(keyword)
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