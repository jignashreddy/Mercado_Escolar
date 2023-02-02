import React, {useEffect, useState} from 'react';
import NaviBar1 from '../layout/NaviBar1';
import OrderService from "../../services/OrderService";
import {NotificationManager} from "react-notifications";
function BusinessDashboard() {
  var [loading, setLoading] = useState(false);
  var [datas, setDatas] = useState([]);

  var enableSpinner = () => {
    loading = true;
    setLoading(loading) ;
  }

  var disableSpinner = () => {
    loading = false;
    setLoading(loading) ;
  }

  useEffect(() => {
    enableSpinner();
    OrderService.my_store_latest_order().then((res) => {
      datas = res.data.orders ? res.data.orders : [];
      setDatas(datas);

      disableSpinner();
    })
        .catch((err) => {
          disableSpinner();
          NotificationManager.error('Error message', err.response.data.message);
        })
  }, []);
  return (
      <div>
        {loading ? (
            <div id="overlay">
              <div className="cv-spinner">
                <span className="spinner"></span>
              </div>
            </div>
        ) : (
            <span></span>
        )}
      <div className='businessDashboard'>
        <NaviBar1 />
        <div className="main2">
          <h2>Latest Orders</h2>

          <table className="orders_table">
            <thead>
              <tr>
                <th className="order-number">Order</th>
                <th className="order-status">Status</th>
                <th className="order-customer">CUSTOMER</th>
                <th className="order-total">Total</th>
                <th className="order-date">DATE</th>
              </tr>
            </thead>

            <tbody>
              {datas.map(function(data, i){
                return (
                    <tr key={i} className="order">
                      <td className="order-number" data-title="Order">
                        #{data.order_id}
                      </td>
                      <td className="order-status" data-title="Status">
                        {data.order_status}
                      </td>
                      <td className="order-customer" data-title="Customer">
                        {data.first_name} {data.last_name}
                      </td>
                      <td className="order-total" data-title="Total">
                        ${data.order_price}
                      </td>
                      <td className="order-date" data-title="Date">
                        {data.order_date}
                      </td>
                    </tr>
                );
              })}
            </tbody>
          </table>



        </div>
      </div>
      </div>
  );
}

export default BusinessDashboard;
