import { ADD_REMINDER, DELETE_TICKET } from '../constant';

export const addReminder = (text, dueDate, description) => {
    const action = {
        type: ADD_REMINDER,
        text,
        description,
        dueDate
    }
    console.log('actions in addReminder', action);
    return action;
}

export const deleteTicket = (id)=>{
    const action = {
        type: DELETE_TICKET,
        id
    }
    console.log('deleting in action')
    return action
}