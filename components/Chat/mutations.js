import { gql } from "@apollo/client";



export const SEND_MESSAGE_BULK = gql`
    mutation SendMessageBulk(
        $messages: [message_insert_input!]!
    ) {
        insert_message(
            objects: $messages
        ) {
            affected_rows
        }
    }
`;


export const CREATE_SUPPLIER_USER = gql`
  mutation CreateSupplerUser(
    $vendorId: String!
    $email: String!
    $user_name: String!
  ) {
    insert_users_one(
      object: { vendorId: $vendorId, email: $email, user_name: $user_name }
      on_conflict: {
        constraint: users_user_name_key
        update_columns: created_at
      }
    ) {
      id
    }
  }
`;

export const INIT_CHAT = gql`
  mutation StartNewChat(
    $email: String!
    $firstName: String!
    $lastName: String!
    $userName: String!
    $reciever_id: uuid!
  ) {
    insert_users_one(
      object: {
        email: $email
        user_name: $userName
        firstName: $firstName
        lastName: $lastName
        chat_users: {
          data: {
            chat: {
              data: {
                owner_id: null
                chat_users: { data: { user_id: $reciever_id } }
              }
            }
          }
        }
      }
      on_conflict: { update_columns: created_at, constraint: users_email_key }
    ) {
      id
      lastName
      last_seen
      firstName
      email
      chats {
        id
        name
        owner_id
        picture
      }
      chat_users {
        chat_id
        user_id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
    mutation MessageBoxMutation(
        $chatId: uuid!
        $content: String!
        $senderId: uuid!
        $quote_request_id: String
    ) {
        insert_message(
            objects: [
                {
                    chat_id: $chatId
                    content: $content
                    sender_id: $senderId
                    quote_request_id: $quote_request_id
                }
            ]
        ) {
            affected_rows
        }
    }
`;
