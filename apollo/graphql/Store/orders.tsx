import { gql } from "@apollo/client";

const ORDER_FRAGMENT = gql`
  fragment OrderDetail on Order {
    id
    products {
      name
      url
      price {
        mrp
      }
      quantity
      totalAmount
    }
    state {
      order {
        accepted
        date
      }
      created {
        date
      }
      delivery {
        toDeliver
        address {
          line
        }
        deliverBy
        delivered
        deliveredAt
      }
      payment {
        paid
        grandAmount
        paidAt
      }
      cancelled
    }
  }
`;

export const GET_ORDER = gql`
  query getOrder($id: String) {
    getOrder(id: $id) {
      ...OrderDetail
    }
  }
`;

export const GET_ORDERS = gql`
  ${ORDER_FRAGMENT}
  query GetOrders {
    getOrders {
      ...OrderDetail
    }
  }
`;

export const CREATE_ORDER = gql`
  ${ORDER_FRAGMENT}
  mutation createOrder($orderInfo: OrderInfo) {
    createOrder(orderInfo: $orderInfo) {
      ...OrderDetail
    }
  }
`;

export const ACCEPT_ORDER = gql`
  mutation acceptOrder($id: String!, $accepted: Boolean!, $products: [String]) {
    acceptOrder(id: $id, accepted: $accepted, products: $products)
  }
`;

export const DELIVERED_ORDER = gql`
  mutation deliveredOrder($id: String!, $coordinates: [String]!) {
    deliveredOrder(id: $id, coordinates: $coordinates)
  }
`;
