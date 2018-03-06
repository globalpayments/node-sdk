function parseMethod(method) {
  switch (method.toUpperCase()) {
    case "GET":
      return https.Method.GET;
    case "POST":
      return https.Method.POST;
    case "PUT":
      return https.Method.PUT;
    case "DELETE":
      return https.Method.DELETE;
    default:
      return "";
  }
}

export function request(requestBody, options) {
  var requestOptions = {
    body: requestBody,
    headers: options.headers,
    method: parseMethod(options.method),
    url: "https://" + options.host + ":" + options.port + options.path,
  };
  return new Promise(function(resolve, reject) {
    try {
      var response = https.request(requestOptions);

      if (response.code !== 200) {
        reject(
          new Error("Unexpected HTTP status code [" + response.code + "]")
        );
      }

      resolve(response.body);
    } catch (e) {
      reject(e);
    }
  });
}
