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
  const requestOptions = {
    body: requestBody,
    headers: options.headers,
    method: parseMethod(options.method),
    url: "https://" + options.host + ":" + options.port + options.path,
  };
  return new Promise(function (resolve, reject) {
    try {
      resolve(https.request(requestOptions));
    } catch (e) {
      reject(e);
    }
  });
}
