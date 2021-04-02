export interface I_ApplyProductParams {
  pro_id: number;
  role_id: number | undefined;
  apply_desc: string
}

export interface I_ApplyProductData extends I_ApplyProductParams {
  product_name: string;
}