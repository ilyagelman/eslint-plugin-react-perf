'use strict'

var invalidFunctionExpressions = [
  {code: '<Item prop={function(){return true}} />', line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      line,
      column,
      type: 'FunctionExpression'
    }]
  }
})

var invalidNewExpressions = [
  {code: "<Item prop={new Function('a', 'alert(a)')}/>", line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      line,
      column,
      type: 'NewExpression'
    }]
  }
})

module.exports = require('../utils/common').testRule(
  '../../../lib/rules/jsx-no-new-function-as-prop',
  'jsx-no-new-function-as-prop',
  'JSX attribute values should not contain functions created in the same scope',
  'function(){}',
  'FunctionExpression',
  [].concat(
    invalidFunctionExpressions,
    invalidNewExpressions))
