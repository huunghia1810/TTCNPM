/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')

module.exports = function menuPrepareData(options = {roles: []}) {
  return async (context) => {
    try {
      const { app, data, params: { user } } = context
      if(!_.isUndefined(data.configs)) {
        if(typeof data.configs === 'object' && data.configs !== null) {
          data.configs = JSON.stringify(data.configs);
        }
      }
    } catch (e) {}

    return context
  }
}
