 const authReducer=(state={},action)=>{
     console.log(action,state)
     if(action.type==="REGISTER_ACTION"){
         return  action.payLoad ;
     }

   else if(action.type==='LOGOUT'){
       return {};
   }
     else{

         return state;
     }
}


export default authReducer;