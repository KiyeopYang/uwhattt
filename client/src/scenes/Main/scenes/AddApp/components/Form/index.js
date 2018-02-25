import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import LoadingButton from 'components/LoadingButton';
import resizeImage from 'modules/resizeImage';
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
  constructor(props) {
    super(props);
    const { data } = this.props.urlInfo;
    this.state = {
      url: data ? data.url : '',
      favicon: data ? data.favicon : '',
      title: data ? data.title : '',
      doUseUploadedImg: false,
      uploadedImg: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps.urlInfo;
    if (data &&
      JSON.stringify(this.props.urlInfo.data) !==
        JSON.stringify(data)
    ) {
      this.setState({
        url: data.url,
        favicon: data.favicon,
        title: data.title,
      });
    }
  }
  toAppPage = () => {
    this.props.init();
    this.props.toAppPage();
  };
  handleCancel = () => {
    this.props.init();
    this.setState({
      url: '',
      favicon: '',
      title: '',
      doUseUploadedImg: false,
      uploadedImg: null,
    });
  };
  handleSubmit = async () => {
    const {
      isHttps,
      domain,
      path,
    } = this.props.urlInfo.data;
    const {
      title,
      favicon,
      doUseUploadedImg,
      uploadedImg,
    } = this.state;
    if (doUseUploadedImg && uploadedImg) {
      const file = await resizeImage(uploadedImg.canvas);
      const formData = new FormData();
      formData.append(
        'file',
        file,
        uploadedImg.name,
      );
      formData.append(
        'data',
        JSON.stringify({
          isHttps,
          domain,
          path,
          title,
        }),
      );
      this.props.submit(formData, {
        withCustomImg: true,
      });
    } else {
      this.props.submit({
        isHttps,
        domain,
        path,
        title,
        favicon,
      });
    }
  };
  handleInputChange = (prop, mode) => {
    if (!mode) {
      return e => {
        this.setState({ [prop]: e.target.value });
      };
    } else if (mode === 'switch') {
      return e => {
        this.setState({ [prop]: e.target.checked });
      };
    } else if (mode === 'img') {
      return e => {
        const input = e.target;
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = re => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
              this.setState({
                uploadedImg: {
                  canvas,
                  name: input.files[0].name,
                  url: canvas.toDataURL(),
                },
              });
            };
            img.src = re.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    }
  };
  render() {
    const {
      classes,
      urlInfo,
      getUrlInfo,
      add,
    } = this.props;
    const {
      url,
      favicon,
      title,
      doUseUploadedImg,
      uploadedImg,
    } = this.state;
    const urlInfoSuccess =
      urlInfo.data && !urlInfo.isFetching && !urlInfo.error;
    const addSuccess =
      add.data && !add.isFetching && !add.error;
    return (
      <div className={classes.wrapper}>
        <UrlForm
          inputs={{
            url,
          }}
          handleInputChange={this.handleInputChange}
          loading={urlInfo.isFetching}
          success={urlInfoSuccess}
          onSubmit={getUrlInfo}
        />
        {
          urlInfoSuccess ?
            <React.Fragment>
              <UrlInfo
                inputs={{
                  favicon,
                  title,
                  doUseUploadedImg,
                  uploadedImg,
                }}
                success={addSuccess}
                handleInputChange={this.handleInputChange}
              />
              <div className={classes.buttons}>
                <LoadingButton
                  variant="raised"
                  color="primary"
                  loading={add.isFetching}
                  disabled={add.isFetching}
                  success={addSuccess}
                  onClick={addSuccess ?
                    this.toAppPage : this.handleSubmit}
                >
                  { addSuccess ? 'To App Page' : 'Submit' }
                </LoadingButton>
                <Button
                  color="primary"
                  onClick={this.handleCancel}
                  disabled={add.isFetching}
                >
                  { addSuccess ? 'Add Another' : 'Cancel' }
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
