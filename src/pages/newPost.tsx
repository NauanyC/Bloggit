import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

//Interfaces
import { Blog } from "../interfaces/Blog";

//UI
import Box from "@material-ui/core/Box";

//Components
import PostForm from "../components/PostForm";
import { Grid } from "@material-ui/core";

export interface NewPostProps {}

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      fontSize: "3em",
    },
  },
}));

const NewPost: React.SFC<NewPostProps> = () => {
  const classes = useStyles();

  return (
    <div className="NewPost">
      <Box className={classes.hero}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={10}>
            <PostForm action="Publish"></PostForm>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default NewPost;
