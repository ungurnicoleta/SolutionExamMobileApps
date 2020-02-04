export const ADD_NOTES = 'ADD_NOTES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';


export const addNotes = (name, status, student, eCost, cost) =>{
  return {type: ADD_NOTES, name: name, status: status, student: student, eCost: eCost, cost: cost }
};


export const toggleFavorite = id =>{
    return {type: TOGGLE_FAVORITE, noteId: id}
};
