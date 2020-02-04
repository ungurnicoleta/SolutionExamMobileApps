import Note from "../../model/note";
import {ADD_NOTES, TOGGLE_FAVORITE} from "../actions/notes";

const NOTES = [
    new Note(1, "N1", "open", "S1", 10, 11),
    new Note(2, "N2", "open", "S2", 20, 21)
];


const initialState = {
    notes: NOTES,
    favNotes: []
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTES:
            const id = Math.random().toString(36).replace(/[^1-9]+/g, '').substring(0,5);
            const newNote = new Note(id, action.name, action.status, action.student, action.eCost, action.cost);
            const existingNotes = [...state.notes];
            return {...state.favNotes, notes:existingNotes.concat(newNote)}
        case TOGGLE_FAVORITE:
            break;
        default:
            break;
    }
};

export default notesReducer;
