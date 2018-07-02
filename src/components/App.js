import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteTicket } from '../actions';
import { bindActionCreators } from 'redux';
import { tickets } from '../reducers';
import moment from 'moment';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            description: '',
            dueDate: ''
        }

    }

    // this is to render the view when we add a reminder
    renderReminders() {
        const { tickets } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    tickets.map(ticket => {
                        return (
                            <li key={ticket.id} className="list-group-item">
                                <div className="list-item">
                                    <div className="titleCard">{ticket.text}</div>
                                    <div className="descriptonCard"><em>{ticket.description}</em></div>
                                    <div><em>{moment(new Date(ticket.dueDate)).fromNow()}</em></div>
                                </div>
                                <div
                                    className="list-item delete-button"
                                    onClick={() => this.deleteTicket(ticket.id)}
                                >
                                    &#x2715;
                        </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    //for the add reminder button
    //update the state
    addReminder() {
        console.log('this.state.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate, this.state.description);
    }

    // clear the form on submit
    deleteTicket(id) {
        this.props.deleteTicket(id);
    }

    render() {

        //return the JSX 
        return (
            <div className="App">
                <div className="title">
                    Ticket Builder
             </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Ticket name..."

                            //update the event and state here
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <input
                            className="form-control"
                            placeholder="Description..."

                            //update the description and state here
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </div>
                    <input
                        className="form-control"
                        type="datetime-local"
                        onChange={event => this.setState({ dueDate: event.target.value })}
                    />
                    <br />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.addReminder()}>

                        Add Ticket
                    </button>
                </div>
                {this.renderReminders()}
            </div>
        )
    }
}

//update the state for the redux store
function mapStateToProps(state) {
    return {
        tickets: state
    }
}


export default connect(mapStateToProps, { addReminder, deleteTicket })(App);