'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sagasBuilder = sagasBuilder;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var defaultOptions = {
  throwErrors: false
};
function sagasBuilder(request, REQUEST, actions) {
  var _marked = [makeRequest, watchForRequest].map(regeneratorRuntime.mark);

  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var _defaultOptions$optio = _extends({}, defaultOptions, options);

  var throwErrors = _defaultOptions$optio.throwErrors;


  function makeRequest(_ref) {
    var payload = _ref.payload;
    var meta = _ref.meta;
    var data, error;
    return regeneratorRuntime.wrap(function makeRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = void 0;
            error = void 0;
            _context.prev = 2;
            _context.next = 5;
            return (0, _effects.put)(actions.pending(payload, meta));

          case 5:
            _context.next = 7;
            return (0, _effects.call)(request, payload, meta);

          case 7:
            data = _context.sent;
            _context.next = 10;
            return (0, _effects.put)(actions.success(data, meta));

          case 10:
            _context.next = 19;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);

            error = _context.t0;
            _context.next = 17;
            return (0, _effects.put)(actions.failure(error, meta));

          case 17:
            if (!throwErrors) {
              _context.next = 19;
              break;
            }

            throw error;

          case 19:
            return _context.abrupt('return', {
              data: data,
              error: error
            });

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[2, 12]]);
  }

  function watchForRequest() {
    return regeneratorRuntime.wrap(function watchForRequest$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _reduxSaga.takeEvery)(REQUEST, makeRequest);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  return {
    makeRequest: makeRequest,
    watchForRequest: watchForRequest
  };
}
//# sourceMappingURL=sagasBuilder.js.map