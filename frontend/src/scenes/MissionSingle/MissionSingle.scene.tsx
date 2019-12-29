import React from "react";
import { RouteComponentProps } from "react-router-dom";

const MissionSingle = (props: Props) => {
  return <div>MissionSingle {props.match.params.id}</div>;
};

interface RouteParams {
  id: string;
}

type Props = RouteComponentProps<RouteParams>;

export default MissionSingle;
