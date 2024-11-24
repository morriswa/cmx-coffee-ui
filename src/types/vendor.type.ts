
export type VendorApplication = {
  business_name: string,
  business_email: string,
  phone: string,
  address_line_one: string,
  address_line_two?: string,
  city: string,
  zip: string,
  territory: number,
}

export type VendorProduct = {
  product_id?: number,
  product_name?: string,
  description?: string,
  initial_price?: number,
  coffee_bean_characteristics?: any,
}
