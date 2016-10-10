import HttpError from 'standard-http-error';


const methodsWithBodies = ['POST', 'PUT', 'PATCH'];


export function requestBuilder(url, requestOpts = {}, { handleResponse = false, handleSuccess = false, handleError = false } = {}) {
  return (payload, meta = {}) => {
    // Build the URL
    const callUrl = typeof url === 'function' ? url(payload, meta) : url;

    // Options to pass to the `fetch` request
    const callOpts = {
      ...requestOpts,
    };

    // Headers
    let headers = {};
    if (meta.authToken) {
      headers['Authorization'] = `Bearer ${meta.authToken}`;
    }
    if (typeof callOpts.headers === 'function') {
      headers = callOpts.headers(headers, payload, meta);
    }
    if (headers.Authorization) {
      headers['Access-Control-Allow-Credentials'] = true;
      callOpts.credentials = 'include';
    }

    // Body
    let body = methodsWithBodies.includes(requestOpts.method) ? payload : undefined;
    if (typeof callOpts.body === 'function') {
      body = callOpts.body(body, meta);
    }
    if (typeof body !== 'undefined' && typeof body !== 'string') {
      body = JSON.stringify(body);
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    }

    callOpts.headers = headers;
    callOpts.body = body;

    return fetch(callUrl, callOpts)
      .then((response) => {
        switch (response.status) {
          case 200:
          case 201:
            return response;  // Keep going!
          default:
            throw new HttpError(response.status, { response });
        }
      })
      .then((response) => handleResponse ? handleResponse(response, payload, meta) : response.json())
      .then((data) => handleSuccess ? handleSuccess(data, payload, meta) : data)
      .catch(handleError ? (err) => handleError(err, payload, meta) : (err) => { throw err; });
  };
}
