function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));

    _this.onChange = function (e) {
      var onChange = _this.props.onChange;
      onChange(e, e.target.value);
    };

    _this.saveInput = _this.saveInput.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Input, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
    /**
     * 保存dom原型
     * @param {*} dom 
     */

  }, {
    key: "saveInput",
    value: function saveInput(dom) {
      this.input = dom;
    }
  }, {
    key: "getInputElement",

    /**
     * 获取input
     * @param {*} className 
     */
    value: function getInputElement() {
      var _this$props = this.props,
          value = _this$props.value,
          prefix = _this$props.prefix;
      var preFixclassName = classnames({
        "ran-input-pre": prefix ? true : false
      });
      var warpperClassName = classnames({
        "ran-input": true,
        "ran-input-warpper": prefix ? false : true,
        "ran-input-pre-warpper": prefix ? true : false
      });
      return React.createElement("span", {
        className: warpperClassName
      }, React.createElement("span", {
        className: preFixclassName
      }, prefix), React.createElement("input", {
        ref: this.saveInput,
        onChange: this.onChange,
        value: value
      }));
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var label = this.props.label;
      return label ? React.createElement("span", null, label) : null;
    }
  }, {
    key: "renderInput",
    value: function renderInput(labelElement, inputElement) {
      return React.createElement("div", null, labelElement, inputElement);
    }
  }, {
    key: "render",
    value: function render() {
      var label = this.props.label;
      return this.renderInput(this.renderLabel(), this.getInputElement());
    }
  }]);

  return Input;
}(React.Component);

Input.propTypes = {
  /**
   * 传入到组件的值
   */
  value: PropTypes.any.isRequired,

  /**
   * 获取组件内部值变化的事件
   */
  onChange: PropTypes.func,

  /**
   * 输入框名称
   */
  label: PropTypes.string,

  /**
   * 输入框前缀
   */
  prefix: PropTypes.node
};
Input.defaultProps = {
  value: '',
  onChange: function onChange() {},
  label: null,
  prefix: null
};
export { Input as default };