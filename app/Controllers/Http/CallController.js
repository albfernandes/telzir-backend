'use strict'
const Call = use('App/Models/Call');

class CallController {

  async index ({ request, response }) {
    try{
      const calls = await Call.all();
      return response.status(200).json(calls);
    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at call rules index",
        error: true,
      });
    }
  }

  async store ({ request, response }) {
    try{
      const data = request.only(['source', 'destiny', 'price']);
      const call = await Call.create(data)
      return response.status(201).json(call);
    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at call creation",
        error: true,
      });
    }
  }

  async show ({ params, request, response }) {
    try{
      const call = await Call.find(params.id);

      if (!call) {
        return response.status(400).json({
          description: 'Call not found',
          error: true
        });
      }
      return response.status(200).json(call);

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at showing call",
        error: true,
      });
    }
  }

  async update ({ params, request, response }) {
    try{
      const call = await Call.find(params.id);

      if (!call) {
        return response.status(400).json({
          description: 'Call not found',
          error: true
        });
      }

      const data = request.only(['source', 'destiny', 'price']);
      await call.merge(data);
      await call.save()
      return response.status(200).json(call);

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at call update",
        error: true,
      });
    }
  }

  async destroy ({ params, request, response }) {
    try{
      const call = await Call.find(params.id);

      if (!call) {
        return response.status(400).json({
          description: 'Call not found',
          error: true
        });
      }

      await call.delete();
      return response.status(200).json({msg: 'call deleted'});

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at deleting call",
        error: true,
      });
    }
  }

}

module.exports = CallController
