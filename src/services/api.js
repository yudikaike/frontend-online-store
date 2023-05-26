export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return categories.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return products.json();
}

export async function getProductById(productId) {
  const product = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  return product.json();
}
