const axios = require('axios')

const url = 'http://localhost:8081/api/users/'

class UserService {
  /**
   * make http GET request
   * get all records in 'users' collection
   */
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

  /**
   * make http POST request
   * @param user user info in json
   */
  static postUser(user) {
    return axios.post(url, user)
  }

  /**
   * make http DELETE request
   * @param id id of the user to be deleted
   */
  static deleteUser(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default UserService