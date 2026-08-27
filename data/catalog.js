import catalog from "./data.json";

export const categories = catalog.categories.map((category) => ({
  ...category,
  idCategory: category.cid,
  strCategory: category.title,
  strCategoryThumb: category.image_link,
}));

export const products = catalog.products.map((product) => ({
  ...product,
  idMeal: product.id,
  strMeal: product.title,
  strMealThumb: product.image_link,
  strInstructions: product.description,
}));

export const productsForCategory = (categoryId) => {
  const category = categories.find(({ idCategory }) => idCategory === String(categoryId));
  return category
    ? products.filter(({ category: productCategory }) => productCategory === category.strCategory)
    : [];
};
