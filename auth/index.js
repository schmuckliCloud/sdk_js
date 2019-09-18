import * as Config from "./config";
import axios from "axios";

export class sCAuth {
  /**
  Opens a new schmuckliCloud authentication instance. It can be used to manage then all the data in a defined project.
  @param {String} app_id The APP ID, which was created for a client app in the schmuckliCloud console.
  @param {String} app_secret The APP Secret, which was created for a client app in the schmuckliCloud console.
  */
  constructor(app_id, app_secret) {
    this.appid = app_id;
    this.appsecret = app_secret;
  }

  //TODO Implement the functions
}

/*
Result object for filtering the
*/
export class sCResult {
  constructor(status_code, message, body) {
    this.status_code = status_code;
    this.message = message;
    this.data = body;
  }

  get isOK() {
    return this.status_code >= 200 && this.status_code <= 299 ? true : false;
  }
}
