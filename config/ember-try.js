/* jshint node:true */
module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.x',
      dependencies: {
        'ember': '~1.13.8',
        'ember-data': '~1.13.9'
      }
    },
    {
      name: 'ember-2.x',
      dependencies: {
        'ember': '~2.0',
        'ember-data': 'canary'
      }
    }
  ]
};
