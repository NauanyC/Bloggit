import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, FormControlLabel, Grid, Switch } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

export interface PostFormProps {
  action: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "25px",
  },
  paper: {
    padding: theme.spacing(8),
  },
  goBackButton: {
    color: "#db8204",
    border: "1px solid #db8204",
  },
}));

const PostForm: React.SFC<PostFormProps> = ({ action }) => {
  const classes = useStyles();

  return (
    <div className="PostForm">
      <Container className={classes.container} maxWidth="md">
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter your title"
                label="Title"
                required
                defaultValue=""
                margin="normal"
                fullWidth
                variant="outlined"
              />
              <TextField
                placeholder="Enter a URL"
                label="Image"
                defaultValue=""
                margin="normal"
                fullWidth
                variant="outlined"
              />
              <FormControlLabel
                value="start"
                control={<Switch color="secondary" />}
                label="Anonymous Posting"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter your text"
                label="Text"
                defaultValue=""
                margin="normal"
                fullWidth
                variant="outlined"
                multiline
                rows={8}
                rowsMax={10}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Button
                    className={classes.goBackButton}
                    size="large"
                    variant="outlined"
                    fullWidth
                    endIcon={<CloseIcon />}
                    onClick={() => console.log("Back we go!")}
                  >
                    Go Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    color="secondary"
                    size="large"
                    variant="outlined"
                    fullWidth
                    endIcon={<SendIcon />}
                    onClick={() =>
                      console.log("Should submit right now, right?")
                    }
                  >
                    {action}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default PostForm;
