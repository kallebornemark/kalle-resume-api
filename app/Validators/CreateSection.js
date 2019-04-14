class CreateSection {
  get rules() {
    return {
      name: 'required|string',
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
}

module.exports = CreateSection;
