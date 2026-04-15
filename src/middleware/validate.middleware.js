import ApiError from "../utils/ApiError.js";

const validate = (DtoClass) => {
  return (req, res, next) => {
    const { errors, value } = DtoClass.validate(req.body);

    if (errors) {
      return ApiError.badRequestError(res, errors.join("; "));
    }

    req.body = value;
    next();
  };
};

export default validate;
