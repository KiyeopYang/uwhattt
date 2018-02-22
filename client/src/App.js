import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { getAuth } from 'modules/auth';
import * as noticeDialogActions from './data/noticeDialog/actions';
import * as authActions from './data/auth/actions';
import * as signUpActions from './data/signUp/actions';
import * as loginActions from './data/login/actions';
import { loader } from './data/loader/actions';
import NoticeDialog from './components/NoticeDialog';
import MessageBar from './rootModules/MessageBar';
import Main from './scenes/Main';
import loaderDOM from './modules/loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    loaderDOM(this.props.loaderState);
    if (getAuth()) {
      this.props.authRequest();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loaderState !== nextProps.loaderState) {
      if (nextProps.auth.status === 'WAITING') {
        loaderDOM(true);
      } else {
        loaderDOM(nextProps.loaderState);
      }
    }
  }
  render() {
    const {
      noticeDialog,
      state,
    } = this.props;
    console.log(state);
    return (
      <React.Fragment>
        <Main />
        <NoticeDialog
          open={noticeDialog.open}
          onClose={this.props.noticeDialogOff}
          title={noticeDialog.title}
          text={noticeDialog.text}
          onConfirm={noticeDialog.onConfirm}
        />
        <MessageBar />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  state,
  noticeDialog: state.data.noticeDialog,
  loaderState: state.data.loader,
  auth: state.data.auth,
  login: state.data.login,
  signUp: state.data.signUp,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  loader,
  authRequest: authActions.request,
  logout: authActions.logout,
  loginRequest: loginActions.request,
  signUpRequest: signUpActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
