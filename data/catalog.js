import catalog from "./data.json";

// Keep the UI shape used by the existing product and category components while
// using the catalog's stable identifiers for filtering.
export const categories = catalog.categories.map((category) => ({
  ...category,
  cid: String(category.cid),
}));

export const products = catalog.products.map((product) => ({
  ...product,
  categoryId: String(product.category_id),
  idMeal: product.id,
  strMeal: product.title,
  strMealThumb: product.image_link,
  strInstructions: product.description,
}));

export const productsForCategory = (categoryId) =>
  products.filter((product) => product.categoryId === String(categoryId));
