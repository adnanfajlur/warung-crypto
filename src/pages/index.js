import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withRoot from '../withRoot';
import { createStructuredSelector } from 'reselect';
import { loadCrypto, addWallet, transactionWallet } from '../../actions/cryptoAction';

import { withStyles } from 'material-ui/styles';

import Frame from '../components/Frame';
import TableCrypto from '../components/TableCrypto';
import PopUpTransactions from '../components/PopUpTransactions';

const styles = () => ({
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      openTransactions: false,
      cryptoSelected: '',
      amountTransaction: 100000,
      amountCoin: 0.1,
    };
  }

  componentWillMount() {
    if (this.props.dataCrypto && this.props.dataCrypto.data.data !== this.state.data) {
      this.setState({
        data: this.props.dataCrypto.data.data,
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(loadCrypto());
    this.interval = setInterval(() => {
      this.props.dispatch(loadCrypto());
    }, 300000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataCrypto && nextProps.dataCrypto.data.data !== this.state.data) {
      this.setState({
        data: nextProps.dataCrypto.data.data,
      });
    }
    if (nextProps.credit !== this.props.credit) {
      this.setState({ openTransactions: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleAddWallet = () => {
    const { data, cryptoSelected, amountTransaction } = this.state;
    const selected = data[cryptoSelected];
    const amount = amountTransaction / selected.quotes.IDR.price;
    this.props.dispatch(addWallet({
      id: selected.id,
      name: selected.name,
      amount,
      credit: amountTransaction,
    }));
  }

  handleSellWallet = () => {
    const { credit, wallet } = this.props;
    const {
      data, cryptoSelected, amountCoin,
    } = this.state;
    const selected = data[cryptoSelected];
    const newCredit = (Number(amountCoin) * Number(selected.quotes.IDR.price)) + Number(credit);
    this.props.dispatch(transactionWallet({
      id: cryptoSelected,
      name: selected.name,
      amount: Number(wallet.find(n => n.id === cryptoSelected).amount) - amountCoin,
      credit: newCredit,
    }));
  }

  render() {
    const { currency, credit, wallet } = this.props;
    const {
      data,
      cryptoSelected,
      openTransactions,
      amountTransaction,
      amountCoin,
    } = this.state;
    return (
      <Frame>
        <Helmet defaultTitle="Warung Crypto">
          <title>Warung Crypto</title>
          <html lang="en" />
        </Helmet>
        <PopUpTransactions
          open={openTransactions}
          onClose={() => this.setState({ openTransactions: false })}
          data={openTransactions && data[cryptoSelected]}
          currency={currency}
          amount={amountTransaction}
          amountCoin={amountCoin}
          changeAmount={val => this.setState({ amountTransaction: val })}
          changeAmountCoin={val => this.setState({ amountCoin: val })}
          onBuy={this.handleAddWallet}
          onSell={this.handleSellWallet}
          maxAmount={credit}
          wallet={wallet}
        />
        <Fragment>
          <TableCrypto
            data={data && Object.keys(data).map(n => data[n])}
            currency={currency}
            onClick={id => this.setState({ cryptoSelected: id, openTransactions: true })}
          />
        </Fragment>
      </Frame>
    );
  }
}

const selectCryptoData = () => state => state.crypto.asMutable({ deep: true }).data;
const selectCurrency = () => state => state.warung.currency;
const selectCredit = () => state => state.crypto.credit;
const selectWallet = () => state => state.crypto.wallet;

const mapStateToProps = createStructuredSelector({
  dataCrypto: selectCryptoData(),
  currency: selectCurrency(),
  credit: selectCredit(),
  wallet: selectWallet(),
});

Index.propTypes = {
  // classes: PropTypes.object,
  dispatch: PropTypes.func,
  dataCrypto: PropTypes.object,
  currency: PropTypes.string,
  credit: PropTypes.any,
  wallet: PropTypes.any,
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Index)));
