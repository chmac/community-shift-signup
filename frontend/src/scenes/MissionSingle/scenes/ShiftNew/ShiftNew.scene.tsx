import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";

import { Shift, Role } from "../../../../types";
import { Button, MenuItem, InputLabel } from "@material-ui/core";

const ShiftNewMutation = gql`
  mutation ShiftNewMutation($object: shifts_insert_input!) {
    insert_shifts(objects: [$object]) {
      returning {
        id
      }
    }
  }
`;

const ShiftNew: React.FC<Props> = props => {
  const { roles, onSubmit } = props;

  const [insertRole] = useMutation<{
    insert_shifts: {
      returning: Shift[];
    };
  }>(ShiftNewMutation);

  if (!roles || roles.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>New Shift</h2>
      <Formik
        initialValues={{
          role_id: roles[0].id,
          start_date: "",
          start_time: "",
          end_date: "",
          end_time: "",
          count: 1
        }}
        validate={() => {
          return {};
        }}
        onSubmit={(values, opts) => {
          insertRole({
            variables: {
              object: {
                ...values
              }
            }
          })
            .then(response => {
              alert("Submission success #bZHJyc");
              // opts.resetForm();
              opts.setSubmitting(false);
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
                <InputLabel htmlFor="role_id">Role</InputLabel>
                <Field
                  name="role_id"
                  label="Role"
                  type="text"
                  component={Select}
                  inputProps={{ id: "role_id" }}
                >
                  {roles.map(role => {
                    return (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    );
                  })}
                </Field>
              </div>
              <div>
                <Field
                  name="start_date"
                  label="Start Date"
                  type="text"
                  component={TextField}
                />
                <Field
                  name="start_time"
                  label="Start Time"
                  type="text"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="end_date"
                  label="End Date"
                  type="text"
                  component={TextField}
                />
                <Field
                  name="end_time"
                  label="End Time"
                  type="text"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="count"
                  label="How many people for this shift?"
                  type="number"
                  component={TextField}
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
  roles?: Role[];
  onSubmit: () => void;
};

export default ShiftNew;
