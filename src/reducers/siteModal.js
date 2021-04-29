const initState={openClose:"closed",content:""};
export default(state=initState,action)=>{
    console.log(state,action);
    if(action.type==='OPEN_MODAL'){
        return action.payload;
    }
    return state;
}