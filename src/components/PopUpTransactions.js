import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import { withStyles, TextField, Typography } from 'material-ui';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

const styles = () => ({
  green: {
    color: '#4CAF50',
  },
  red: {
    color: '#F44336',
  },
  smallRow: {
    height: 32,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function SmallCell(props) {
  return <TableCell style={{ padding: '0px 8px' }} {...props} />;
}

function PopUpTransactions(props) {
  const {
    classes,
    open,
    onClose,
    currency,
    data,
    amount,
    amountCoin,
    changeAmount,
    changeAmountCoin,
    onBuy,
    onSell,
    maxAmount,
    wallet,
  } = props;
  const quotes = data.quotes ? data.quotes[currency] : '';
  const currentWallet = wallet.find(n => n.id === data.id);
  return (
    <Fragment>
      <Dialog
        open={open}
        transition={Transition}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-transactions-title"
      >
        <DialogTitle id="alert-transactions-title">
          {`${data.name} (${data.symbol})`}
        </DialogTitle>
        <DialogContent >
          <Table>
            <TableBody>
              <TableRow className={classes.smallRow}>
                <SmallCell>
                  Price
                </SmallCell>
                <SmallCell>
                  Market Cap
                </SmallCell>
                <SmallCell>
                  Volume (24h)
                </SmallCell>
              </TableRow>
              <TableRow className={classes.smallRow}>
                <SmallCell>
                  {quotes && `${quotes.price.toLocaleString()} ${currency}`}
                </SmallCell>
                <SmallCell>
                  {quotes && `${quotes.market_cap.toLocaleString()} ${currency}`}
                </SmallCell>
                <SmallCell>
                  {quotes && `${quotes.volume_24h.toLocaleString()} ${currency}`}
                </SmallCell>
              </TableRow>
              <TableRow className={classes.smallRow}>
                <SmallCell className={classes.smallCell}>
                  Circulating Supply
                </SmallCell>
                <SmallCell className={classes.smallCell}>
                  Max Supply
                </SmallCell>
                <SmallCell className={classes.smallCell}>
                  Change (24h)
                </SmallCell>
              </TableRow>
              <TableRow className={classes.smallRow}>
                <SmallCell className={classes.smallCell}>
                  {quotes && `${data.circulating_supply.toLocaleString()} ${data.symbol}`}
                </SmallCell>
                <SmallCell className={classes.smallCell}>
                  {quotes && `${(data.max_supply || '').toLocaleString()} ${data.symbol}`}
                </SmallCell>
                <SmallCell className={classes.smallCell}>
                  <span className={quotes.percent_change_24h < 0 ? classes.red : classes.green}>({quotes.percent_change_24h}%)</span>
                </SmallCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <TextField
              label="Amount (IDR)"
              value={amount}
              onChange={event => changeAmount(event.target.value)}
              margin="dense"
              fullWidth
              type="number"
              error={amount > maxAmount}
              helperText="Minimal amount is 100.000"
            />
            {amount > maxAmount &&
            <Typography style={{ margin: '10px 0px', color: '#f44336' }}>Your credit is not enough</Typography>
            }
            <Button disabled={amount.length > 100000 || amount > maxAmount} variant="raised" onClick={() => onBuy()} color="primary">
              buy
            </Button>
            {(typeof currentWallet === 'undefined' ? 0 : currentWallet.amount) > 0 &&
              <Fragment>
                <Typography style={{ margin: '10px 0px' }}>Your {data.symbol} = {currentWallet.amount}</Typography>
                <TextField
                  label={`Amount (${data.symbol})`}
                  value={amountCoin}
                  onChange={event => changeAmountCoin(event.target.value)}
                  margin="dense"
                  fullWidth
                  type="number"
                  error={amountCoin > (typeof currentWallet === 'undefined' ? 0 : currentWallet.amount)}
                />
                {amountCoin > (typeof currentWallet === 'undefined' ? 0 : currentWallet.amount) &&
                  <Typography style={{ margin: '10px 0px', color: '#f44336' }}>Your credit is not enough</Typography>
                }
                <Button disabled={amountCoin <= 0 || amountCoin > (typeof currentWallet === 'undefined' ? 0 : currentWallet.amount)} variant="raised" onClick={() => onSell()} color="primary">
                  sell
                </Button>
              </Fragment>
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

PopUpTransactions.defaultProps = {
  currency: 'IDR',
};

PopUpTransactions.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  amount: PropTypes.any,
  changeAmount: PropTypes.func,
  changeAmountCoin: PropTypes.func,
  onBuy: PropTypes.func,
  onSell: PropTypes.func,
  maxAmount: PropTypes.any,
  amountCoin: PropTypes.any,
  wallet: PropTypes.array,
};

export default withStyles(styles)(PopUpTransactions);
