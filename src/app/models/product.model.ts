
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
  errors?: string[]; 
}

