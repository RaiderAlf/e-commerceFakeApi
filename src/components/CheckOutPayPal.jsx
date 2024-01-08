//COMPONENTS
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckOut = () => {

    //PayPal OPTIONS
    const initialOptionsPayPal = {
        clientId: "AU4KQ4stdYreCKSiPVXd8cjgSJx-KKOL2rK-T2NdoeFBNNDL01pmCGhChfKME2WTP76KPuCyMmLSmHdH",
        currency: "USD",
        intent: "capture",
    };

    // function createOrder() {
    //     return fetch("/my-server/create-paypal-order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         // use the "body" param to optionally pass additional order information
    //         // like product ids and quantities
    //         body: JSON.stringify({
    //             cart: [
    //                 {
    //                     id: "YOUR_PRODUCT_ID",
    //                     quantity: "YOUR_PRODUCT_QUANTITY",
    //                 },
    //             ],
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((order) => order.id);
    // }

    // function onApprove(data) {
    //     return fetch("/my-server/capture-paypal-order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             orderID: data.orderID
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((orderData) => {
    //             const name = orderData.payer.name.given_name;
    //             alert(`Transaction completed by ${name}`);
    //         });

    // }


    return (
        <PayPalScriptProvider options={initialOptionsPayPal}>
            <PayPalButtons style={{ layout: "vertical" }} />
        </PayPalScriptProvider>
    )

}

export default CheckOut