'use strict'

class Calculator {
  get rules () {
    return {
      source: 'required|string|min:3',
      destiny: 'required|string|min:3',
      plan_id: 'required|number',
      time: 'required|min:1'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      string: '{{ field }} is not a valid string',
      number: '{{ field }} is not a valid number',
      min: "Field {{ field }} must contain at least {{ argument.0 }} character(s)"
    }
  }

  get validateAll() {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).json({
      description: errorMessages[0].message,
      error: true
    })
  }
}

module.exports = Calculator
