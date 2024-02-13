/** User class for message.ly */



/** User of the site. */

const db = require("../db");s
const ExpressError = require("../expressError");

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */
  constructor({username, password, first_name, last_name, phone}) {
    this.username = username;
    this.password = password;
    this.firstName = first_name;
    this.lastName = last_name;
    this.phone = phone;
  }

  static async register({username, password, first_name, last_name, phone}) {
   const results = await db.query(
    `INSERT INTO users
    (username, password, first_name, 
      last_name, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username`, [this.username, this.password, 
        this.first_name, this.last_name, this.phone]
   );
   return results.rows.map(row => new User(row));
  }
  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;