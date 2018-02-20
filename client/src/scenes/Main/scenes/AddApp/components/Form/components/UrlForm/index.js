import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {
  centerText: {
    textAlign: 'center',
  },
};
class UrlForm extends React.Component {
  constructor(props) {
    super(props);
    const { urlInfo } = this.props;
    this.state = {
      url: urlInfo ? urlInfo.url : '',
    };
  }
  handleInputChange = (prop) => (e) => {
    this.setState({ [prop]: e.target.value });
  };
  render() {
    const { classes, onSubmit, disabled } = this.props;
    const { url } = this.state;
    return (
      <form>
        <TextField
          id="urlForm"
          label="URL"
          margin="normal"
          fullWidth
          helperText="ex) https://google.com"
          value={url}
          onChange={this.handleInputChange('url')}
          disabled={disabled}
        />
        {
          !disabled ?
            <div className={classes.centerText}>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(url);
                }}
              >
                Submit
              </Button>
            </div> : null
        }
      </form>
    );
  }
}
export default withStyles(styles)(UrlForm);
