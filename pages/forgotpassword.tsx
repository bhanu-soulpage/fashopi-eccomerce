import axios from "axios";
import { useForm } from "react-hook-form";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import Router from "next/router";
export default function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm();

  const submitHandler = async (data) => {
    try {
      await axios.post("api/auth/forgot", data).then((res) => {
        console.log(res);
        toast.success("Successfully Sent");
        Router.push(`/resetpassword?reset=${res.data.message.reset}`);
      });
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };
  return (
    <div>
      <div className="container  forgot-pass mt-5">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="d-flex flex-column justify-content-center  align-items-center">
            <input
              type="text"
              placeholder="Enter email address"
              {...register("email", { required: true })}
            />

            <button className="btn btn-secondary mt-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
