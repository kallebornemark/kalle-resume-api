const Section = use('App/Models/Section');

class SectionController {
  async index({ response }) {
    const sections = await Section.query()
      .with('rows')
      .fetch();
    return response.json(sections);
  }

  async create({ request, response }) {
    const sectionData = request.only(['name']);

    const section = await Section.create(sectionData);
    return response.created(section);
  }
}

module.exports = SectionController;
