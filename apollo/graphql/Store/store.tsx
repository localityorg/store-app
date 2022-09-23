import { gql } from "@apollo/client";

const STORE_FRAGMENT = gql`
  fragment StoreDetail on Store {
    id
  }
`;

export const GET_STORE = gql`
  query GetStore {
    getStore {
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
  }
`;

export const GET_STORE_ACCOUNTS = gql`
  query GetStoreAccounts {
    getStore {
      accounts {
        id
        name
        lastUpdated
        closed
        order {
          orderId
          date
          paid
          amount
        }
        pending {
          status
          amount
        }
      }
    }
  }
`;

export const EDIT_STORE = gql`
  mutation Mutation($edit: Boolean!, $storeInfo: StoreInfo) {
    editStore(edit: $edit, storeInfo: $storeInfo) {
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
  }
`;
export const STORE_UPDATE = gql`
  subscription StoreUpdate($id: String!) {
    storeUpdate(id: $id) {
      id
      name
      contact {
        ISD
        number
      }
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
  }
`;

{
  /*
name
contact{
    ISD
    number
}
address{
    line1
    location{
        coordinates
    }
}
*/
}
