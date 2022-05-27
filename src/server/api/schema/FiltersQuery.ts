import Joi from "joi";

const FiltersQuery = Joi.object().keys({
  table: Joi.string().required(),
  filters: Joi.array()
    .items(
      Joi.object()
        .keys({
          key: Joi.string().required(),
          values: Joi.array().required(),
        })
        .optional()
    )
    .optional(),
  orderBy: Joi.object()
    .keys({
      key: Joi.string().required(),
      order: Joi.string().valid("desc", "asc").required(),
    })
    .optional(),
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
});

export default FiltersQuery;
