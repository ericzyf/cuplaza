const axios = require('axios')

const url = 'http://localhost:8081/api/users/'

class UserService {
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }

  static postUser(user) {
    return axios.post(url, user)
  }

  static deleteUser(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default UserService