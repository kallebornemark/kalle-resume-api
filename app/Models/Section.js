'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
  rows () {
    return this.hasMany('App/Models/SectionRow')
  }
}

module.exports = Section
