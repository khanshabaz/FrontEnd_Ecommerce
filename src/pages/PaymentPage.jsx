import { useEffect } from "react";
import Payment from "../features/payment/Payment";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";


export default function PaymentPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        //reset cart
        dispatch(resetCartAsync());
        dispatch(resetOrder());
        //reset order
      }, [dispatch]);
    return(
        <>
       <Payment/>
        </>
    )
}