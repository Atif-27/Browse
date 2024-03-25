const asyncWrapper = (passedFunction) => {
  return async (req, res, next) => {
    try {
      passedFunction(req, res, next);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

export default asyncWrapper;
