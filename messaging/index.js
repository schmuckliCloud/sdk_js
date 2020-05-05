import * as Config from "./config";
import axios from "axios";

class sCMessaging {
  /**
  Opens a new schmuckliCloud authentication instance. It can be used to manage then all the data in a defined project.
  @param {String} app_id The APP ID, which was created for a client app in the schmuckliCloud console.
  @param {String} app_secret The APP Secret, which was created for a client app in the schmuckliCloud console.
  */
  constructor(app_id, app_secret) {
    this.appid = app_id;
    this.appsecret = app_secret;
  }

  /**
   * Sets the currently signed in user.
   * @param {string} auth_token Sets the auth token for the further operations.
   */
  setAuthToken(auth_token) {
    this.auth_token = auth_token;
  }

  /**
   * Assign a Firebase Cloud Messaging device token to the currently logged in your project.
   * @param {String} device_token The device token received from the Firebase SDK.
   * @returns {Promise}
   */
  async assignTokenToUser(device_token) {
    if (this.auth_token === undefined) {
      console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
      return false;
    }
    return new Promise(async function (resolve, reject) {
      var response = await axios({
        url: Config.API_ENDPOINT,
        method: "POST",
        headers: {
          appid: this.appid,
          appsecret: this.appsecret,
          authtoken: this.auth_token
        },
        data: {
          function: "assign_token",
          token: device_token
        }
      });
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data);
      }
    }.bind(this));
  }

  /**
   * Sends a request to FCM instantly with the currently logged in user.
   * @param {object} body The body of the request like here: https://firebase.google.com/docs/cloud-messaging/http-server-ref
   * @return {Promise}
   */
  async sendRequestNow(body) {
    if (this.auth_token === undefined) {
      console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
      return false;
    }

    if (body instanceof Object || body instanceof Array) {
      body = JSON.stringify(body);
    }
    return new Promise(async function (resolve, reject) {
      var response = await axios({
        url: Config.API_ENDPOINT,
        method: "PUT",
        headers: {
          appid: this.appid,
          appsecret: this.appsecret,
          authtoken: this.auth_token
        },
        data: {
          function: "call_service_now",
          body: body
        }
      });
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data);
      }
    }.bind(this));
  }

  /**
   * Sends a request to FCM on the specified timestamp with the currently logged in user..
   * @param {object} body The body of the request like here: https://firebase.google.com/docs/cloud-messaging/http-server-ref
   * @param {int} timestamp The timestamp, when the request should be processed.
   * @return {Promise}
   */
  async sendRequestLater(body, timestamp) {
      if (this.auth_token === undefined) {
        console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
        return false;
      }
      if (body instanceof Object || body instanceof Array) {
        body = JSON.stringify(body);
      }
      return new Promise(async function (resolve, reject) {
        var response = await axios({
          url: Config.API_ENDPOINT,
          method: "PUT",
          headers: {
            appid: this.appid,
            appsecret: this.appsecret,
            authtoken: this.auth_token
          },
          data: {
            function: "call_service_later",
            body: body,
            timestamp: timestamp
          }
        });
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data);
        }
      }.bind(this));
    }

    /**
     * Fetchs all the assigned device tokens of the authenticated user.
     * @return {Promise}
     */
    async getAllAssignedTokens() {
      if (this.auth_token === undefined) {
        console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
        return false;
      }
      return new Promise(async function (resolve, reject) {
        var response = await axios({
          url: Config.API_ENDPOINT,
          method: "GET",
          headers: {
            appid: this.appid,
            appsecret: this.appsecret,
            authtoken: this.auth_token
          },
          params: {
            function: "assigned_tokens"
          }
        });
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data);
        }
      }.bind(this));
    }

    /**
     * Fetchs all the open requests, which will be send to the user in the future.
     * @returns {Promise}
     */
    async getOpenRequests() {
      if (this.auth_token === undefined) {
        console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
        return false;
      }
      return new Promise(async function (resolve, reject) {
        var response = await axios({
          url: Config.API_ENDPOINT,
          method: "GET",
          headers: {
            appid: this.appid,
            appsecret: this.appsecret,
            authtoken: this.auth_token
          },
          params: {
            function: "open_requests"
          }
        });
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data);
        }
      }.bind(this));
    }

  /**
     * Deletes an open request by its id
     * @param {Number} id The request id
     * @returns {Promise}
     */
    async deleteOpenRequest(id) {
      if (this.auth_token === undefined) {
        console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
        return false;
      }
      return new Promise(async function (resolve, reject) {
        var response = await axios({
          url: Config.API_ENDPOINT,
          method: "DELETE",
          headers: {
            appid: this.appid,
            appsecret: this.appsecret,
            authtoken: this.auth_token
          },
          data: {
            function: "delete_request",
            request_id: id
          }
        });
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data);
        }
      }.bind(this));
    }

    /**
     * Deletes a assigned device token from the user. For example when he sign outs.
     * @param {Number} id The assigned token id
     * @returns {Promise}
     */
    async deleteAssignedToken(id) {
      if (this.auth_token === undefined) {
        console.warn("Please define a auth_token with the function setAuthToken, before you can use this function.");
        return false;
      }
      return new Promise(async function (resolve, reject) {
        var response = await axios({
          url: Config.API_ENDPOINT,
          method: "DELETE",
          headers: {
            appid: this.appid,
            appsecret: this.appsecret,
            authtoken: this.auth_token
          },
          data: {
            function: "delete_assigned_token",
            token_id: id
          }
        });
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.data);
        }
      }.bind(this));
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

export { sCMessaging, sCResult };  