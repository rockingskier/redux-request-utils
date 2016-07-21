'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sagasBuilder;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function sagasBuilder(request, REQUEST, actions) {
  var _marked = [makeRequest, watchForRequest].map(regeneratorRuntime.mark);

  function makeRequest(_ref) {
    var type = _ref.type;
    var payload = _ref.payload;
    var data;
    return regeneratorRuntime.wrap(function makeRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _effects.put)(actions.pending());

          case 3:
            _context.next = 5;
            return (0, _effects.call)(request, payload);

          case 5:
            data = _context.sent;
            _context.next = 8;
            return (0, _effects.put)(actions.success(data));

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            _context.next = 14;
            return (0, _effects.put)(actions.failure(_context.t0));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this, [[0, 10]]);
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