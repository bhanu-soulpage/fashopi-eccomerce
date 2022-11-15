import NavBar from "components/NavBar/navbar";
import SideNav from "components/sidenav/sidenav";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import EditIcon from "public/edit.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import AuthenticationService from "services/authentication.service";

export default function StoreInfo() {
  const authService = new AuthenticationService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [storeInfo, setStoreInfo] = useState("");

  const submitHandler = async (data: any) => {
    const enteredData: any = {
      storename: data.storename,
      storeid: data.storeid,
      tags: data.tags,
      popular: data.popular,
      description: data.description,
    };
    axios
      .post("api/storeinfo", enteredData)
      .then(function (response) {
        router.push({
          pathname: "/dashboard",
        });
        toast.success("Success", { autoClose: 3000 });
      })
      .catch(function (error) {
        alert(error.message);
      });
    console.log(enteredData);
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <SideNav />
        <div className="p-2 container category-bg-container">
          <h1>Store Info</h1>
          <div>
            <a>Home</a>
            <a>Storeinfo</a>
          </div>
          <div className="category-card-container">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mt-2 mb-2 about-head">About</h6>
                <button type="submit" className="edit-btn">
                  <Image src={EditIcon} alt="edit" className="edit-icon" />
                </button>
              </div>
              <div className="d-flex">
                <div>
                  <div className="d-flex">
                    <div className="me-3">
                      <label className="label">Store name</label>
                      <input
                        type="text"
                        id="input-format"
                        {...register("storename", { required: true })}
                      />
                      {errors.storename && (
                        <span className="text-danger">
                          Store name is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="label">Store id</label>
                      <input
                        type="text"
                        id="input-format"
                        {...register("storeid", { required: true })}
                      />
                      {errors.storeid && (
                        <span className="text-danger">
                          Store ID is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <label className="label">Tags</label>
                    <input
                      type="tag"
                      id="input-format"
                      className="tag"
                      {...register("tags", { required: true })}
                    />
                    {errors.tags && (
                      <span className="text-danger">Tags are required</span>
                    )}

                    <label className="label">Popular for</label>
                    <input
                      type="text"
                      id="input-format"
                      className="popular"
                      {...register("popular", { required: true })}
                    />
                    {errors.popular && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="ms-5 mb-4">
                  <span className="ms-3 mt-1 label">Description</span>
                  <FloatingLabel controlId="floatingTextarea2" label="">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "180px" }}
                      {...register("description", { required: true })}
                    />
                  </FloatingLabel>
                  {errors.description && (
                    <span className="text-danger ms-3">
                      Description is required
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
          <pre>{JSON.stringify(storeInfo, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
