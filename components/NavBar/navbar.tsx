import Bell from 'public/bell 1.png';
import Logo from 'public/Logo (2).svg';
import Image from 'next/image';
import dropIcon from 'public/drop-icon-nav.png';
import userimage from 'public/nav-user-img.png';
export default function NavBar () {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-bg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Image src={Logo} alt="logo" className='logo' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse d-flex justify-content-between " id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="navbar  d-flex justify-content-between ">
                            <div className="container-fluid">
                                <div className='ms-5'>
                                    <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div>
                            
                             </div>

                            </div>
                        </div>
                        
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <Image src={Bell} alt="image" className='bell-icon-nav me-2' />
                            <Image src={userimage} alt= "userImage" className='user-image-upload' />
                            <p className='pt-3 ms-2 me-3'>Username</p>
                            <a href="#">
                            <Image src={dropIcon} alt="drop-icon" className='drop-icon ' /> 
                            </a>
                        </div>

                </div>
               
            </div>
            </nav>
        </div>
    )
}