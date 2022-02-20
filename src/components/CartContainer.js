import React,{useCallback,useEffect} from "react";
import CartItem from "./CartItem";
import { useSelector,useDispatch } from "react-redux";
import { GET_TOTALS,CLEAR_CART } from "./action";
const CartContainer = () => {
  
  const cart=useSelector(state=>state.cart);
  const total=useSelector(state=>state.total);
  const dispatch=useDispatch()
  const getTotal=useCallback(()=>{
    dispatch({type:GET_TOTALS})
  },[dispatch])
  const clearCart=useCallback(()=>{
    dispatch({type:CLEAR_CART})
  },[dispatch])
    useEffect(()=>{
      getTotal()
    },[cart])


  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}

      <article>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </article>

      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={()=>clearCart()}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
