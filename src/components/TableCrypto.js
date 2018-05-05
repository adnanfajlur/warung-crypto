import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { Tooltip } from 'material-ui';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  green: {
    color: '#4CAF50',
  },
  red: {
    color: '#F44336',
  },
  sticky: {
    background: '#E0E0E0',
    position: 'sticky',
    top: 0,
  },
});

const columnData = [
  {
    id: 'id', numeric: false, canSort: true, label: '#',
  },
  {
    id: 'name', numeric: false, canSort: false, label: 'Name',
  },
  {
    id: 'marketCap', numeric: true, canSort: false, label: 'Market Cap',
  },
  {
    id: 'price', numeric: true, canSort: false, label: 'Price',
  },
  {
    id: 'quotes.IDR.volume_24h', numeric: true, canSort: true, label: 'Volume',
  },
  {
    id: 'circulatingSupply', numeric: true, canSort: false, label: 'Circulating Supply',
  },
  {
    id: 'quotes.IDR.percent_change_24h', numeric: true, canSort: true, label: 'Change (24h)',
  },
];

class TableCrypto extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      data: [],
    };
  }

  componentWillMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  createSortHandler = (property) => {
    const snp = (obj, path) => (
      path.split('.').reduce((acc, part) => acc && acc[part], obj)
    );

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (snp(b, orderBy) < snp(a, orderBy) ? -1 : 1))
        : this.state.data.sort((a, b) => (snp(a, orderBy) < snp(b, orderBy) ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  render() {
    const { classes, currency, onClick } = this.props;
    const { order, orderBy, data } = this.state;
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              {columnData.map(n => (
                n.canSort ?
                  <TableCell
                    key={n.id}
                    className={classes.sticky}
                    padding="dense"
                    numeric={n.numeric || false}
                    sortDirection={orderBy === n.id ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement={n.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === n.id}
                        direction={order}
                        onClick={() => this.createSortHandler(n.id)}
                      >
                        {n.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                : <TableCell key={n.id} className={classes.sticky}>{n.label}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== null && data.map((n) => {
              const quotes = n.quotes[currency];
              return (
                <TableRow
                  hover
                  key={n.id}
                  onClick={() => onClick(n.id)}
                >
                  <TableCell padding="dense">{n.id}</TableCell>
                  <TableCell padding="dense">{n.name}</TableCell>
                  <TableCell padding="dense" numeric>{`${quotes.market_cap.toLocaleString()} ${currency}`}</TableCell>
                  <TableCell padding="dense" numeric>{`${quotes.price.toLocaleString()} ${currency}`}</TableCell>
                  <TableCell padding="dense" numeric>{`${quotes.volume_24h.toLocaleString()} ${currency}`}</TableCell>
                  <TableCell padding="dense" numeric>{`${n.circulating_supply.toLocaleString()} ${n.symbol}`}</TableCell>
                  <TableCell padding="dense" className={quotes.percent_change_24h < 0 ? classes.red : classes.green} numeric>{`${quotes.percent_change_24h} %`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TableCrypto.defaultProps = {
  data: [],
  currency: 'IDR',
};

TableCrypto.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  currency: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(TableCrypto);
