import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query {
    tasks {
      task_id
      task_content
      task_title
    }
  }
`;

export const GET_TASK_DATA = gql`
  query GetTaskData($task_id: Int!) {
    tasks(where: { task_id: $task_id }) {
      task_id
      task_title
      task_content
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $task_id: Int!
    $task_title: String!
    $task_content: String!
  ) {
    update_tasks(
      where: { task_id: { _eq: $task_id } }
      _set: { task_title: $task_title, task_content: $task_content }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_TASK = gql`
  mutation InsertTask(
    $task_title: String!
    $task_content: String!
    $user_id: uuid!
  ) {
    insert_tasks(
      objects: {
        task_title: $task_title
        task_content: $task_content
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTask($task_id: Int!) {
    delete_tasks(where: { task_id: { _eq: $task_id } }) {
      affected_rows
    }
  }
`;

export const NEW_USER = gql`
  mutation InsertUser($id: uuid!, $username: String!, $password: String!) {
    insert_users(
      objects: { id: $id, username: $username, password: $password }
    ) {
      affected_rows
    }
  }
`;
