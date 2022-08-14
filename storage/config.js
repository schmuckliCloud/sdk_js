var API_ENDPOINT = "https://api.schmuckli.cloud/client_api/v1/data/";

var updateAPIEndpoint = function (new_api_point) {
    API_ENDPOINT = new_api_point;
};
export default {
    API_ENDPOINT,
    updateAPIEndpoint
};