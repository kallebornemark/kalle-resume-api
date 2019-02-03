'use strict'

const Introduction = use('App/Models/Introduction')

class IntroductionController {
  async index ({response}) {
    const introductions = await Introduction.all()
    return response.json(introductions)
  }

  async create ({request, response}) {
    const payload = request.only(['title', 'body'])
    console.log(payload)
    await Introduction.create(payload)
    return response.status(201).send()
  }

  async show ({params, response}) {
    const introduction = await Introduction.find(params.id)
    return response.json(introduction)
  }

  async update ({params, request, response}) {
    const { title, body } = request.only(['title', 'body'])

    let introduction = await Introduction.find(params.id)
    if (!introduction) {
      return response.status(404).json({data: 'Resouce not found'})
    }

    introduction.title = title
    introduction.body = body
    await introduction.save()

    return response.status(200).json(introduction)
  }
}

module.exports = IntroductionController
