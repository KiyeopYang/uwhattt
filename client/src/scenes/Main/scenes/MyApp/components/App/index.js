import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  app: {
    position: 'absolute',
    width:'25%',
    height: '100px',
    overflow: 'hidden',
    textAlign: 'center',
    cursor: 'pointer',
  },
  img: {
    margin: theme.spacing.unit,
    userDrag: 'none',
    userSelect: 'none',
  },
});
function App ({ classes, favicon, title, ...props }) {
  return (
    <div className={classes.app} {...props}>
      <img
        className={classes.img}
        alt="favicon"
        src={favicon}
        width="32"
        height="32"
      />
      <Typography variant="subheading" gutterBottom>
        { title }
      </Typography>
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(App);
