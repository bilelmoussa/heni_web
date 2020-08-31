import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { fetchMsgs, fetchMsgsCount, deleteMessageById, updateSeenMsg } from '../../thunks';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';

interface Column {
    id: "name" | "email" | "message" | "createdOn" | "action"
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => any;
}

const columns: Column[] = [
    {id: "name", label: "Name", minWidth: 100},
    {id: "email", label: "Email", minWidth: 100},
    {id: "message", label: "Message", minWidth: 170},
    {id: "createdOn", label: "Date", format: (value) => moment(value).format('YYYY-MM-DD HH:mm'), minWidth: 170},
    {id: "action", label: "Action", minWidth: 170},
]

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflow: "hidden"
    },
    container: {
        maxHeight: 440,
    },
});

interface Props extends WithStyles<typeof styles> {
    fetchMsgs: any;
    fetchMsgsCount: any;
    deleteMessageById: any;
    inbox: any;
    updateSeenMsg: any
}

class InboxTable extends PureComponent<Props> {
    state = {
        page: 0,
        rowsPerPage: 10
    }

    componentDidMount() {
        const{ rowsPerPage } = this.state;
        const { messages } = this.props.inbox;
        const msgsLength = messages.length;
        const limit = rowsPerPage - msgsLength;

        this.props.fetchMsgsCount();

        this.props.fetchMsgs(msgsLength, limit);

    }

    componentDidUpdate(prevProps: any){
        if(prevProps !== this.props) {
            const { messages } = this.props.inbox;
            const ids: string[] = [];

            if(messages !== prevProps.inbox.messages){
                messages.forEach((message: any) => {
                    if(message && message.seen === false){
                        if(ids.indexOf(message._id) === -1) {
                            ids.push(message._id);
                        }
                    }
                });

                this.props.updateSeenMsg(ids);
            }
        }
    }

    handleChangePage = (event: unknown, newPage: number) => {
        const { page, rowsPerPage } = this.state;
        const { messages, count } = this.props.inbox;
        const msgsLength = messages.length | 0;
        const newPageNmb = newPage + 1;

        const Rows = newPageNmb * rowsPerPage;
        const limit = Rows - msgsLength;

        if(newPage > page && msgsLength < Rows && msgsLength < count) {
            this.props.fetchMsgs(msgsLength, limit);
        }
        
        this.setState({page: newPage});  
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        const { rowsPerPage } = this.state;
        const { messages, count } = this.props.inbox;
        const msgsLength = messages.length | 0;
        const limit = newRowsPerPage - rowsPerPage;
        
        if(newRowsPerPage < count) {
            if(msgsLength < newRowsPerPage){
                this.props.fetchMsgs(msgsLength, limit);
            }
           
            this.setState({rowsPerPage: +event.target.value, page: 0})
        }
    };

    handleDeleteMessage = (id: string) => () => {
        this.props.deleteMessageById(id);
    }
    
    render() {
        const { classes } = this.props;
        const { messages, count } = this.props.inbox;
        const { page, rowsPerPage } = this.state;

        return(
            <Paper className={classes.root} elevation={3}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && column.id === 'createdOn' ? column.format(value) : value}
                                            {column.id === 'action' ? <Button variant="contained" color="secondary" onClick={this.handleDeleteMessage(row._id)}>Delete</Button> : null}
                                        </TableCell>
                                        );
                                    })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                  </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 80, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
             </Paper>   
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    inbox: state.inbox
});

export default connect(mapStateToProps, { fetchMsgs, fetchMsgsCount, deleteMessageById, updateSeenMsg } )(withStyles(styles)(InboxTable));