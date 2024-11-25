
export interface ProductVariant {
  product_name: string;
  sku: string;
  color: string;
  size: string;
  imgurl?: string;
  quantity?: number;
  product_t_id?: number;
  previewimage?:string;
  price?: number;
  no?: number;
}

export interface RealProduct {
  no?: number;
  product_name: string;
  sku: string;
  description?: string;
  color: string;
  size: string;
  imgurl: string;
  quantity: number;
  product_t_id: number;
  price: number;
  previewimage?: string;
}

export interface ProductType {
  productype: string;
  sku: string;
  colors: string[];
  size: string[];
  description?: string;
}


export class Product {
  product_name: string;
  productype: string;
  sku: string;
  color: string;
  size: string;
  imgurl?: string;
  quantity?: number;
  product_t_id?: number;
  price?: number;

  constructor(
    product_name: string,
    productype: string,
    sku: string,
    color: string,
    size: string,
    imgurl?: string,
    quantity?: number,
    product_t_id?: number,
    price?: number
  ) {
    this.product_name = product_name;
    this.productype = productype;
    this.sku = sku;
    this.color = color;
    this.size = size;
    this.imgurl = imgurl;
    this.quantity = quantity;
    this.product_t_id = product_t_id;
    this.price = price;
  }
}
