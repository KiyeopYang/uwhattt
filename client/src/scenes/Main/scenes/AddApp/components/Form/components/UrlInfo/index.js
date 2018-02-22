import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = {
  imgForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
};
class UrlInfo extends React.Component {
  render() {
    const {
      classes,
      inputs,
      handleInputChange,
      success,
    } = this.props;
    const {
      favicon,
      title,
      doUseUploadedImg,
      uploadedImg,
    } = inputs;
    return (
      <React.Fragment>
        <div className={classes.imgForm}>
          <img
            alt="favicon"
            src={
              doUseUploadedImg && uploadedImg?
                uploadedImg.canvas.toDataURL() : favicon
            }
            width="64"
            height="64"
          />
          <FormControlLabel
            control={
              <Switch
                checked={doUseUploadedImg}
                onChange={handleInputChange('doUseUploadedImg', 'switch')}
                color="primary"
                disabled={success}
              />
            }
            label="Upload an Image"
          />
          {
            doUseUploadedImg ?
              <div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="uploadAnImage"
                  type="file"
                  onChange={handleInputChange(null, 'img')}
                  disabled={success}
                />
                <label htmlFor="uploadAnImage">
                  <Button
                    variant="raised"
                    component="span"
                    color="primary"
                    disabled={success}
                  >
                    Upload
                  </Button>
                </label>
              </div> : null
          }
        </div>
        <TextField
          id="Favicon URL"
          label="Favicon URL"
          margin="normal"
          fullWidth
          value={favicon}
          onChange={handleInputChange('favicon')}
          disabled={doUseUploadedImg || success}
        />
        <TextField
          id="Title"
          label="Title"
          margin="normal"
          fullWidth
          value={title}
          onChange={handleInputChange('title')}
          disabled={success}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(UrlInfo);
