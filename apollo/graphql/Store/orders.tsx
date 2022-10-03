import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query getOrder($id: String) {
    getOrder(id: $id) {
      id
      products {
        name
        url
        quantity
        totalAmount
      }
      state {
        order {
          accepted
        }
        delivery {
          delivered
          address {
            line
            location {
              coordinates
            }
          }
          deliverBy
        }
        cancelled
        payment {
          paid
          grandAmount
        }
        created {
          date
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query FetchOrders($limit: Int!, $offset: Int!) {
    getOrders(limit: $limit, offset: $offset) {
      id
      products {
        name
        url
        quantity
        totalAmount
      }
      state {
        order {
          accepted
        }
        delivery {
          delivered
          address {
            line
            location {
              coordinates
            }
          }
          deliverBy
        }
        cancelled
        payment {
          paid
          grandAmount
        }
        created {
          date
        }
      }
    }
  }
`;

export const GET_NEW_ORDER = gql`
  subscription Subscription($id: String!) {
    orderUpdate(id: $id) {
      id
      products {
        name
        url
        quantity
        totalAmount
      }
      state {
        order {
          accepted
        }
        delivery {
          delivered
          address {
            line
            location {
              coordinates
            }
          }
          deliverBy
        }
        cancelled
        payment {
          paid
          grandAmount
        }
        created {
          date
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($orderInfo: OrderInfo) {
    createOrder(orderInfo: $orderInfo) {
      id
      products {
        name
        url
        quantity
        totalAmount
      }
      state {
        order {
          accepted
        }
        delivery {
          delivered
          address {
            line
            location {
              coordinates
            }
          }
          deliverBy
        }
        cancelled
        payment {
          paid
          grandAmount
        }
        created {
          date
        }
      }
    }
  }
`;

export const ACCEPT_ORDER = gql`
  mutation alterOrderState($id: String!, $accepted: Boolean!) {
    alterOrderState(id: $id, accepted: $accepted)
  }
`;

export const DELIVERED_ORDER = gql`
  mutation deliveredOrder($id: String!, $coordinates: [String]!) {
    deliveredOrder(id: $id, coordinates: $coordinates)
  }
`;
