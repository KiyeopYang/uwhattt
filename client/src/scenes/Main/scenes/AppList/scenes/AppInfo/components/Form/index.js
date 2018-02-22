import React from 'react';
import { withStyles } from 'material-ui/styles';
import LoadingButton from 'components/LoadingButton';

const styles = theme => ({
  form: {
    textAlign: 'center',
  },
});
function Form ({ classes, children }) {
  return (
    <div className={classes.form}>
      <LoadingButton
        color="primary"
      >
        Add to My App
      </LoadingButton>
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(Form);
