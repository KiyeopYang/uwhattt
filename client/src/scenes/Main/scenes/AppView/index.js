import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import { request as appRequest } from './data/app/actions';
import Layout from './components/Layout';
import App from './components/App';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    const { id, appRequest } = this.props;
    if (id) {
      appRequest(id);
    }
  }
  render() {
    const { app } = this.props;
    return (
      <Layout>
        {
          app.data ?
            <App {...app.data}/> : null
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  app: state.main.appView.data.app,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  appRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppView));