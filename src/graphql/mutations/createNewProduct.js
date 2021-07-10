const createNewProduct = (_, { createNewProductData: { productName } }, { req: { body } }) => {
  console.log(productName);
  console.log(body);
  return { productName: 'YEEEE' };
};

module.exports = { createNewProduct };
