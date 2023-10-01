'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  action: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.node]),
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.bool,
  actionStyle: _propTypes2.default.object,
  titleStyle: _propTypes2.default.object,
  barStyle: _propTypes2.default.object,
  activeBarStyle: _propTypes2.default.object,
  dismissAfter: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  onDismiss: _propTypes2.default.func,
  className: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  isActive: _propTypes2.default.bool,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
};