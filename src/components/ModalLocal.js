import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const ModalLocal= (props) => {

  return (
    <div>
      <Modal show={props.showModal} onHide={props.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.showModal === true ?
            props.modalUser.name.first+' '+props.modalUser.name.last : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.showModal === true ?
            <div className= 'modal-body'>
              <img src= {props.modalUser.picture.large}></img>
              <div>Username: {props.modalUser.login.username}</div>
              <div>DOB: {props.modalUser.dob}</div>
              <div>City: {props.modalUser.location.city}</div>
              <div>Email: {props.modalUser.email}</div>
            </div>
            : <noscript/>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default ModalLocal;