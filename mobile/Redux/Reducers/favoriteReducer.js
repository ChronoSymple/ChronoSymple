// Store/Reducers/favoriteReducer.js

const initialState = { token: '',
idCurrentModule: -1 }

function toggleFavorite(state = initialState, action) {
	let nextState
	switch (action.type) {
		case 'TOGGLE_FAVORITE': {
			nextState = {
				...state,
				token: action.value
			}
			return nextState
		}
 		case 'CURRENT_MODULE': {
			console.log(action.value)
			nextState = {
				...state,
				idCurrentModule: action.value
			}
			return nextState
		}
		
		default:
			return state
		}
	}
	

export {toggleFavorite};
export default toggleFavorite;