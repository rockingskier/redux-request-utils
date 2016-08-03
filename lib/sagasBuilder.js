'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sagasBuilder;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function sagasBuilder(request, REQUEST, actions, _ref) {
  var _marked = [makeRequest, watchForRequest].map(regeneratorRuntime.mark);

  var throwErrors = _ref.throwErrors;

  function makeRequest(_ref2) {
    var payload = _ref2.payload;
    var meta = _ref2.meta;
    var data, error;
    return regeneratorRuntime.wrap(function makeRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('makeRequest', payload, meta);
            data = void 0;
            error = void 0;
            _context.prev = 3;
            _context.next = 6;
            return (0, _effects.put)(actions.pending());

          case 6:
            _context.next = 8;
            return (0, _effects.call)(request, payload, meta);

          case 8:
            data = _context.sent;
            _context.next = 11;
            return (0, _effects.put)(actions.success(data));

          case 11:
            _context.next = 21;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](3);

            console.error(_context.t0);
            error = _context.t0;
            _context.next = 19;
            return (0, _effects.put)(actions.failure(error));

          case 19:
            if (!throwErrors) {
              _context.next = 21;
              break;
            }

            throw error;

          case 21:
            return _context.abrupt('return', {
              data: data,
              error: error
            });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[3, 13]]);
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