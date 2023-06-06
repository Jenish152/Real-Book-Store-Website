import React, { useEffect, useState } from "react";
import { Typography, Button, Link } from "@material-ui/core";
import cartService from "../../sevices/cart.service";
import { useAuthContext } from "../../context/auth.context";
import { toast } from "react-toastify";
import orderService from "../../sevices/order.service";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        toast.error("updated");
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.key==="SUCCESS") {
        try {
          let cartIds = userCart.result.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            toast.success("Your order place successfully");
            navigate("/");
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  return (    
      <div className="container">
       <h1 className="heading">CART PAGE</h1>
        <div className="cart-heading-block">
        <div className="total-items">Total Items: {itemsInCart}</div>
          <div className="total-price">Total price: {totalPrice}</div>
        </div>
        <div className="row">
        {cartList.map((cartItem,index) => {
           return (
            
            <div className="card col-3 m-4" key={index}>
            <img
              src={cartItem.book.base64image}
              className="card-img-top"
              alt="..."
              height="200px"
            />
            <div className="card-body">
              <h5 className="card-title">
              {cartItem.book.name}
              </h5>
              <div className="qty-group">
                     <Button
                       className="btn pink-btn"
                       onClick={() => updateQuantity(cartItem, true)}
                     >
                       +
                     </Button>
                     <span className="number-count">{cartItem.quantity}</span>
                     <Button
                       className="btn pink-btn"
                       onClick={() => updateQuantity(cartItem, false)}
                     >
                       -
                     </Button>
                   </div>
              <p className="price">MRP. {cartItem.book.price}</p>
              <Button
                className="btn-outline-primary btn"
                variant="contained"
                type="button"
                color="primary"
                onClick={()=>{
                    removeItem(cartItem.id)
                }}
              >
                Remove
              </Button>
            </div>
          </div>




             
           );
         })}
        </div>
        
        <div className="btn-wrapper">
          <Button variant="outlined" color="primary" className="btn" onClick={placeOrder}>
            Place order
          </Button>
        </div>
      </div>
  );
};

export default Cart;
