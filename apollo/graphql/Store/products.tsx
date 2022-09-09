import { gql } from "@apollo/client";

const PRODUCT_FRAGMENT = gql`
  fragment ProductDetail on Product {
    id
    brand
    name
    sku {
      id
      url
      name
      quantity {
        count
        type
      }
      price {
        mrp
        discount
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query getProduct($id: String)_ {
    getProduct(id: $id) {
      ...ProductDetail
    }
  }
`;

export const getProducts = gql`
  ${PRODUCT_FRAGMENT}
  query getProducts($name: String) {
    getProducts(name: $name) {
      ...ProductDetail
    }
  }
`;
