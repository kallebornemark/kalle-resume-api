'use strict'

const Section = use('App/Models/Section')

class SectionController {
  async index ({response}) {
    const sections = await Section
      .query()
      .with('rows')
      .fetch()
    return response.json(sections)
  }

  async create ({request, response}) {
    const sectionData = request.only(['name'])

    await Section.create(sectionData)
    return response.status(201).send()
  }
}

module.exports = SectionController
