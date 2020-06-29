'use strict'
const Plan = use('App/Models/Plan')
const Call = use('App/Models/Call');

class CalculatorController {

  async calculate ({ request, response }) {
    try{
      const { source, destiny, time, plan_id } = request.post();

      const calls = await Call.query()
        .where('source', source)
        .andWhere('destiny', destiny)
        .fetch();

      if(calls.rows < 1){
        return response.status(400).json({
          description: "Invalid relationship between origin and destination",
          error: true,
        });
      }

      const call = calls.rows[0].$attributes;

      const plan = await Plan.find(plan_id);

      if(!plan){
        return response.status(400).json({
          description: "Plan not found",
          error: true,
        });
      }

      const exceed_tax = process.env.EXCEED_TAX ? parseFloat(process.env.EXCEED_TAX) : 1.1;
      let price_without_plan = call.price * time;
      let price_with_plan = time > plan.free_minutes ? call.price * ( time - plan.free_minutes ) * exceed_tax : 0;

      price_with_plan = parseFloat(price_with_plan.toFixed(2));
      price_without_plan = parseFloat(price_without_plan.toFixed(2));

      return response.status(200).json({
        price_without_plan,
        price_with_plan
      });

    }catch (err) {
      console.error(err);
      return response.status(500).json({
        description: "Error at pricing simulation",
        error: true,
      });
    }
  }
}

module.exports = CalculatorController
