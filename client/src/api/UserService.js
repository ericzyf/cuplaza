const axios = require('axios')

const url = 'http://localhost:8081/api/users/'

/**
 * This is the user service api.
 * -----------------------------
 * This component handles all the requests related to
 * the user management system. It can be used to
 * retrieve the user information in the user info
 * database, create a new user in the database, as well
 * as delete a user from the database.
 */

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
   * create a new record in 'users' collection
   * @param user user info in json
   */
  static postUser(user) {
    return axios.post(url, user)
  }

  /**
   * make http DELETE request
   * delete a record from 'users' collection
   * @param id id of the user to be deleted
   */
  static deleteUser(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default UserService