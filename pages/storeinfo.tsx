import { useState, useEffect } from "react";
import NavBar from "components/NavBar/navbar";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import Select from "react-select";
import UserService from "services/user.service";

export default function StoreInfo(props) {
  const userService = new UserService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState<any>([]);
  const [storeTags, setStoreTags] = useState<any>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get("api/tags");
        setTags(
          res.data.data.map((e: any) => {
            return { label: e.name, value: e.id };
          })
        );
      } catch (e) {
        console.log("e", e);
      }
    };
    getTags();
  }, []);

  const contactInfoSubmitHandler = async (data: any) => {
    console.log(data);
    try {
      const user = await userService.userDetails();
      const res = await axios.post("api/storeinfo", {
        ...data,
        userId: user.id,
        tags: storeTags.map((e: any) => e.value),
      });
      router.push({ pathname: "/dashboard" });
      toast.success(res.data.message, { autoClose: 3000 });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div className="container-fluid category-bg-container h-100 w-100 p-4">
          <form onSubmit={handleSubmit(contactInfoSubmitHandler)}>
            <h1 className="title">Store Info</h1>

            <div className="category-card-container p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mt-2 mb-2 about-head">About</h6>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <label className="label">Store name</label>
                  <input
                    type="text"
                    id="input-format"
                    className="w-100"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <span className="text-danger">Store name is required</span>
                  )}

                  <label className="label">Popular for</label>
                  <input
                    type="text"
                    id="input-format"
                    className="w-100"
                    {...register("popularFor", { required: true })}
                  />
                  {errors.popularFor && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <div>
                    <label className="label">Tags</label>
                    <Select
                      isMulti
                      name="colors"
                      instanceId="react-select1"
                      options={tags}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={storeTags}
                      closeMenuOnSelect={false}
                      onChange={(e: any) => setStoreTags(e)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
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
            </div>

            <div className="category-card-container mt-5 ">
              <div className="d-flex justify-content-between align-items-center p-3 pb-0">
                <h6 className="mt-2 mb-2 about-head">Contact</h6>
              </div>

              <div className="d-flex justify-content-between row p-3">
                <div className="d-flex flex-column col-12 col-md-12 col-lg-6 col-xl-6">
                  <label className="label">
                    Store full address
                    <input
                      type="text"
                      placeholder="Your Full Address..."
                      {...register("fullAddress", { required: true })}
                      id="input-format"
                      className="w-100"
                    />
                  </label>
                  {errors.fullAddress && (
                    <span className="text-danger">
                      Full Address is required
                    </span>
                  )}
                  <div>
                    <h3 className="text-center mt-5">Map</h3>
                  </div>
                </div>
                <div className="d-flex flex-column col-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="d-flex location ">
                    <div className="d-flex flex-column">
                      <label className="label">Location</label>

                      <input
                        type="text"
                        placeholder="Location..."
                        {...register("location", { required: true })}
                        id="input-format"
                        className="w-100"
                      />
                      {errors.location && (
                        <span className="text-danger">
                          Location is required
                        </span>
                      )}
                    </div>
                    <div className="d-flex flex-column">
                      <label className="label">Pincode</label>

                      <input
                        type="text"
                        placeholder="Your Location Pincode..."
                        {...register("pincode", { required: true })}
                        id="input-format"
                        className="ms-md-2 w-100"
                      />
                      {errors.pincode && (
                        <span className="text-danger">Pincode is required</span>
                      )}
                    </div>
                  </div>

                  <label className="label">E-mail</label>
                  <input
                    type="email"
                    placeholder="E-mail address..."
                    {...register("email", { required: true })}
                    className="w-100"
                    id="input-format"
                  />

                  {errors.email && (
                    <span className="text-danger">E-mail is required</span>
                  )}
                  <label className="label">
                    Phone
                    <input
                      type="text"
                      placeholder="Your Phone number..."
                      {...register("phone", { required: true })}
                      className="w-100"
                      id="input-format"
                    />
                  </label>
                  {errors.phone && (
                    <span className="text-danger">
                      Phone number is required
                    </span>
                  )}
                  <label className="label">
                    Website
                    <input
                      type="text"
                      placeholder="Your Website.."
                      {...register("website", { required: true })}
                      className="w-100"
                      id="input-format"
                    />
                  </label>
                  {errors.website && (
                    <span className="text-danger">Website is required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center p-3">
              <button type="submit" className="publish-btn">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
