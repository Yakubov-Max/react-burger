import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import modalStyles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types"

function Modal({ children, handleClose }) {
  const modalRoot = document.getElementById('modal-root')

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      handleClose()
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey)

    return () => {
      document.removeEventListener('keyup', handleEscKey)
    }
  }, [])

  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.container} onClick={stopPropagation}>
          <button type='button' className={`${modalStyles.closeButton}`} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalRoot,
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Modal