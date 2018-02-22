import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import * as urlInfoActions from './data/urlInfo/actions';
import {
  request as addRequest,
  requestWithCustomImg as addWithCustomImgRequest,
  init as addInit,
} from './data/add/actions';
import Layout from './components/Layout';
import Form from './components/Form';

class AddApp extends React.Component {
  handleSubmit = (body, { withCustomImg } = {}) => {
    const {
      addRequest,
      addWithCustomImgRequest,
    } = this.props;
    if (withCustomImg) {
      addWithCustomImgRequest({ body });
    } else {
      addRequest({ body });
    }
  };
  toAppPage = () => {
    console.log('to App Page');
  };
  render() {
    const {
      urlInfo,
      urlInfoRequest,
      urlInfoInit,
      add,
      addInit,
    } = this.props;
    return (
      <Layout>
        <Form
          getUrlInfo={url => urlInfoRequest({ params: encodeURIComponent(url) })}
          urlInfo={urlInfo}
          add={add}
          toAppPage={this.toAppPage}
          init={() => {
            urlInfoInit();
            addInit();
          }}
          submit={this.handleSubmit}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  urlInfo: state.main.addApp.data.urlInfo,
  add: state.main.addApp.data.add,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  urlInfoRequest: urlInfoActions.request,
  urlInfoInit: urlInfoActions.init,
  addRequest,
  addWithCustomImgRequest,
  addInit,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddApp));