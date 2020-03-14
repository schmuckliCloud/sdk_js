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
              "There was an error while registering the user with email and password. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Authorizes the user with email and password. In the body you will find the session token.
   * @param {string} email The email of the user
   * @param {string} password The password of the user
   * @returns {sCResult} If it was successful, it will provide the session token in the body. Save it somewhere safe on the client.
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
              "There was an error while authorizing the user with email and password. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Updates the password of the given email for the user in the project.
   * @param {string} email The email of the user, where the password should be changed.
   * @param {string} old_password The current password of the user.
   * @param {string} new_password The new password of the user.
   */
  async updatePassword(email, old_password, new_password) {
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
          function: "update_password",
          password: old_password,
          new_password: new_password
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while authorizing the user with email and password. Following error message: " +
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
              "There was an error while requesting for a new password. Following error message: " +
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
          function: "update_reset_password",
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
              "There was an error while updating the password. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Call this function, if the user has clicked on the activation link in the welcome email.
   * @param {string} token The token, which was given through the parameter in the email link.
   * @returns {sCResult} If it was successful, then it will return a confirmation.
   */
  async activateUser(token) {
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
          function: "activate_account",
          token: token
        }
      }).then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while activating the user account. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Checks if the token provided is still valid and matches with the server.
   * @param {string} token The session token, which you got, when the user has been authorized.
   */
  async checkSession(token) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "GET",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: token
        }
      }).then(function(response) {
        var data = response.data;
        switch (response.status) {
          case 200:
          case 404:
            resolve(new sCResult(data.status, data.message, data.body));
            break;
          default:
            reject(
              new Error(
                "There was an error while checking the session. Following error message: " +
                  data.message
              )
            );
            break;
        }
      });
    });
  }

  /**
   * Gets more detailed information about the signed in user.
   * @param {string} token The token of the current session.
   */
  async getUserDetails(token) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "GET",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: token
        },
        params: {
          function: "user_profile"
        }
      }).then(function(response) {
        var data = response.data;
        switch (response.status) {
          case 200:
          case 404:
            resolve(new sCResult(data.status, data.message, data.body));
            break;
          default:
            reject(
              new Error(
                "There was an error while getting the user profile with this session. Following error message: " +
                  data.message
              )
            );
            break;
        }
      });
    });
  }

  /**
   * Get all active session for the user.
   * @param {string} token The token of the current session.
   */
  async getActiveSessions(token) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "GET",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: token
        },
        params: {
          function: "sessions"
        }
      }).then(function(response) {
        var data = response.data;
        switch (response.status) {
          case 200:
          case 404:
            resolve(new sCResult(data.status, data.message, data.body));
            break;
          default:
            reject(
              new Error(
                "There was an error while getting the user profile with this session. Following error message: " +
                  data.message
              )
            );
            break;
        }
      });
    });
  }

  /**
   * Removes the current active session, which was given.
   * @param {string} token The session token of the current logged in session.
   */
  async logout(token) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "DELETE",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: token
        },
        params: {
          function: "logout"
        }
      }).then(function(response) {
        var data = response.data;
        switch (response.status) {
          case 200:
          case 404:
            resolve(new sCResult(data.status, data.message, data.body));
            break;
          default:
            reject(
              new Error(
                "There was an error while logout the session with this session. Following error message: " +
                  data.message
              )
            );
            break;
        }
      });
    });
  }

  /**
   * Removes a session by the session id.
   * @param {string} current_token The token, where the user is currently signed in.
   * @param {int} id The session id, which should be removed.
   */
  async removeSession(current_token, id) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios({
        url: Config.API_ENDPOINT,
        method: "DELETE",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: current_token
        },
        params: {
          function: "remove_session",
          session_id: id
        }
      }).then(function(response) {
        var data = response.data;
        switch (response.status) {
          case 200:
          case 404:
            resolve(new sCResult(data.status, data.message, data.body));
            break;
          default:
            reject(
              new Error(
                "There was an error while logout the session with this session. Following error message: " +
                  data.message
              )
            );
            break;
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
