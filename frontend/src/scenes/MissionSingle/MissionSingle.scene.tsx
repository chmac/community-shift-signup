import React from "react";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo";

import { Mission } from "../../types";
import RoleNew from "./scenes/RoleNew/RoleNew.scene";
import ShiftNew from "./scenes/ShiftNew/ShiftNew.scene";

const MissionSingleQuery = gql`
  query MissionSingleQuery($id: uuid!) {
    missions_by_pk(id: $id) {
      id
      user_id
      name
      slug
      description_md
      roles {
        id
        name
        description_md
        shifts {
          id
          start_date
          start_time
          end_date
          end_time
          count
        }
      }
    }
  }
`;

const MissionSingle: React.FC<Props> = props => {
  const { data, error, loading, refetch } = useQuery<{
    missions_by_pk?: Mission;
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
      {mission.roles &&
        mission.roles.map(role => {
          return (
            <div key={role.id}>
              <h2>{role.name}</h2>
              <p>{role.description_md}</p>
              <h3>Shifts</h3>
              {role.shifts &&
                role.shifts.map(shift => {
                  return Array.from(Array(shift.count)).map((_, index) => {
                    return (
                      <div key={`${shift.id}_${index}`}>
                        Start: {shift.start_date} / {shift.start_time}
                        End: {shift.end_date} / {shift.end_time}
                      </div>
                    );
                  });
                })}
            </div>
          );
        })}
      <RoleNew
        missionId={mission.id}
        onSubmit={() => {
          refetch();
        }}
      />
      <ShiftNew
        roles={mission.roles}
        onSubmit={() => {
          refetch();
        }}
      />
      <div></div>
    </div>
  );
};

interface RouteParams {
  id: string;
}

type Props = RouteComponentProps<RouteParams>;

export default MissionSingle;
