export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    user: null,
    access_token: sessionStorage.getItem('access_token')
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'set_user':

      const { user, access_token } = action.payload
      
      sessionStorage.setItem('access_token', access_token);
      console.log(access_token);
      

      return {
        ...store,
        user: user,
        access_token: access_token
      };

    default:
      throw Error('Unknown action.');
  }    
}
