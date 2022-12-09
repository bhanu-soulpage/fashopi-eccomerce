import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaEdit, FaSync } from "react-icons/fa";
import ModalWindow from "./Modal/modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export default function Card(props) {
  const [render, setRender] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit, formState, trigger } = useForm<any>();

  const deleteHandler = (id: any) => {
    axios
      .delete(`api/deletestore/${id}`, {
        headers: {
          Authorization: cookie.get("accessToken")
            ? `Bearer ${cookie.get("accessToken")}`
            : "",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        toast.success(res.data.message);
        setRender(!render);
      })
      .catch((e) => {
        toast.error("Something wrong!");
      });
  };

  useEffect(() => {
    axios
      .get("api/user/stores", {
        headers: {
          Authorization: cookie.get("accessToken")
            ? `Bearer ${cookie.get("accessToken")}`
            : "",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setData(res.data);
      })
      .catch(() => Router.push("/signup"));
  }, [render]);
  console.log(data);

  //UPDATE STORE

  const [show, setShow] = useState<any>(false);

  const [updatedStore, setUpdatedStore] = useState<any>({});

  const updateStoreHandler = (data) => {
    const updatedData = {
      title: data.title,
      description: data.description,
      email: data.email,
      website: data.website,
      phone: data.phone,
      fullAddress: data.fullAddress,
      location: data.fullAddress,
      popularFor: data.popularFor,
    };
    setUpdatedStore(updatedData);
    console.log(updatedStore);
  };

  const updateStore = async (id: any) => {
    console.log(id);
    updatedStore &&
      (await axios
        .put(
          `api/updateStore/${id}`,
          {
            ...updatedStore,
          },
          {
            headers: {
              Authorization: cookie.get("accessToken")
                ? `Bearer ${cookie.get("accessToken")}`
                : "",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          toast.success(res.data.message);
        })
        .catch((e) => {
          alert(e.message);
        }));
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const { errors } = formState;

  return (
    <>
      <div>
        <div>
          <div className="row g-2 ">
            {data.map((store: any, i: any) => {
              const {
                id,
                title,
                description,
                popular_for,
                fullAddress,
                location,
                pincode,
                phone,
                tags,
                email,
                website,
                created_at,
              } = store;
              return (
                <div
                  className="col-12 col-md-6 col-xl-4 text-start mb-sm-3"
                  key={id}
                >
                  {/* Modal Window Opens when user needed to update */}

                  <div className="p-3 bg-container-card">
                    <div className="d-flex justify-content-between">
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>Update Store Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={handleSubmit(updateStoreHandler)}>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Title
                              </label>
                              <input
                                type="text"
                                {...register("title", { required: true })}
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Store title"
                              />
                        

                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                E-mail
                              </label>
                              <input
                                {...register("email")}
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Store E-mail address"
                              />
                        

                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Phone number
                              </label>
                              <input
                                {...register("phone")}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter phone number "
                              />
                        

                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Full Address
                              </label>
                              <input
                                {...register("fullAddress")}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Full Address "
                              />
                              
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Location
                              </label>
                              <input
                                {...register("location")}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Location of Store "
                              />
                            
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Website
                              </label>
                              <input
                                {...register("website")}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Website of your Store "
                              />
                             
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Popular For
                              </label>
                              <input
                                {...register("popularFor")}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Your Store Popular for... "
                              />
                             
                            </div>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                {...register("description")}
                                rows={3}
                              />
                            
                            </Form.Group>
                            
                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn btn-danger me-2"
                                onClick={handleClose}
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </Modal.Body>
                      </Modal>
                      <p>{id}</p>
                      <p>
                        <b>Store Title</b>
                      </p>
                      <DropdownButton
                        key="up"
                        id="dropdown-button-drop-direction-up"
                        drop="up"
                        title=""
                      >
                        {/* <Dropdown.ItemText>
                            Dropdown item text
                          </Dropdown.ItemText> */}
                        <Dropdown.Item
                          as="button"
                          onClick={() => deleteHandler(id)}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Delete</span>
                            <FaTrash />
                          </div>
                        </Dropdown.Item>
                        <hr className="mt-1 mb-0" />

                        <Dropdown.Item as="button" onClick={handleShow}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Edit</span>
                            <FaEdit />
                          </div>
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <h3>{title}</h3>
                    <p>
                      <b>Description</b>
                    </p>
                    <p>{description}</p>
                    <p>
                      <b>E-mail</b>
                    </p>
                    <p>{email}</p>
                    <p>
                      <b>Phone</b>
                    </p>
                    <p>{phone}</p>
                    <p>
                      <b>Full Address</b>
                    </p>
                    <p>{fullAddress}</p>
                    <p>
                      <b>Location</b>
                    </p>
                    <p>{location}</p>
                    <p>
                      <b>Website</b>
                    </p>
                    <p>{website}</p>
                    <p>
                      <b>Popular for</b>
                    </p>
                    <p>{popular_for}</p>
                    <div className="text-end">
                      <Button onClick={() => updateStore(id)} variant="danger">
                        <div className="d-flex  align-items-center">
                          <FaSync />
                          <span> Update Changes</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
