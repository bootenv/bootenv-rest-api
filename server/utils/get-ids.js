/**
 * Returns a list of ids from a list of models.
 *
 * @param {Array} list The list of models
 * @returns {Array} An array of ids.
 */
export function getIds(list) {
  return list.map(item => item.id);
}

/**
 * Adds a list of ids of a related model to a result object.
 *
 * @param {Array|Object} result The result object or an array of result objects.
 * @param {String} resultProperty The property that will be added to the result object with the list of ids.
 * @param {Object} relatedModel The related model class.
 * @param {String} relatedModelProperty The related model property that references the results object id.
 * @returns {Promise} A promise that will resolve to false if the ids are loaded
 *          so that it can be used with <code>.then(next).catch(error)</code>.
 */
export function loadIds(result, resultProperty, relatedModel, relatedModelProperty) {
  if (!result) {
    // Object was deleted
    return Promise.resolve();
  }

  if (Array.isArray(result)) {
    return Promise
      .all(result.map(item => loadIds(item, resultProperty, relatedModel, relatedModelProperty)))
      .then(() => false);
  }

  if (typeof result !== 'object') {
    return Promise.resolve(result);
  }

  let query = { where: {} };

  query.where[relatedModelProperty] = result.id;

  return relatedModel.find(query)
    .then(getIds)
    .then(ids => result[resultProperty] = ids)
    .then(() => false);
}

