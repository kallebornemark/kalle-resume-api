'use strict'

class CreateIntroduction {
  get rules() {
    return {
      title: 'required|string',
      body: 'string'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = CreateIntroduction
