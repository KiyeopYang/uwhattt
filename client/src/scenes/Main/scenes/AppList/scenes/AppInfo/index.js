import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import { request as setMyAppRequest } from '../../../../data/setMyApp/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import AppView from '../../../AppView';
import * as myAppFromCookie from 'modules/myAppFromCookie';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  isAlreadyIncluded = (app) => {
    const { data } = this.props.auth;
    let appList = [];
    if (data) {
      appList = data.appList;
    } else {
      appList = myAppFromCookie.getMyApp();
    }
    return appList.includes(app);
  };
  addToMyApp = (app) => {
    this.props.setMyAppRequest({ app });
  };
  render() {
    const { match, setMyApp } = this.props;
    const { id } = match.params;
    const included = this.isAlreadyIncluded(id);
    return (
      <Layout>
        <AppView
          id={id}
        />
        <Form
          disabled={included}
          add={() => this.addToMyApp(id)}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  setMyApp: state.main.data.setMyApp,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  setMyAppRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInfo));