import axios from "axios";
import { useState } from "react";
import Image   from "next/image";
import Internet from 'public/globe 1.png';
import phone from 'public/phone.png'
import location from 'public/location.png'
import { FaEnvelope,FaSmile ,FaMapMarkedAlt} from "react-icons/fa";

export default function Home() {

  const [allStores,setAllStores] = useState<any>([])

  axios
    .get('api/stores')
    .then((res) => {
      setAllStores(res.data)
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div>
      <div className="container-fluid bg-all-stores">
          <div className="container">
            <div className="row">
            <h1 className="text-center mt-3">All Stores</h1>
            {allStores.map((ele)=>{
              return(
              <div className="col-12 col-md-6">
                <div className="all-card-container p-4">
                    <h1 className="title-all-stores mb-3">{ele.title}</h1>
                    <p className="sub-titles mb-1">Description : -</p>
                    <p className="all-stores-description">
                      {ele.description}
                    </p>
                    <div className="d-flex">
                        <Image className="all-stores-icons"  src={phone} alt="joi" />
                        <span className="all-stores-sub ms-lg-5">{ele.phone}</span>
                    </div>
                    <div className="d-flex">
                        <Image className="all-stores-icons"  src={Internet} alt="joi" />
                        <span className="all-stores-sub ms-lg-5">{ele.website}</span>
                    </div>
                    <div className="d-flex">
                        <Image className="all-stores-icons"  src={location} alt="joi" />
                        <span className="all-stores-sub ms-lg-5">{ele.location}</span>
                    </div>
                    <div className="d-flex">
                      <FaEnvelope className="email-icon"/>
                        <span className="all-stores-sub ms-lg-5">{ele.email}</span>
                    </div>
                    <div className="d-flex">
                      <FaMapMarkedAlt className="full-address-icon"/>
                        <span className="all-stores-sub ms-lg-5"><b>{ele.fullAddress}</b></span>
                    </div>
                    <div className="d-flex">
                      <FaSmile className="email-icon"/>
                        <span className="all-stores-sub ms-lg-5">Popular For <b>{ele.popularFor}</b></span>
                    </div>
                    
                </div>
              </div>)
              })}
              </div>
          </div>
        </div>
    </div>
  );
}

// function getUserInfo()User {

// }
