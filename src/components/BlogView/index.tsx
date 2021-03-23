import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

//Interfaces
import { Blog } from "../../interfaces/Blog";
import { User } from "../../interfaces/User";

//Utils
import { jsUcfirst } from "../../utils/string";
import { randomDate } from "../../utils/date";

//UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

export interface BlogProps {
  author: User;
  blog: Blog;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 750,
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const Blog: React.SFC<BlogProps> = ({ blog, author }) => {
  const classes = useStyles();
  const { body, userId } = blog;
  const title = blog.title && jsUcfirst(blog.title);
  const imageId = Math.floor(Math.random() * 300) + 1;

  return (
    <div className="Blog">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar src={`https://source.unsplash.com/collection/=${userId}`} />
          }
          action={
            <IconButton aria-label="favorite">
              <FavoriteIcon />
            </IconButton>
          }
          title={author.name}
          subheader={randomDate(new Date(2018, 0, 1), new Date())}
        />
        <CardMedia
          className={classes.media}
          image={`https://source.unsplash.com/collection/=${imageId}`}
          title={title}
        />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography paragraph color="textSecondary" component="p">
            {body && jsUcfirst(body)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="deslike">
            <ThumbDownIcon />
          </IconButton>
          <IconButton aria-label="like">
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Blog;
