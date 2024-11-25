

import { Product } from './product.model'; 

describe('Product', () => {
  it('should create an instance', () => {
    const product = new Product(
      'Product Name',
      'Product Type',
      'SKU123',
      'Red',
      'L'
    );
    expect(product).toBeTruthy();
  });
});