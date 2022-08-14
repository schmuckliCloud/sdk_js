import * as Config from "./config.js";
import axios from "axios";

/**
 * The sCStorage instance communicates with the storage API.
 */
export class sCStorage {
  /**
   * Opens a new schmuckliCloud storage instance. It can be used to manage then all the data in a defined project.
   * @param {String} app_id The APP ID, which was created for a client app in the schmuckliCloud console.
   * @param {String} app_secret The APP Secret, which was created for a client app in the schmuckliCloud console.
   * @param {String} [service_url] If you want to replace the backend url instead of `https://api.schmuckli.cloud/client_api/v1/data/`, provide here the new path.
   */
  constructor(app_id, app_secret, service_url) {
    this.appid = app_id;
    this.appsecret = app_secret;

    if (service_url) {
      Config.API_ENDPOINT = service_url;
    }
  }

  /**
  Set the dataset, which should be used for the further data operations.
  @param {String} dataset_name The name of the dataset (Do not use the id)
  */
  setDataset(dataset_name) {
    this.dataset = dataset_name;
  }

  /**
   * Binds the authentication token to the storage object, to use the protected dataset, reserved for the user.
   * @param {string} auth_token The authentication session token from the auth library.
   * @param {boolean} [not_reset] By default, it will reset the dataset. If you want to use the authentication dataset, you must provide a empty dataset string.
   */
  setAuthToken(auth_token, not_reset) {
    this.auth_token = auth_token;
    if (not_reset === false || not_reset === undefined) {
      this.dataset = "";
    }
  }

  /**
   * When you plan to use the future requests with a given share password, assign first this password here and call later the requests as usual.
   * @param {string} password The clear password, which should be used.
   */
  setSharePassword(password) {
    this.sharePassword = password;
  }

  /**
  Set the bucket id which later should be used to manage data.
  @param {Number} bucket_id The number of the bucket id
  */
  setBucket(bucket_id) {
    this.bucket_id = bucket_id;
  }

  /**
  This method lets you retrieve all rows from a container.
  @param {String} container_name The container name, created via the schmuckliCloud console
  @param {String|Array|Object} [sorting] Sort the entries ascending ('asc' by default) or descending ('desc').
  @param {Number} [start] Define a start index.
  @param {Number} [limit] Define a maximum of showing results.
  @param {Array} [exclude] Columns, which should be excluded from the results.
  @return {Promise<sCResult>} The function returns you a promise. You can use the 'then' method, to wait for it. Afterwards you get the result.
  */
  getAll(container_name, sorting, start, limit, exclude) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (sorting !== undefined) {
        if (sorting instanceof Array || sorting instanceof Object) {
          sorting = JSON.stringify(sorting);
        }
      } else {
        sorting = "";
      }

      if (start === undefined) {
        start = "";
      }
      if (limit === undefined) {
        limit = "";
      }

      if (exclude !== undefined) {
        exclude = JSON.stringify(exclude);
      } else {
        exclude = JSON.stringify([]);
      }

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            container_name +
            "&order=" +
            sorting +
            "&start=" +
            start +
            "&limit=" +
            limit +
            "&exclude=" +
            exclude +
            "&share_password=" +
            (global_this.sharePassword || ""),
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body
            );
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
  @param {String} [sorting] Sort the entries ascending ('asc' by default) or descending ('desc').
  @param {Number} [start] Define a start index.
  @param {Number} [limit] Define a maximum of showing results.
  @param {Array} [exclude] Columns, which should be excluded from the results.
  @param {String} [filter_connect] Sets the connection between the filters. (Default: OR)
  @return {Promise<sCResult>} The function returns you a promise. You can use the 'then' method, to wait for it.
  */
  get(container_name, filter, sorting, start, limit, exclude, filter_connect) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (filter === undefined || filter == 0) {
        reject(
          new Error(
            "Please define at least one condition. If you want to show all entries, please use the method 'getAll'"
          )
        );
      }

      if (!(filter instanceof Array)) {
        reject(new Error("Please provide an array containing the conditions."));
      }
      var encodedFilter = encodeURI(JSON.stringify(filter));

      if (sorting !== undefined) {
        if (sorting instanceof Array || sorting instanceof Object) {
          sorting = JSON.stringify(sorting);
        }
      } else {
        sorting = "";
      }

      if (start === undefined) {
        start = "";
      }
      if (limit === undefined) {
        limit = "";
      }

      if (filter_connect == undefined) {
        filter_connect = "OR";
      }

      if (exclude !== undefined) {
        exclude = JSON.stringify(exclude);
      } else {
        exclude = JSON.stringify([]);
      }

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            encodeURI(container_name) +
            "&filter=" +
            encodedFilter +
            "&filter_connect=" +
            filter_connect +
            "&order=" +
            sorting +
            "&start=" +
            start +
            "&limit=" +
            limit +
            "&exclude=" +
            exclude +
            "&share_password=" +
            (global_this.sharePassword || ""),
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body
            );
            resolve(result);
          } else {
            reject(
              new Error(
                "There was a problem with the API endpoint. Following error message was sent: " +
                  result.data.message
              )
            );
          }
        });
    });
  }

  /**
     This method returns the amount of data rows with/out filter.
    @param {String} container_name The container name, created via the schmuckliCloud console
    @param {Array} filter A filter is an array, defining which entries should be displayed.
    @param {String} [filter_connect] Sets the connection between the filters. (Default: OR)
    @return {Promise<sCResult>} The function returns you a promise. Get the amount with the `response.data.count` parameter.
    */
  count(container_name, filter, filter_connect) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (!(filter instanceof Array)) {
        reject(new Error("Please provide an array containing the conditions."));
      }
      var encodedFilter = encodeURI(JSON.stringify(filter));

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            encodeURI(container_name) +
            "&filter=" +
            encodedFilter +
            "&filter_connect=" +
            filter_connect +
            "&count=true" +
            "&share_password=" +
            (global_this.sharePassword || ""),
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body
            );
            resolve(result);
          } else {
            reject(
              new Error(
                "There was a problem with the API endpoint. Following error message was sent: " +
                  result.data.message
              )
            );
          }
        });
    });
  }

  /**
     This method returns the SUM of field with/out filter.
    @param {String} container_name The container name, created via the schmuckliCloud console
    @param {Array} filter A filter is an array, defining which entries should be displayed.
    @param {String} field_name The name of the field, which should be used for the result.
    @param {String} [filter_connect] Sets the connection between the filters. (Default: OR)
    @return {Promise<sCResult>} The function returns you a promise. Get the amount with the `response.data.count` parameter.
    */
  sum(container_name, filter, field_name, filter_connect) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (field_name === undefined || field_name === "") {
        reject(new Error("Please define a field name."));
      }

      if (!(filter instanceof Array)) {
        reject(new Error("Please provide an array containing the conditions."));
      }
      var encodedFilter = encodeURI(JSON.stringify(filter));

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            encodeURI(container_name) +
            "&filter=" +
            encodedFilter +
            "&filter_connect=" +
            filter_connect +
            "&sum=" +
            field_name +
            "&share_password=" +
            (global_this.sharePassword || ""),
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body
            );
            resolve(result);
          } else {
            reject(
              new Error(
                "There was a problem with the API endpoint. Following error message was sent: " +
                  result.data.message
              )
            );
          }
        });
    });
  }

  /**
    This method returns the AVG of field with/out filter.
    @param {String} container_name The container name, created via the schmuckliCloud console
    @param {Array} filter A filter is an array, defining which entries should be displayed.
    @param {String} field_name The name of the field, which should be used for the result.
    @param {String} [filter_connect] Sets the connection between the filters. (Default: OR)
    @return {Promise<sCResult>} The function returns you a promise. Get the amount with the `response.data.count` parameter.
    */
  avg(container_name, filter, field_name, filter_connect) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (field_name === undefined || field_name === "") {
        reject(new Error("Please define a field name."));
      }

      if (!(filter instanceof Array)) {
        reject(new Error("Please provide an array containing the conditions."));
      }
      var encodedFilter = encodeURI(JSON.stringify(filter));

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            encodeURI(container_name) +
            "&filter=" +
            encodedFilter +
            "&filter_connect=" +
            filter_connect +
            "&avg=" +
            field_name +
            "&share_password=" +
            (global_this.sharePassword || ""),
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body
            );
            resolve(result);
          } else {
            reject(
              new Error(
                "There was a problem with the API endpoint. Following error message was sent: " +
                  result.data.message
              )
            );
          }
        });
    });
  }

  /**
   * Creates a share link with the containing rows.
   * @param {String} container_name The container name, where the rows are located.
   * @param {Array} rows The row id's, which should be shared via a link.
   * @param {string} [password] Sets a password. Leave blank, if you want don't want to set a password.
   * @param {string} [expire] Sets a expire date. Leave blank, if you want don't want to set a expire date. The link will then be available for an unlimited time.
   * @return {Promise<sCResult>} The function returns you a promise with the result object.
   */
  createShareLink(container_name, rows, password, expire) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (!(rows instanceof Array)) {
        reject(new Error("Please provide an array with row id's."));
      }

      if (password == undefined) {
        password = "";
      }

      if (expire == undefined) {
        expire = "";
      }

      var fRows = rows.join(", ");

      axios({
        url: Config.API_ENDPOINT + "share.php",
        method: "POST",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          bucket: global_this.bucket_id,
          container: encodeURI(container_name),
          rows: fRows,
          password: password,
          expire: expire,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while creating a share link. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Updates an existing share with rows, password and/or expire date.
   * @param {string} container_name The name of the container, where the rows are stored.
   * @param {number} share_id The id of the share, which should be updated.
   * @param {array} new_rows The ids of the new rows, which should be added.
   * @param {array} remove_rows The ids of the existing rows, which should be removed.
   * @param {string} [password] Sets a new password. Leave blank, if you want to keep the current password.
   * @param {string} [expire] Sets a new expire date. Leave blank, if you want to keep the current expire date.
   * @param {string} [custom_link] Sets an alias (custom link) for the share, that it can be accessed via that.
   * @return {Promise<sCResult>} The function returns you a promise with the result object.
   */
  updateShareLink(
    container_name,
    share_id,
    new_rows,
    remove_rows,
    password,
    expire,
    custom_link
  ) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (share_id == undefined || share_id == "") {
        reject(new Error("Please define a share id."));
      }

      if (!(new_rows instanceof Array) || !(remove_rows instanceof Array)) {
        reject(new Error("Please provide an array with row id's."));
      }

      if (password == undefined) {
        password = "";
      }
      if (expire == undefined) {
        expire = "";
      }
      if (custom_link == undefined) {
        custom_link = "";
      }

      var fNewRows = new_rows.join(", ");
      var fRemoveRows = remove_rows.join(", ");

      axios({
        url: Config.API_ENDPOINT + "share.php",
        method: "PUT",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          bucket: global_this.bucket_id,
          container: encodeURI(container_name),
          share_id: share_id,
          new_rows: fNewRows,
          remove_rows: fRemoveRows,
          password: password,
          expire: expire,
          custom_link: custom_link,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while creating a share link. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Returns the already shared links by the currently signed in user.
   * @returns {Promise<sCResult>} The link details.
   */
  getShareLinks() {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      axios({
        url: Config.API_ENDPOINT + "share.php",
        method: "GET",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while fetching the share links. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Deletes an existing share link from the currently signed in account.
   * @param {Number} share_id The id of the share link, which should be deleted.
   * @returns The status of the operation.
   */
  deleteLink(share_id) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (share_id === undefined || share_id === "") {
        reject(new Error("Please define a container."));
      }

      axios({
        url: Config.API_ENDPOINT + "share.php",
        method: "DELETE",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          share_id: share_id,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while deleting the share link. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Retrieve a single rowset by it's id.
   * @param {String} container_name The container name, where the ID is contained.
   * @param {Number} row_id The row id, which can be trieved by get or getAll.
   * @param {Array} exclude Columns, which should be excluded from the results.
   * @return {Promise<sCResult>} The function returns a promise.
   */
  getById(container_name, row_id, exclude) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (exclude !== undefined) {
        exclude = JSON.stringify(exclude);
      } else {
        exclude = JSON.stringify([]);
      }

      axios
        .get(
          Config.API_ENDPOINT +
            "?bucket=" +
            global_this.bucket_id +
            "&dataset=" +
            encodeURI(global_this.dataset) +
            "&container=" +
            encodeURI(container_name) +
            "&row=" +
            row_id +
            "&exclude=" +
            exclude,
          {
            headers: {
              appid: global_this.appid,
              appsecret: global_this.appsecret,
              authtoken: global_this.auth_token,
            },
          }
        )
        .then(function (result) {
          if (result.status === 200) {
            var result = new sCResult(
              result.data.status,
              result.data.message,
              result.data.body === undefined ? {} : result.data.body[0]
            );
            resolve(result);
          } else {
            reject(
              new Error(
                "There was a problem with the API endpoint. Following error message was sent: " +
                  result.data.message
              )
            );
          }
        });
    });
  }

  /**
     This methdod can add new rows to you container in the previous set dataset.
    @param {String} container_name The container name, created via the schmuckliCloud console
    @param {String} data A dataobject with a key-value pair. The key represents the columns defined in the schmuckliCloud console.
    @return {Promise<sCResult>} The function returns you a promise. You can use the 'then' method, to wait for it. Afterwards you get a true (when everything was fine) or an error object.
    */
  insert(container_name, data) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      let final_data = "{}";
      if (data === undefined || data === {}) {
        reject(new Error("Please provide a data object."));
      } else {
        final_data = JSON.stringify(data);
      }

      axios({
        url: Config.API_ENDPOINT,
        method: "POST",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          bucket: global_this.bucket_id,
          dataset: encodeURI(global_this.dataset),
          container: encodeURI(container_name),
          data: final_data,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while inserting data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
     This method updates a specific row in a container
    @param {String} container_name Define a container name, which should be updated.
    @param {Number} row_id Define a row id which should be updated
    @param {Object} data Define the data object in a key-value pair
    @return {Promise<sCResult>} The function returns you a promise. You can use the 'then' method, to wait for it. Afterwards you get a true (when everything was fine) or an error object.
    */
  update(container_name, row_id, data) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (row_id === undefined || isNaN(row_id)) {
        //Check if the value is a number
        reject(
          new Error("Please provide a row id and make sure it is a number.")
        );
      }

      if (data === undefined || data === [] || data === {} || data === "") {
        reject(
          new Error(
            "Please provide a data array, with data which should be updated."
          )
        );
      } else {
        data = JSON.stringify(data);
      }

      axios({
        url: Config.API_ENDPOINT,
        method: "PUT",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          bucket: global_this.bucket_id,
          dataset: encodeURI(global_this.dataset),
          container: encodeURI(container_name),
          row: row_id,
          data: data,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while updating the data. Following error message: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
  This method deletes a specific row in a container or can just delete a column in a specific row.
  @param {String} container_name Define the container name, where the deletion process should take place
  @param {Number} row_id Define a row id, which can be retrieved by the 'get' or 'getAll' method.
  @param {String} column Define a column name, when just this data in this specific column should be deleted.
  @return {Promise<sCResult>} Returns a promise. Once it has finished the deletion process you can fetch the result in the first parameter.
  */
  delete(container_name, row_id, column) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      if (row_id === undefined || isNaN(row_id)) {
        //Check if the value is a number
        reject(
          new Error("Please provide a row id and make sure it is a number.")
        );
      }

      axios({
        url: Config.API_ENDPOINT,
        method: "DELETE",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        data: {
          bucket: global_this.bucket_id,
          dataset: encodeURI(global_this.dataset),
          container: encodeURI(container_name),
          row: row_id,
          col: column,
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while deleting the data. Following error message was received: " +
                data.message
            )
          );
        }
      });
    });
  }

  /**
   * Fetches the metadata of the given container name.
   * @param {String} container_name The container name
   * @return {Promise<sCResult>} A promise with the metadata
   */
  metadata(container_name) {
    var global_this = this;
    return new Promise(function (resolve, reject) {
      //Check the properties before sending to the API
      if (container_name === undefined || container_name === "") {
        reject(new Error("Please define a container."));
      }

      axios({
        url: Config.API_ENDPOINT + "metadata.php",
        method: "GET",
        headers: {
          appid: global_this.appid,
          appsecret: global_this.appsecret,
          authtoken: global_this.auth_token,
        },
        params: {
          bucket: global_this.bucket_id,
          container: encodeURI(container_name),
        },
      }).then(function (response) {
        var data = response.data;
        if (response.status === 200) {
          resolve(new sCResult(data.status, data.message, data.body));
        } else {
          reject(
            new Error(
              "There was an error while getting the metadata. Following error message was received: " +
                data.message
            )
          );
        }
      });
    });
  }
}

/**
Result object of any operation
*/
export class sCResult {
  /**
   * This constructor is used to deliver the data to the business logic of your project.
   * @param {Number} status_code The status codes tells you if the operation was successful.
   * @param {String} message The message describes more information about the operation.
   * @param {String|Object|Array} body The body contains the useable information for your app.
   */
  constructor(status_code, message, body) {
    /**
     * Returns you a three digit number.
     * @type {number}
     * @public
     */
    this.status_code = status_code;

    /**
     * Returns you the message, received from the backend with detailed information about what happend during the operation.
     * @type {string}
     * @public
     */
    this.message = message;

    /**
     * Returns the actual data, if it exists. Check first with `response.data !== undefined`. It is the equal of the received body property from the backend.
     * @type {string}
     * @public
     */
    this.data = body;
  }

  /**
   * Returns true if everything was fine and no further operation has to be done.
   * @return {boolean} True if everything was okay.
   */
  get isOK() {
    return this.status_code >= 200 && this.status_code <= 299 ? true : false;
  }
}
