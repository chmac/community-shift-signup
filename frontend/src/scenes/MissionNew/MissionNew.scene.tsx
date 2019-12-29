import React from "react";
import gql from "graphql-tag";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import { Button } from "@material-ui/core";
import { useMutation } from "react-apollo";
import store from "../../store";
import { history } from "../Routes/Routes.scene";

const MissionNewMutation = gql`
  mutation MissionNew($object: missions_insert_input!) {
    insert_missions(objects: [$object]) {
      returning {
        id
        user_id
      }
    }
  }
`;

const MissionNew = () => {
  const [insertMission] = useMutation<{
    insert_missions: {
      returning: {
        id: string;
        user_id: string;
      }[];
    };
  }>(MissionNewMutation);

  return (
    <div>
      <h1>New Mission</h1>
      <Formik
        initialValues={{ name: "", description_md: "" }}
        validate={values => {
          // debugger;
          return {};
        }}
        onSubmit={async (values, opts) => {
          debugger;
          const {
            auth: { userId }
          } = store.getState();
          insertMission({
            variables: {
              object: {
                user_id: userId,
                name: values.name,
                slug: "slug",
                description_md: values.description_md
              }
            }
          })
            .then(result => {
              const id = result.data?.insert_missions.returning[0].id;
              alert(`Submission success #nX5sQG: ID: ${id}`);
              history.push(`/missions/${id}`);
            })

            .catch(error => {
              alert(`Submission failed #YSGAaM: ${error.message}`);
            });
        }}
      >
        {({ isSubmitting, submitForm }) => {
          // debugger;
          return (
            <Form>
              <div>
                <Field
                  name="name"
                  label="Mission name"
                  type="text"
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="description_md"
                  label="Mission description"
                  type="text"
                  component={TextField}
                  multiline
                  rows="7"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
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

export default MissionNew;
