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
    //"transform-decorators-legacy", "transform-decorators"
  ] 
};
