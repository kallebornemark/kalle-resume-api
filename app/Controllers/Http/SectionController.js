const Section = use('App/Models/Section');

const props = ['name'];

class SectionController {
  async index({ response }) {
    const sections = await Section.query()
      .with('rows')
      .fetch();
    return response.json(sections);
  }

  async create({ request, response }) {
    const sectionData = request.only(props);

    const section = await Section.create(sectionData);
    return response.created(section);
  }

  async update({ params: { id }, request, response }) {
    const payload = request.only(props);

    const section = await Section.find(id);
    if (!section) {
      return response.status(404).send();
    }

    section.merge(payload);
    await section.save();

    return response.status(200).json(section);
  }

  async destroy({ params, response }) {
    const sectionRow = await Section.find(params.id);
    await sectionRow.delete();
    return response.status(204).send();
  }
}

module.exports = SectionController;
