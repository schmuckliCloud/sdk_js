export var API_ENDPOINT = "https://api.schmuckli.cloud/client_api/v1/auth/";

var updateAPIEndpoint = function (new_api_point) {
    API_ENDPOINT = new_api_point;
};
export default updateAPIEndpoint;