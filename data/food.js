export const categoriesFromApi = (payload = {}) =>
  Array.isArray(payload.categories)
    ? payload.categories.map(({ idCategory, strCategory, strCategoryThumb }) => ({
        cid: String(idCategory),
        title: strCategory,
        image_link: strCategoryThumb,
      }))
    : [];

export const mealsFromApi = (payload = {}) =>
  Array.isArray(payload.meals) ? payload.meals : [];
