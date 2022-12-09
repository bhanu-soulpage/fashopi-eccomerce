import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Bell from "public/bell 1.png";
import Logo from "public/Logo (2).svg";
import Image from "next/image";
import dropIcon from "public/drop-icon-nav.png";
import userimage from "public/nav-user-img.png";
import router from "next/router";
import AuthenticationService from "services/authentication.service";
import cookie from "js-cookie";
import ModalWindow from "components/Modal/modal";
import { useUser } from "lib/hooks";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export const fetcher = (url: any) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
  }).then((r) => r.json());

function ReactNav() {
  const [user] = useUser();
  if (!user) return <div>Loading ...</div>;

  const authService = new AuthenticationService();
  const logoutHandler = async () => {
    await authService.purgeAuth();
    router.push("/signup");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Image src={Logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              <div className="d-flex btn-container-db">
                <Link href="/dashboard" className="category-links-side-nav">
                  <button className="dashboard-btn btn btn-primary">
                    Dashboard
                  </button>
                </Link>

                <Link
                  href="/storeinfo"
                  className="category-links-side-nav ms-2"
                >
                  <button className="create-btn btn btn-secondary">
                    Create Store
                  </button>
                </Link>
              </div>
            </Nav.Link>
              
              <Nav.Link className="mt-md-3 ms-sm-1">
                <div>
                    <ModalWindow />
                  </div>
              </Nav.Link>
              <Nav.Link className="mt-md-3 ms-sm-1">
                <FaUserCircle className="user-profile-icon"/>
              </Nav.Link>
              <Nav.Link className="mt-md-3 ms-sm-1">
                  {user.firstName + user.lastName}
              </Nav.Link>
              <Nav.Link className="mt-md-2 ms-sm-1">
              <button onClick={logoutHandler} className="btn btn-danger">
                  Logout
                </button>

              </Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ReactNav;
