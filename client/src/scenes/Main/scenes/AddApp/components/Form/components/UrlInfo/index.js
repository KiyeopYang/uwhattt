import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
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
  constructor(props) {
    super(props);
    const { favicon, title } = this.props;
    this.state = {
      favicon,
      title,
      doUseUploadedImg: false,
      uploadedImgCanvas: null,
    };
  }
  handleInputChange = (prop, option) => (e) => {
    this.setState({ [prop]: option ? e.target[option] : e.target.value });
  };
  handleImgUpload = e => {
    const input = e.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = re => {
        const img = new Image();
        img.onload = () => {
          const uploadedImgCanvas = document.createElement('canvas');
          const ctx = uploadedImgCanvas.getContext('2d');
          uploadedImgCanvas.width = img.width;
          uploadedImgCanvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          this.setState({
            uploadedImgCanvas,
          });
        };
        img.src = re.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  render() {
    const { classes } = this.props;
    const {
      favicon,
      title,
      doUseUploadedImg,
      uploadedImgCanvas,
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.imgForm}>
          <img
            src={
              doUseUploadedImg && uploadedImgCanvas?
                uploadedImgCanvas.toDataURL() : favicon
            }
            width="64"
            height="64"
          />
          <FormControlLabel
            control={
              <Switch
                checked={doUseUploadedImg}
                onChange={this.handleInputChange('doUseUploadedImg', 'checked')}
                color="primary"
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
                  onChange={this.handleImgUpload}
                />
                <label htmlFor="uploadAnImage">
                  <Button variant="raised" component="span" color="primary">
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
          onChange={this.handleInputChange('favicon')}
          disabled={doUseUploadedImg}
        />
        <TextField
          id="Title"
          label="Title"
          margin="normal"
          fullWidth
          value={title}
          onChange={this.handleInputChange('title')}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(UrlInfo);
