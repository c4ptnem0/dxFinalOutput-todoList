import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query {
    tasks {
      id
      task_content
      task_title
    }
  }
`;

const ExampleComponent = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.tasks.map((item) => (
        <div key={item.column1}>
          <p>
            ID: {item.id}
            <br></br>
            <p>{item.task_title}</p>
            CONTENT:{item.task_content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;
