import * as Config from "./config";
import axios from "axios";

export class sCStorage {
  constructor(app_id, app_secret) {
    this.appid = app_id;
    this.appsecret = app_secret;
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
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      axios.get(Config.API_ENDPOINT + "?bucket=" + global_this.bucket_id + "&dataset=" + global_this.dataset + "&container=" + container_name, {
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret
        }
      }).then(function(result){
        if(result.status === 200){
          var result = new sCResult(result.data.status, result.data.message, result.data.body);
          resolve(result);
        } else {
          reject(new Error("There was a problem with the API endpoint."));
        }
      });
    });
  }
}

/*
Result object for filtering the
*/
export class sCResult{
  constructor(status_code, message, body){
    this.status_code = status_code;
    this.message = message;
    this.data = body;
  }

  get isOK(){
    return this.status_code >= 200 && this.status_code <= 299 ? true : false;
  }
}
