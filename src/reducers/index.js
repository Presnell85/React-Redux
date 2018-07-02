import { ADD_REMINDER, DELETE_TICKET } from '../constant';
import { bake_cookie, read_cookie } from 'sfcookies';


const ticket = (action) => {
    let { text, dueDate, description } = action;
    return {
        //assign a random id number
        id: Math.random(),
        text,
        description,
        dueDate
    }
}

const removeTheTicket = (state = [], id) => {
    const tickets = state.filter(ticket => ticket.id !== id);
    return tickets;
}

const tickets = (state = [], action) => {
    let tickets = null;
    state = read_cookie('tickets');
    switch (action.type) {
        case ADD_REMINDER:
            // grab a random id: and assign and id to the new object in the array of reminders
            tickets = [...state, ticket(action)]
            //local storage using cookies
            bake_cookie('tickets', tickets)
            // return the array of state
            return tickets;
        case DELETE_TICKET:
            tickets = removeTheTicket(state, action.id);
            bake_cookie('tickets', tickets)
            return tickets;
        default:
            return state;
    }
}

export default tickets;