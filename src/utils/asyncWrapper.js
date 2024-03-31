const asyncWrapper = (passedFunction) => {
  return async (req, res, next) => {
    try {
      await passedFunction(req, res, next);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        error.message = key + " already exists";
        error.statusCode = 400;
      }
      next(error);
    }
  };
};

export default asyncWrapper;
