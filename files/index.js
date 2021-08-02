import * as Config from "./config";
import axios from "axios";

/**
 * The sCFiles instance communicates with the Files API of the schmuckliCloud service.
 */
class sCFiles {
  /**
  Opens a new schmuckliCloud messaging instance.
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

  async upload(files) {
      // Source: https://www.codegrepper.com/code-examples/javascript/sending+files+to+php+using+axios
      var formData = new FormData();
      var i = 0;
      for (var file of files) {
          formData.append("file_" + i, file);
          i++;
      }

      var response = await axios.post(Config.API_ENDPOINT,
          formData
      );

      return response;
  }

}

class sCResult {
  constructor(status_code, message, body) {
    this.status_code = status_code;
    this.message = message;
    this.data = body;
  }

  get isOK() {
    return this.status_code >= 200 && this.status_code <= 299 ? true : false;
  }
}

export { sCMessaging, sCResult };  