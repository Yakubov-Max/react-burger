import React from "react";
import Modal from "../modal/Modal";
import ingridientStyles from "./IngridientDetails.module.css"
import PropTypes from "prop-types"
import { ingridientShape } from "../utils/proptypes" 

function IngridientDeatils({ ingridient, handleClose }) {
  return (
    <Modal handleClose={handleClose}>
      <h3 className={`${ingridientStyles.header} pl-10 pt-10 text text_type_main-large text_color_primary`}>Детали ингредиента</h3>
      <img className={ingridientStyles.image} src={ingridient.image} alt={ingridient.name} />
      <p className="pb-8 pt-4 text text_type_main-medium text_color_primary">{ingridient.name}</p>
      <ul className={`mb-15  ${ingridientStyles.listContainer}`}>
        <li>
          <p className="pb-2 text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingridient.calories}</p>
        </li>
        <li>
          <p className="pb-2 text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingridient.proteins}</p>
        </li>
        <li>
          <p className="pb-2 text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingridient.fat}</p>
        </li>
        <li>
          <p className="pb-2 text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingridient.carbohydrates}</p>
        </li>
      </ul>
    </Modal>
  )
}

IngridientDeatils.propTypes = {
  ingridient: ingridientShape.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default IngridientDeatils