/**
 *
 */

// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['@babel/preset-stage-0',{ decoratorsLegacy: true }],    
  ],
  ignore: [ "/node_modules/"],
  "plugins": [
    // "transform-async-to-generator"
    // "async-to-promises"
    // "syntax-async-functions","transform-regenerator"
    // "transform-decorators-legacy", "transform-decorators"
  ] 
};
