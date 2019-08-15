import axios from "axios";

export class sCStorage {
  constructor(api_key, api_secret) {
    this.api_key = api_key;
    this.api_secret = api_secret;
  }

  get credentials() {
    return this.api_key + " - " + this.api_secret;
  }
}
