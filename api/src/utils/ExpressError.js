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

    if (stacks) {
      this.stacks = stacks;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ExpressError;
