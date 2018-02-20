import React, {Fragment} from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconTry from 'material-ui-icons/Send';
import IconPrice from 'material-ui-icons/MonetizationOn';
import IconAccount from 'material-ui-icons/AccountBox';
import IconHelp from 'material-ui-icons/Help';
import IconLogout from 'material-ui-icons/Close';

const styles = theme => ({
  list: {
    width: 250,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});
function DrawerMenu(props) {
  const {
    classes,
    onSelect,
    account,
    open,
    onClose,
  } = props;
  const isAuth = !!account;
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div className={classes.list}>
          <List>
            <ListItem
              className={classes.menuItem}
              button
              onClick={() => onSelect('addApp')}
            >
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={"앱 등록"}
              />
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  );
}
export default withStyles(styles, { withTheme: true })(DrawerMenu);
