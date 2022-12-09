import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import Edit from 'public/edit.png';
export default function ModalWindow() {

  const [show, setShow] = useState<any>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button  onClick={handleShow} className="bg-white-btn p-0">
        <Image src= {Edit} alt = "image" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="form-group d-flex flex-column">
              <label htmlFor="exampleFormControlFile1">Upload profile pic</label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
            </div>
          </form>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

