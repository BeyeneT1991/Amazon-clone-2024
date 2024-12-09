// import React, { useContext, useState, useEffect } from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import classes from "./Orders.module.css"
// import { db } from '../../Utility/firebase'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import ProductCard from '../../Components/Product/ProductCard'

// function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);
  
//   useEffect(() => {
//     if (user) {

//       // dispatch({
//       //   type: "LOG_ACTIVITY",
//       //   payload: "User viewed their orders",
//       // });
      
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log(snapshot);
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });
//     } else {
//       setOrders([]); // Reset orders if the user is not logged in
//     }
//   }, [user, dispatch]);
    
//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.order_container}>
//           <h2>Your Orders</h2>
//           {orders?.length === 0 && (
//             <div style={{ padding: "20px" }}>You don't have orders yet</div>
//           )}
//           {/* Ordered items */}
//           <div>
//             {orders?.map((eachOrder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p>Order ID: {eachOrder?.id}</p>
//                   {eachOrder?.data?.basket?.map((order) => (
//                     <ProductCard flex={true} product={order} key={order.id} />
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders







import React, { useContext, useState, useEffect } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from "./Orders.module.css";
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users") // Ensure collection name is 'users'
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]); // Reset orders if the user is not logged in
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet</div>
          )}
          {/* Display ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard key={order.id || order.name} flex={true} product={order} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
