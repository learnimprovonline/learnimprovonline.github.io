module.exports = function (wallaby) {

  return {
    files: ['src/**/*.js', '!src/**/__tests__/*.js'],

    tests: ['__tests__/**/*.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      "**/*.js?(x)": wallaby.compilers.babel()
    },

    testFramework: 'jest',

    debug: true
  };
};