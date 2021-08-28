import React, { useState, useEffect } from 'react';
import { ModalBox, Button } from '../../component'
import { ModalBody, ModalFooter } from 'reactstrap';


function ConfirmBox(props) {
  var [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.showConfirmBox.open) {
      setIsOpen(true)
    }
  }, [props.showConfirmBox.open]);

  return (
    <ModalBox open={isOpen} className={"smallmodalBox confirm-box"}>
      <ModalBody>
        {props.showConfirmBox.content}
      </ModalBody>
      <ModalFooter>
        <Button
          buttonType="primary"
          size="md"
          buttonClick={() => {
            setIsOpen(false);
            props.hideConfirmBox();
            props.showConfirmBox.onOk();
          }}
          innerContent="Ok"
        />
        <Button
          buttonType="secondary"
          size="md"
          buttonClick={() => {
            setIsOpen(false);
            props.hideConfirmBox();
            props.showConfirmBox.onCancle();
          }}
          innerContent="Cancel"
        />
      </ModalFooter>
    </ModalBox>
  )
}


export default ConfirmBox;