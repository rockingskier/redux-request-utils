import { normalize } from 'normalizr';
import HttpError from 'standard-http-error';


export default function requestBuilder(url, requestOpts = {}, { handleResponse = false, normalizeSchema = false, handleError = false } = {}) {
  return (...args) => {

    const callUrl = typeof url === 'function' ? url(payload, meta) : url;
    const callOpts = {
      ...requestOpts,
    };

    if (typeof callOpts.body === 'function') {
      callOpts.body = callOpts.body(...args);
    }
    if (typeof callOpts.body !== 'undefined' && typeof callOpts.body !== 'string') {
      callOpts.body = JSON.stringify(callOpts.body);
    }

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
      .then((response) => handleResponse ? handleResponse(response, ...args) : response.json())
      .then((data) => normalizeSchema ? normalize(data, normalizeSchema) : data)
      .catch(handleError ? (err) => handleError(err, ...args) : (err) => { throw err; });
  };
}
