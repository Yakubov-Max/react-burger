import React from "react";
import orderStyles from './OrderDetails.module.css'
import PropTypes from "prop-types"

const OrderDetails = ({orderNumber }) => (
  <div className={`pt-8 pb-30 ${orderStyles.container}`}>
    <p className={`pt-9 pb-8 text text_type_digits-large`}>{orderNumber}</p>
    <p className="text text_type_main-medium">идентификатор заказа</p>
    <div className={`mt-15 mb-15 ${orderStyles.checkMark}`}></div>
    <p className="pb-2 text text_type_main-default">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
  </div>
);

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}


export default OrderDetails