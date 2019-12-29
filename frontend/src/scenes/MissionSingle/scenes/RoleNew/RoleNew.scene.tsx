import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { Role } from "../../../../types";
import { Button } from "@material-ui/core";

const RoleNewMutation = gql`
  mutation RoleNewMutation($object: roles_insert_input!) {
    insert_roles(objects: [$object]) {
      returning {
        id
        name
        description_md
      }
    }
  }
`;

const RoleNew: React.FC<Props> = props => {
  const { missionId, onSubmit } = props;

  const [insertRole] = useMutation<{
    insert_roles: {
      returning: Role[];
    };
  }>(RoleNewMutation);

  return (
    <div>
      <h2>New Roles</h2>
      <Formik
        initialValues={{ name: "", description_md: "" }}
        validate={() => {
          return {};
        }}
        onSubmit={(values, opts) => {
          insertRole({
            variables: {
              object: {
                mission_id: missionId,
                name: values.name,
                description_md: values.description_md
              }
            }
          })
            .then(response => {
              alert("Submission success #bZHJyc");
              opts.resetForm();
              onSubmit();
            })
            .catch(error => {
              alert(`Submission error #R36gtj: ${error.message}`);
            });
        }}
      >
        {() => {
          return (
            <Form>
              <div>
                <Field
                  name="name"
                  label="Role name"
                  type="text"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="description_md"
                  label="Role description"
                  type="text"
                  component={TextField}
                  multiline
                  rows="3"
                />
              </div>
              <div>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

type Props = {
  missionId: string;
  onSubmit: () => void;
};

export default RoleNew;
