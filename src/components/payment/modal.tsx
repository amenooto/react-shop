import {ReactChild, SyntheticEvent} from "react";
import {createPortal} from "react-dom";

const ModalPortal = ({ children }: { children: ReactChild }) => {
    return createPortal(children, document.getElementById('modal')!)
}

export const PaymentModal = ({ show, proceed, cancel }:
                                 { show: boolean, proceed: () => void, cancel: () => void }) => {
    return show ? (
        <ModalPortal>
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal__inner">
                    <p>Are you sure?</p>
                    <div>
                        <button onClick={proceed}>Yes</button>
                        <button onClick={cancel}>No</button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    ) : null
}