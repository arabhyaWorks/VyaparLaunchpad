
export interface SellerDetails {
    name: string;
    state: string;
    language: string;
    category: string;
  }
  
  export interface ProductDetails {
    title: string;
    pricing: number;
    description: string;
    variations: string;
    images: string[];
  }
  
  export interface UserInfoState {
    language: string;
    sellerDetails: SellerDetails;
    productDetails: ProductDetails;
  }