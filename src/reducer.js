import {CLEAR_CART,REMOVE,GET_TOTALS,TOGGLE_AMOUNT} from "./components/action";

function reducer(state, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }
  if (action.type === GET_TOTALS) {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  if (action.type === TOGGLE_AMOUNT) {
    let tempCart=state.cart.map((cartItem)=>{
      if(cartItem.id===action.payload.id){
        if(action.payload.type==="increase"){
          return {...cartItem,amount:cartItem.amount+1}
        }
        if(action.payload.type==="decrease"){
          return {...cartItem,amount:cartItem.amount-1}
        }
      }
      return cartItem
    }).filter(cartItem=>cartItem.amount!==0)
    return {...state,cart:tempCart}
  }
  return state;
}
export default reducer;
