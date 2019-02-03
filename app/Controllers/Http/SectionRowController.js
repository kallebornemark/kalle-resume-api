'use strict'

const SectionRow = use('App/Models/SectionRow')

const props = ['category', 'content', 'description', 'timespan', 'linkLabel', 'linkURL', 'hidden', 'section_id']

class SectionRowController {
  async create ({request, response}) {
    const payload = request.only(props)

    await SectionRow.create(payload)
    return response.status(201).send()
  }

  async show ({params, response}) {
    const sectionRow = await SectionRow.find(params.id)
    return response.json(sectionRow)
  }

  async update ({params, request, response}) {
    const payload = request.only(props)

    let row = await SectionRow.find(params.id)
    if (!row) {
      return response.status(404).send()
    }

    row.merge(payload)
    await row.save()

    return response.status(202).json(row)
  }

  async destroy ({params, response}) {
    const sectionRow = await SectionRow.find(params.id)
    await sectionRow.delete()
    return response.status(204).send()
  }
}

module.exports = SectionRowController
