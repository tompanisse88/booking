
const posts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case 'NEW_BOOKING':
            //console.log("state:::::");
            //console.log(state);
            //console.log("actionpayload:::::");
            //console.log(action.payload);
            //return [...state, action.payload];
            return state.map( (post) => post.deskID == action.payload.deskID ? action.payload : post )
        case 'DELETE':
            return state //.filter((post) => post._id != action.payload);
        default:
            return state;
    }
}
export default posts;