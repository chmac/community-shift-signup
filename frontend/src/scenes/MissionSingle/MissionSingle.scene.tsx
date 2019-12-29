import React from "react";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo";

const MissionSingleQuery = gql`
  query MissionSingleQuery($id: uuid!) {
    missions_by_pk(id: $id) {
      id
      user_id
      name
      slug
      description_md
    }
  }
`;

const MissionSingle = (props: Props) => {
  const { data, error, loading } = useQuery<{
    missions_by_pk?: {
      id: string;
      user_id: string;
      name: string;
      slug: string;
      description_md: string;
    };
  }>(MissionSingleQuery, {
    variables: { id: props.match.params.id }
  });

  if (error) {
    return <div>Error #dYQVlJ: ${error.message}</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (!data?.missions_by_pk) {
    return <div>Not found #q8qJBh</div>;
  }

  const mission = data.missions_by_pk;

  return (
    <div>
      <h1>{mission.name}</h1>
      <p>ID: {mission.id}</p>
      <p>Description: {mission.description_md}</p>
    </div>
  );
};

interface RouteParams {
  id: string;
}

type Props = RouteComponentProps<RouteParams>;

export default MissionSingle;
