import * as Config from "./config";
import axios from "axios";

export class sCStorage {
  #appid="";
  #appsecret="";

  constructor(app_id, app_secret) {
    this.#appid = app_id;
    this.#appsecret = app_secret;
  }

  setDataset(dataset_name){
    this.dataset = dataset_name;
  }

  setBucket(bucket_id){
    this.bucket_id = bucket_id;
  }

  getAll(container_name){
    var global_this = this;
    return new Promise(function(resolve, reject) {
      axios.get(Config.API_ENDPOINT + "?bucket=" + global_this.bucket_id + "&dataset=" + global_this.dataset + "&container=" + container_name, {
        headers: {
          appid: global_this.#appid,
          appsecret: global_this.#appsecret
        }
      }).then(function(result){
        resolve(result);
      })

    });
  }

  get api_endpoint() {
    return Config.API_ENDPOINT;
  }
}
