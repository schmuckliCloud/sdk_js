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

  /**
  This method lets you retrieve all rows from a container.
  @param {String} container_name The container name, created via the schmuckliCloud console
  @param {String} sorting Sort the entries ascending ('asc' by default) or descending ('desc').
  @return {Promise} The function returns you a promise. You can use the 'then' method, to wait for it. Afterwards you get the result.
  */
  getAll(container_name, sorting){
    var global_this = this;
    return new Promise(function(resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if(!sorting) {
        if(sorting !== 'asc' && sorting !== 'desc'){
          console.warning("schmuckliCloud SDK: The sorting is not declared correclty. Please use 'asc' (default) or 'desc' to sort the data.");
        }
      } else {
        sorting = "";
      }

      axios.get(Config.API_ENDPOINT + "?bucket=" + global_this.bucket_id + "&dataset=" + encodeURI(global_this.dataset) + "&container=" + container_name + "&order=" + sorting, {
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

  /**
  This method lets you retrieve data with filters.
  @param {String} container_name The container name, created via the schmuckliCloud console
  @param {Array} filter A filter is an array, defining which entries should be displayed.
  @param {String} sorting Sort the entries ascending ('asc' by default) or descending ('desc').
  @return {Promise} The function returns you a promise. You can use the 'then' method, to wait for it.
  */
  get(container_name, filter, sorting){
    var global_this = this;
    return new Promise(function(resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if(filter === undefined || filter == 0){
        reject(new Error("Please define at least one condition. If you want to show all entries, please use the method 'getAll'"));
      }

      if(!(filter instanceof Array)){
        reject(new Error("Please provide an array containing the conditions."));
      }
      var encodedFilter = encodeURI(JSON.stringify(filter));

      if(!sorting) {
        if(sorting !== 'asc' && sorting !== 'desc'){
          console.warning("schmuckliCloud SDK: The sorting is not declared correclty. Please use 'asc' (default) or 'desc' to sort the data.");
        }
      } else {
        sorting = "";
      }

      axios.get(Config.API_ENDPOINT + "?bucket=" + global_this.bucket_id + "&dataset=" + encodeURI(global_this.dataset) + "&container=" + encodeURI(container_name) + "&filter=" + encodedFilter + "&order=" + sorting, {
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

  /**
  This methdo can add new rows to you container in the previous set dataset.
  @param {String} container_name The container name, created via the schmuckliCloud console
  @param {String} data A dataobject with a key-value pair. The key represents the columns defined in the schmuckliCloud console.
  @return {Promise} The function returns you a promise. You can use the 'then' method, to wait for it. Afterwards you get a true (when everything was fine) or an error object.
  */
  insert(container_name, data) {
    var global_this = this;
    return new Promise(function(resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      //TODO Handle the insert
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
