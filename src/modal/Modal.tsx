import React, { useEffect, FC, ReactNode, SyntheticEvent } from "react";
import ReactDOM from 'react-dom';
import modalStyles from "./Modal.module.css"
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types"

interface IModal {
  children: ReactNode,
  handleClose: Function
}

export const Modal: FC<IModal> = ({ children, handleClose }) => {

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener('keyup', handleEscKey)

    return () => {
      document.removeEventListener('keyup', handleEscKey)
    }
  }, [handleClose])
  
  return ReactDOM.createPortal(
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.container} onClick={stopPropagation}>
          <button type='button' className={`${modalStyles.closeButton}`} onClick={() => handleClose()}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </ModalOverlay>
    ),
    document.getElementById('modal-root')!,
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Modal