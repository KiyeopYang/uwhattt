import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import Layout from './components/Layout';
import Form from './components/Form';
import AppView from '../../../AppView';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <AppView id={match.params.id}/>
        <Form />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppInfo));