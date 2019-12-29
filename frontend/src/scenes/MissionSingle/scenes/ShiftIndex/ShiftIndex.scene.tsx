import React from "react";
import { Shift } from "../../../../types";
import {
  Card,
  CardContent,
  Theme,
  createStyles,
  Grid,
  CardActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const shiftsToSlots = (shifts: Shift[]) => {
  return shifts
    .map(shift => {
      const { allocations, ...shiftWithoutAllocations } = shift;
      return Array.from(Array(shift.count)).map((_, index) => {
        return {
          ...shiftWithoutAllocations,
          index,
          allocation: allocations && allocations[index]
        };
      });
    })
    .reduce((accumulator, val) => {
      return accumulator.concat(val);
    }, []);
};

const ShiftIndex: React.FC<Props> = props => {
  const { shifts } = props;
  const classes = useStyles();

  if (!shifts || shifts.length === 0) {
    return null;
  }

  return (
    <>
      <h3>Shifts</h3>
      <div className={classes.container}>
        <Grid container spacing={3}>
          {shiftsToSlots(shifts).map(slot => {
            const allocated = !!slot.allocation;
            return (
              <Grid item md={4} key={`${slot.id}_${slot.index}`}>
                <Card
                  className={allocated ? "" : classes.cardAvailable}
                  key={`${slot.id}_${slot.index}`}
                >
                  <CardContent>
                    <div>
                      Start: {slot.start_date} / {slot.start_time}
                    </div>
                    <div>
                      End: {slot.end_date} / {slot.end_time}
                    </div>
                  </CardContent>
                  <CardActions>
                    {!!slot.allocation?.profile ? (
                      slot.allocation.profile.display_name
                    ) : (
                      <Button size="small">Register</Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    },
    cardAvailable: {
      backgroundColor: green[100]
      // width: "100%"
      // padding: theme.spacing(2),
      // marginLeft: theme.spacing(2)
    }
  })
);

type BaseProps = {
  shifts?: Shift[];
};

type Props = BaseProps;

export default ShiftIndex;
