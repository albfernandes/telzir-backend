'use strict'
const Plan = use('App/Models/Plan')

class PlanController {

  async index ({ request, response }) {
    try{
      const plans = await Plan.all();
      return response.status(200).json(plans);
    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at plans index",
        error: true,
      });
    }
  }

  async store ({ request, response }) {
    try{
      const data = request.only(['name', 'free_minutes']);
      const plan = await Plan.create(data)
      return response.status(201).json(plan);
    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at plan creation",
        error: true,
      });
    }
  }

  async show ({ params, request, response }) {
    try{
      const plan = await Plan.find(params.id);

      if (!plan) {
        return response.status(400).json({
          description: 'Plan not found',
          error: true
        });
      }
      return response.status(200).json(plan);

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
      const plan = await Plan.find(params.id);

      if (!plan) {
        return response.status(400).json({
          description: 'Call not found',
          error: true
        });
      }

      const data = request.only(['name', 'free_minutes']);
      await plan.merge(data);
      await plan.save()
      return response.status(200).json(plan);

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at plan update",
        error: true,
      });
    }
  }

  async destroy ({ params, request, response }) {
    try{
      const plan = await Plan.find(params.id);

      if (!plan) {
        return response.status(400).json({
          description: 'Plan not found',
          error: true
        });
      }

      await plan.delete();
      return response.status(200).json({msg: 'Plan deleted'});

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at deleting plan",
        error: true,
      });
    }
  }
}

module.exports = PlanController
