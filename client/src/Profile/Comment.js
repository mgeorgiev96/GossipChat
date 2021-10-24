import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function Comment(props) {
  return (
      <>
      <ListItem alignItems="flex-start" className="single_comment">
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.image} />
        </ListItemAvatar>
        <ListItemText
          primary = {props.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
              >
              </Typography>
              {props.description}
            </React.Fragment>
          }
        />
      </ListItem>
      </>
  );
}

export default Comment;