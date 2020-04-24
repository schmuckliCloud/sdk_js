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
     * Assign a Firebase Cloud Messaging device token to a user in your project.
     * @param {String} device_token The device token received from the Firebase SDK.
     * @param {int} user_id The user id, received from the schmuckliCloud Auth SDK.
     * @returns {Promise}
     */
    async assignTokenToUser(device_token, user_id) {
        
    }

    /**
     * Sends a request to FCM instantly.
     * @param {int} user_id The user id of the user which should be notified.
     * @param {object} body The body of the request like here: https://firebase.google.com/docs/cloud-messaging/http-server-ref
     * @return {Promise}
     */
    async sendRequestNow(user_id, body) {
        
    }

    /**
     * Sends a request to FCM on the specified timestamp.
     * @param {int} user_id The user id of the user which should be notified.
     * @param {object} body The body of the request like here: https://firebase.google.com/docs/cloud-messaging/http-server-ref
     * @param {int} timestamp The timestamp, when the request should be processed.
     * @return {Promise}
     */
    async sendRequestLater(user_id, body, timestamp) {
        
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