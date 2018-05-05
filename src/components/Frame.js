import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import withRoot from '../withRoot';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeCurrency } from '../../actions/warungAction';
import { getAccount } from '../../utils/StorageUtil';
import PopUpRegister from './PopUpRegister';
import PopUpWallet from './PopUpWallet';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

const styles = () => ({
  body: {
    minHeight: '100vh',
    width: '100%',
    marginBottom: 40,
  },
  content: {
    display: 'flex',
    margin: '0 20px',
  },
  flex: {
    flex: 1,
  },
  menu: {
    maxHeight: 180,
  },
  menuItem: {
    padding: 8,
    maxHeight: 12,
    fontSize: '.86rem',
  },
});


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRegister: false,
      openWallet: false,
    };
  }

  componentDidMount() {
    this.syncWithStorage();
  }

  handleChangeCurrency(param) {
    this.props.dispatch(changeCurrency(param));
  }

  syncWithStorage() {
    const isRegister = getAccount();
    this.setState({ openRegister: !(isRegister || false) });
  }

  render() {
    const { classes, children, credit, wallet } = this.props;
    const { openRegister, openWallet } = this.state;
    return (
      <Fragment>
        <Helmet defaultTitle="Warung Crypto">
          <title>Warung Crypto</title>
          <html lang="en" />
        </Helmet>
        <PopUpRegister
          open={openRegister}
          onClose={() => this.setState({ openRegister: false })}
        />
        <PopUpWallet
          open={openWallet}
          onClose={() => this.setState({ openWallet: false })}
          wallet={wallet}
        />
        <div className={classes.body}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Warung Crypto
              </Typography>
              <div>
                <Button onClick={() => this.setState({ openWallet: true })} color="inherit">{credit.toLocaleString()} IDR</Button>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </Fragment>
    );
  }
}

const selectWallet = () => state => state.crypto.wallet;
const selectCredit = () => state => state.crypto.credit;

const mapStateToProps = createStructuredSelector({
  wallet: selectWallet(),
  credit: selectCredit(),
});

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
  credit: PropTypes.any,
  wallet: PropTypes.array,
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Index)));
