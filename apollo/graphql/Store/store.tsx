import { gql } from "@apollo/client";

const STORE_FRAGMENT = gql`
  fragment StoreDetail on Store {
    id
    name
    stat {
      amount
      count
      error
      errorMessage
    }
    meta {
      closed
      verified
    }
    address {
      line
      location {
        coordinates
      }
    }
  }
`;

export const GET_STORE = gql`
  ${STORE_FRAGMENT}
  query GetStore {
    getStore {
      id
      ...StoreDetail
    }
  }
`;

export const GET_STORE_ACCOUNTS = gql`
  ${STORE_FRAGMENT}
  query GetStoreAccounts {
    getStore {
      ...StoreDetail
    }
  }
`;

export const EDIT_STORE = gql`
  ${STORE_FRAGMENT}
  mutation Mutation($edit: Boolean!, $storeInfo: StoreInfo) {
    editStore(edit: $edit, storeInfo: $storeInfo) {
      ...StoreDetail
    }
  }
`;
export const STORE_UPDATE = gql`
  ${STORE_FRAGMENT}
  subscription StoreUpdate($id: String!) {
    storeUpdate(id: $id) {
      ...StoreDetail
    }
  }
`;
