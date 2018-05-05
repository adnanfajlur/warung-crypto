import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import PropTypes from 'prop-types';
import { setAccount } from '../../utils/StorageUtil';
import { Typography } from 'material-ui';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function SmallCell(props) {
  return <TableCell style={{ padding: '0px 8px' }} {...props} />;
}

class PopUpRegister extends Component {
  handleChangeInput = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheckbox = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  submitRegister = () => {
    setAccount({
      name: this.state.name,
      credit: 10000000,
    });
    this.props.onClose();
  }

  render() {
    const { open, wallet, onClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          transition={Transition}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{ minWidth: 400 }}
        >
          <DialogTitle id="alert-dialog-slide-title">
            Wallet
          </DialogTitle>
          <DialogContent>
            {wallet.length > 0 ?
              <Table>
                <TableBody>
                  <TableRow style={{ height: 32 }}>
                    <SmallCell>
                      Name
                    </SmallCell>
                    <SmallCell>
                      Amount
                    </SmallCell>
                  </TableRow>
                  {wallet.map(n => (
                    <TableRow key={n.name} style={{ height: 32 }}>
                      <SmallCell>
                        {n.name}
                      </SmallCell>
                      <SmallCell>
                        {n.amount}
                      </SmallCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              : <Typography>Your wallet is empty</Typography>
            }
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={() => onClose()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PopUpRegister.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  wallet: PropTypes.array,
};

export default PopUpRegister;
