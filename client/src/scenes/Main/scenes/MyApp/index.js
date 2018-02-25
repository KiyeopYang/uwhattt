import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { Motion, spring } from 'react-motion';

import { loader } from 'data/loader/actions';
import * as noticeDialogActions from 'data/noticeDialog/actions';
import { request as appListRequest } from './data/appList/actions';
import Layout from './components/Layout';
import App from './components/App';
import * as myAppFromCookie from 'modules/myAppFromCookie';

const springSetting1 = {stiffness: 20, damping: 5};
const springSetting2 = {stiffness: 120, damping: 17};
function range(n) {
  const arr = [];
  for (let i = 0; i < n; i += 1) { arr.push(i); }
  return arr;
}
function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr[from] = _arr[to];
  _arr[to] = val;
  return _arr;
}
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
const TIME_TO_MOVE_APP = 1500;
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [],
      mouseXY: [0, 0],
      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: null,
      initialAppList: [],
      cols: 4,
      appWidth: 1,
      appHeight: 100,
      layout: [],
    };
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('resize', this.setUpLayoutByEvent);
    this.getMyApp()
      .then(this.setUpLayout)
      .catch(console.error);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setUpLayoutByEvent);
  }
  setUpLayoutByEvent = () => {
    this.setUpLayout(this.state.appList);
  };
  setUpLayout = (appList) => {
    const appWidth = window.innerWidth / this.state.cols;
    this.setState({
      layout: range(appList.length).map(n => {
        const row = Math.floor(n / this.state.cols);
        const col = n % this.state.cols;
        return [appWidth * col, this.state.appHeight * row];
      }),
      appWidth,
    });
  };
  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };
  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };
  handleMouseMove = ({pageX, pageY}) => {
    const {initialAppList, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this.state;
    if (isPressed && new Date().getTime() - isPressed.getTime() > TIME_TO_MOVE_APP) {
      const mouseXY = [pageX - dx, pageY - dy];
      const col = clamp(Math.round(mouseXY[0] / this.state.appWidth), 0, this.state.cols - 1);
      const row = clamp(Math.round(mouseXY[1] / this.state.appHeight), 0, Math.floor(initialAppList.length / this.state.cols) - 1);
      const index = row * this.state.cols + col;
      const newAppList = reinsert(initialAppList, initialAppList.findIndex(o => o.id === lastPress), index);
      this.setState({mouseXY, appList: newAppList });
    }
  };
  handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
    this.setState({
      lastPress: key,
      isPressed: new Date(),
      mouseCircleDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY],
      initialAppList: this.state.appList,
    });
  };
  handleMouseUp = () => {
    const { appList, lastPress, isPressed } = this.state;
    if (isPressed && new Date().getTime() - isPressed.getTime() < TIME_TO_MOVE_APP) {
      const app = appList.find(o => o.id === lastPress);
      this.openWindow(app);
    }
    this.setState({isPressed: null, mouseCircleDelta: [0, 0]});
  };
  getMyApp = () => {
    return new Promise((resolve, reject) => {
      const { data } = this.props.auth;
      let appList = data ? data.appList : null;
      if (!appList) {
        appList = myAppFromCookie.getMyApp();
      }
      this.props.appListRequest(appList)
        .then((list) => {
          this.setState({ appList: list });
          resolve(list);
        })
        .catch(reject);
    });
  };
  openWindow = (app) => {
    const { isHttps, domain, path } = app;
    window.open(`${isHttps ? 'https://':'http://'}${domain}${path}`);
  };
  render() {
    const { appList, layout, lastPress, isPressed, mouseXY } = this.state;
    return (
      <Layout>
        {
          appList.length < 1 || layout.length < 1 ? null: appList.map((o, key) => {
            let style;
            let x;
            let y;
            const visualPosition = key;
            if (o.id === lastPress && isPressed) {
              [x, y] = mouseXY;
              style = {
                translateX: x,
                translateY: y,
                scale: spring(1.3, springSetting1),
              };
            } else {
              [x, y] = this.state.layout[visualPosition];
              style = {
                translateX: spring(x, springSetting2),
                translateY: spring(y, springSetting2),
                scale: spring(1, springSetting1),
              };
            }
            return (
              <Motion key={o.id} style={style}>
                {({translateX, translateY, scale}) =>
                  <App
                    onMouseDown={this.handleMouseDown.bind(null, o.id, [x, y])}
                    onTouchStart={this.handleTouchStart.bind(null, o.id, [x, y])}
                    style={{
                      WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      zIndex: o.id === lastPress ? 99 : visualPosition,
                    }}
                    favicon={o.favicon}
                    title={o.title}
                  />
                }
              </Motion>
            );
            // (
            //   <App
            //     key={o.id}
            //     favicon={o.favicon}
            //     title={o.title}
            //   />
            // )
          })
        }
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  appList: state.main.myApp.data.appList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  appListRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyApp));
