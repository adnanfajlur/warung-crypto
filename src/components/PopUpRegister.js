import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import { setAccount } from '../../utils/StorageUtil';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PopUpRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isAgree: false,
    };
  }

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
    const { open } = this.props;
    const { name, isAgree } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          transition={Transition}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{ minWidth: 400 }}
        >
          <DialogTitle id="alert-dialog-slide-title">
            Register
          </DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={this.handleChangeInput('name')}
              fullWidth
            />
            <Typography style={{ marginTop: 16 }}>You will get a credit of 10 million rupiah</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAgree}
                  onChange={this.handleChangeCheckbox('isAgree')}
                  value="isAgree"
                />
              }
              label="I agree, that this is not real"
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={!(name.length > 0 && isAgree)} variant="raised" onClick={this.submitRegister} color="primary">
              Submit
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
};

export default PopUpRegister;
