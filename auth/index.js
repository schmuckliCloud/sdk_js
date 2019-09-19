import * as Config from "./config";
import axios from "axios";

class sCAuth {
  /**
  Opens a new schmuckliCloud authentication instance. It can be used to manage then all the data in a defined project.
  @param {String} app_id The APP ID, which was created for a client app in the schmuckliCloud console.
  @param {String} app_secret The APP Secret, which was created for a client app in the schmuckliCloud console.
  */
  constructor(app_id, app_secret) {
    this.appid = app_id;
    this.appsecret = app_secret;
  }

  /*
  --------- Email Password Provider ---------
  */

  /**
   * Adds a new user to the authentication system.
   * @param {string} email The new email
   * @param {string} password The new password
   * @param {string} language A two letter language code (ex. de, en)
   * @returns {boolean}
   */
  async registerEmailPassword(email, password, language) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT + "emailpassword.php",
        method: "POST",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret
        },
        data: {
          email: email,
          password: password,
          lang: language
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while inserting data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Authorizes the user with email and password. In the body you will find the session token,
   * @param {string} email The email of the user
   * @param {string} password The password of the user
   * @returns {sCResult} If it was successful, it will provide the session token in the body. Save it somewhere save on the client.
   */
  async authorizeEmailPassword(email, password) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT + "emailpassword.php",
        method: "PUT",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret
        },
        data: {
          email: email,
          password: password
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while inserting data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * If the user has forgottten his password, just provide the email and it will send an email with a password change link.
   * @param {string} email The email from the account (ex. EmailPassword or any other provider)
   * @returns {sCResult}
   */
  async requestResetPassword(email) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "PUT",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret
        },
        data: {
          function: "request_reset_password",
          email: email
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while inserting data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Updates the password for the user, after he has clicked the link in the received mail.
   * @param {string} reset_token The reset token, provided from the sent email to the user
   * @param {string} password The new password for the user
   */
  async updateResetPassword(reset_token, password) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "PUT",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret
        },
        data: {
          function: "request_reset_password",
          token: reset_token,
          password: password
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while inserting data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }
}

/*
Result object for filtering the
*/
class sCResult {
  constructor(status_code, message, body) {
    this.status_code = status_code;
    this.message = message;
    this.data = body;
  }

  /**
   * Returns true, if the request was successfully.
   * @returns {boolean}
   */
  get isOK() {
    return this.status_code >= 200 && this.status_code <= 299 ? true : false;
  }
}

export { sCAuth, sCResult };
