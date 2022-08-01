/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')
const checkPermissions = require('feathers-permissions');

const { Forbidden } = require('@feathersjs/errors')

module.exports = function addFilterByCurrentUser(options = {roles: []}) {
  return async (context) => {
    try {
      const { app, data, params } = context

      params.query.createdBy = params.user.id

    } catch (e) {}

    return context
  }
}
