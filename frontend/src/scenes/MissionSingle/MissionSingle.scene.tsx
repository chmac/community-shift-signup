import React from "react";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo";
import Markdown from "markdown-to-jsx";

import {
  Paper,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";

import { Mission } from "../../types";
import RoleNew from "./scenes/RoleNew/RoleNew.scene";
import ShiftNew from "./scenes/ShiftNew/ShiftNew.scene";
import ShiftIndex from "./scenes/ShiftIndex/ShiftIndex.scene";

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
          allocations {
            id
            user_id
            profile {
              display_name
            }
          }
        }
      }
    }
  }
`;

const MissionSingle: React.FC<Props> = props => {
  const { classes } = props;

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
      <Paper elevation={1} className={classes.paper}>
        <Markdown>{mission.description_md}</Markdown>
      </Paper>
      {mission.roles &&
        mission.roles.map(role => {
          return (
            <div key={role.id}>
              <Paper elevation={1} className={classes.paper}>
                <h2>{role.name}</h2>
                <Markdown>{role.description_md}</Markdown>
                <ShiftIndex shifts={role.shifts} />
              </Paper>
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

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    card: {
      minWidth: 275
    }
  });

interface RouteParams {
  id: string;
}

type Props = RouteComponentProps<RouteParams> & WithStyles<typeof styles>;

export default withStyles(styles)(MissionSingle);
