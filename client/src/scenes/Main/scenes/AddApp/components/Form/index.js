import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import UrlForm from './components/UrlForm';
import UrlInfo from './components/UrlInfo';

const styles = theme => ({
  wrapper: {
    margin: '8px',
  },
  buttons: {
    margin: theme.spacing.unit,
    textAlign: 'right',
  },
});
class Form extends React.Component {
  render() {
    const {
      classes,
      urlInfo,
      getUrlInfo,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <UrlForm
          urlInfo={urlInfo}
          onSubmit={getUrlInfo}
          disabled={!!urlInfo}
        />
        {
          urlInfo ?
            <React.Fragment>
              <UrlInfo
                {...urlInfo}
              />
              <div className={classes.buttons}>
                <Button
                  variant="raised"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  color="primary"
                >
                  Cancel
                </Button>
              </div>
            </React.Fragment>
            : null
        }
      </div>
    );
  }
}
export default withStyles(styles)(Form);
