class ExpressError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stacks = ""
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.stacks = stacks;
    this.success = false;

    if (stack) {
      this.stacks = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ExpressError;
