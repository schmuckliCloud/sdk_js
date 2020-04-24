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
}