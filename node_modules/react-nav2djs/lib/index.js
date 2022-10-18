'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nav2d = require('./vendor/nav2d.js');

var _nav2d2 = _interopRequireDefault(_nav2d);

var _ros2d = require('./vendor/ros2d.js');

var _ros2d2 = _interopRequireDefault(_ros2d);

var _roslib = require('roslib');

var _roslib2 = _interopRequireDefault(_roslib);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav2d = function (_Component) {
  _inherits(Nav2d, _Component);

  function Nav2d() {
    _classCallCheck(this, Nav2d);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Nav2d.prototype.componentDidMount = function componentDidMount() {
    var ros = this.props.ros;
    var viewer = new _ros2d2.default.Viewer({
      divID: this.props.id,
      width: this.props.width,
      height: this.props.height
    });
    var nav = _nav2d2.default.OccupancyGridClientNav({
      ros: ros,
      rootObject: viewer.scene,
      viewer: viewer,
      serverName: this.props.serverName
    });
  };

  Nav2d.prototype.render = function render() {
    return _react2.default.createElement('div', { id: this.props.id });
  };

  return Nav2d;
}(_react.Component);

Nav2d.defaultProps = {
  ros: new _roslib2.default.Ros({
    url: 'ws://localhost:9090'
  }),
  id: 'nav2d',
  width: 500,
  height: 500,
  serverName: '/move_base'
};

Nav2d.propTypes = process.env.NODE_ENV !== "production" ? {
  ros: _propTypes2.default.object,
  id: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  serverName: _propTypes2.default.string
} : {};

exports.default = Nav2d;
module.exports = exports['default'];