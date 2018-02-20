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
import Layout from './components/Layout';
import Form from './components/Form';

class AddApp extends React.Component {
  render() {
    const {
      urlInfo,
      urlInfoRequest,
    } = this.props;
    return (
      <Layout>
        <Form
          getUrlInfo={url => urlInfoRequest({ params: encodeURIComponent(url) })}
          urlInfo={urlInfo.data}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  urlInfo: state.main.addApp.data.urlInfo,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  urlInfoRequest: urlInfoActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddApp));