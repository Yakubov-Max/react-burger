import React, {FC, ReactNode} from "react";
import modalStyles from "./ModalOverlay.module.css"

interface IModalOverlayInterface {
  children: ReactNode,
  handleClose: Function
}

const ModalOverlay: FC<IModalOverlayInterface> = ({ children, handleClose }) => {
  
  return (
    <div className={modalStyles.overlay} onClick={() => handleClose()}>
    {children}
  </div>
  )
}

export default ModalOverlay