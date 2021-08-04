import * as Config from "./config";
import axios from "axios";

/**
 * The sCFiles instance communicates with the Files API of the schmuckliCloud service.
 */
class sCFiles {
    /**
  Opens a new schmuckliCloud files instance.
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
     * Uploads the given files with the defined auth token before and returns the result like token and location.
     * @param {array} files Contains an array with files from a file input field.
     * @returns {sCResult}
     */
    async upload(files) {
        if (files == undefined) {
            return sCResult(400, "Please provide at least one file.");
        }
        if (this.auth_token) {
            return sCResult(403, "Please provide an auth token before you do this request.");
        }
        // Source: https://www.codegrepper.com/code-examples/javascript/sending+files+to+php+using+axios
        var formData = new FormData();
        var i = 0;
        for (var file of files) {
            formData.append("file_" + i, file);
            i++;
        }

        var response = await axios({
            url: Config.API_ENDPOINT,
            method: "POST",
            headers: {
                appid: this.appid,
                appsecret: this.appsecret,
                authtoken: this.auth_token,
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });

        return new sCResult(response.status, response.message, response.body);
    }

    /**
     * Resets the currently active token for the given filename with a new one.
     * @param {string} filename The name of the file, where the token should be reset.
     * @returns {sCResult} Returns the new token in the body.
     */
    async resetToken(filename) {
        var response = await axios({
            url: Config.API_ENDPOINT,
            method: "PUT",
            headers: {
                appid: this.appid,
                appsecret: this.appsecret,
                authtoken: this.auth_token,
            },
            data: {
                function: "reset_token",
                filename: filename,
            },
        });

        return new sCResult(response.status, response.message, response.body);
    }

    /**
     * Deletes the file with the given name.
     * @param {string} filename The name of the file, where the token should be reset.
     * @returns {sCResult} Returns the new token in the body.
     */
    async delete(filename) {
        if (filename == "") {
            return sCResult(400, "Please provide a valid filename");
        }
        if (this.auth_token) {
            return sCResult(403, "Please provide an auth token before you do this request.");
        }
        var response = await axios({
            url: Config.API_ENDPOINT,
            method: "DELETE",
            headers: {
                appid: this.appid,
                appsecret: this.appsecret,
                authtoken: this.auth_token,
            },
            data: {
                filename: filename,
            },
        });

        return new sCResult(response.status, response.message, response.body);
    }
}

class sCResult {
    constructor(status_code, message, body) {
        this.status_code = status_code;
        this.message = message;
        this.data = body;
    }

    get isOK() {
        return this.status_code >= 200 && this.status_code <= 299
            ? true
            : false;
    }
}

export { sCFiles, sCResult };
