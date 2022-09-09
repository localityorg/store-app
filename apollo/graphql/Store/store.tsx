import { gql } from "@apollo/client";

const STORE_FRAGMENT = gql`
  fragment StoreDetail on Store {
    id
    name
    contact {
      ISD
      number
    }
    meta {
      verified
      closed
    }
    address {
      id
      line
      location {
        coordinates
      }
    }
    accounts {
      id
      name
      lastUpdated
      closed
    }
    token
    refreshToken
  }
`;

export const GET_STORE = gql`
  ${STORE_FRAGMENT}
  query getStore {
    getStore {
      ...StoreDetail
    }
  }
`;

export const EDIT_STORE = gql`
  ${STORE_FRAGMENT}
  mutation editStore($id: String, $storeInfo: StoreInfo) {
    editStore(id: $id, storeInfo: $storeInfo) {
      ...StoreDetail
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
