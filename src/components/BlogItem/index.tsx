import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

//Utils
import { jsUcfirst, trimString } from "../../utils/string";
import { randomDate } from "../../utils/date";

//UI
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Avatar from "@material-ui/core/Avatar";

//Interfaces
import { Blog } from "../../interfaces/Blog";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}));

function BlogItem({ author, title, body, userId }: Blog) {
  const classes = useStyles();

  const imageId = Math.floor(Math.random() * 410) + 1;

  return (
    <div className="Blog">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://source.unsplash.com/collection/=${userId}`}
            title="Post"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {jsUcfirst(title)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {jsUcfirst(trimString(body, 100))}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Box className={classes.author}>
            <Avatar
              src={`https://source.unsplash.com/collection/=${imageId}`}
            />
            <Box ml={2}>
              <Typography variant="subtitle2" component="p">
                {author}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {randomDate(new Date(2018, 0, 1), new Date())}
              </Typography>
            </Box>
          </Box>
          <Box>
            <BookmarkBorderIcon />
          </Box>
        </CardActions>
      </Card>
    </div>
  );
}

export default BlogItem;
