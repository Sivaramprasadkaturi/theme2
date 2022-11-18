import { gql } from "@apollo/client";

export const GET_CHAT = gql`
  query ChatQuery {
    chat {
      id
      messages {
        content
        sender_id
        id
        created_at
        user {
          email
        }
      }
      chat_users {
        user {
          id
          email
          firstName
          lastName
          vendor {
            supplier_vendorId
            brand
          }
        }
      }
    }
  }
`;

export const GET_SUPPORT_AGENTS = gql`
  subscription GetSupportAgents($email: String!) {
    usersSupportAgents: users(where: { isSupportAgent: { _eq: true } }) {
      id
      email
      firstName
      isSupportAgent
      lastName
      vendor {
        brand
        supplier_vendorId
      }
    }
    usersCurrentUser: users(where: { email: { _eq: $email } }) {
      id
      email
      firstName
      isSupportAgent
      lastName
      vendor {
        brand
        supplier_vendorId
      }
    }
  }
`;

export const GET_CHAT_SUBSCRIPTION = gql`
  subscription ChatQuery {
    chat {
      id
      messages {
        content
        sender_id
        id
        created_at
        quote_request_id
        receiver_has_read
        user {
          email
          vendor {
            brand
          }
        }
      }
      chat_users {
        user {
          id
          email
          firstName
          isSupportAgent
          lastName
          vendor {
            brand
            supplier_vendorId
          }
        }
      }
    }
  }
`;

export const SUBSCRIBE_TO_LATEST_MSG = gql`
  subscription Subscribe($chatId: uuid!) {
    message(
      where: { chat: { chat_users: { chat_id: { _eq: $chatId } } } }
      limit: 1
      order_by: { created_at: desc }
    ) {
      content
      sender_id
      id
      created_at
      receiver_has_read
      user {
        email
        vendor {
          brand
        }
      }
      chat {
        id
      }
    }
  }
`;

export const GET_THE_CURRENT_USER = gql`
  query GetTheCurrentUser($email: String!) {
    users(where: { vendorId: { _eq: null }, email: { _eq: $email } }) {
      id
      email
    }
    chat_users {
      user_id
    }
  }
`;

export const GET_RECEIVER_ID = gql`
  query GetReceiverId($vendorId: String!) {
    users(where: { vendorId: { _eq: $vendorId } }) {
      id
      email
      vendor {
        brand
      }
    }
  }
`;

export const GET_UNREAD_MESSAGES = gql`
  subscription GetUnreadMessages($userId: uuid!) {
    chat {
      messages_aggregate(
        where: {
          receiver_has_read: { _eq: false }
          sender_id: { _neq: $userId }
        }
      ) {
        aggregate {
          count
        }
      }
      id
    }
  }
`;

export const GET_USER_ONLINE = gql`
  subscription GetUsersOnline {
    user_online {
      id
      user_name
      #      firstName
      #      lastName
      email
    }
  }
`;

export const GET_MESSAGES_BY_QUOTE_REQUEST = gql`
  query GetMessagesByQuoteRequest($quoteRequestId: String!) {
    message(where: { quote_request_id: { _eq: $quoteRequestId } }) {
      content
      sender_id
      id
      created_at
      quote_request_id
      receiver_has_read
      user {
        email
        id
      }
    }
  }
`;
