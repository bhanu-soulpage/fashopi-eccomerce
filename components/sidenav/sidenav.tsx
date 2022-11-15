import dashboardIcon from 'public/icons-01 9.png';
import Image from 'next/image';
import Link from 'next/link';

export default function SideNav() {
    return (
        <div>
            <div className="card-container">
                <div className="d-flex flex-column justify-content-start text-center pt-2">
                    <span className='shop-name'>Chandana Brothers</span>
                    <span className='store-address'>Ameerpet,Hyderabad</span>
                    <span>Verified</span>
                </div>
                <div className="first-column  pt-0">
                 
                        <Link href='/dashboard' className='category-links-side-nav'>

                        <div className='category-side-nav'>

                        <div className='d-flex pt-3 ms-3'>
                            <Image src={dashboardIcon} alt = "dasfboarf" className = "dashboard-icon first-column-icons" />
                                <p className='name '>DashBoard</p>
                               
                            </div>
                        </div>
                        </Link>

                       
                        <Link href="/storeinfo" className='category-links-side-nav'>
                        <div className='category-side-nav'>
                                <div className='d-flex pt-3 ms-3'>
                                    <Image src={dashboardIcon} alt = "dasfboarf" className = "dashboard-icon first-column-icons" />
                                        <p className='name'>Store Info</p>
                                </div>    
                        </div>
                        </Link>

               
                 <Link href='/' className='category-links-side-nav'>
                 <div className='category-side-nav'>
                        <div className='d-flex pt-3 ms-3'>
                                <Image src={dashboardIcon} alt = "dasfboarf" className = "dashboard-icon first-column-icons" />
                                <p className='name'>Insights</p>
                            </div>
                        </div>
                 </Link>
                       
                                       
                        <div className=' category-side-nav '>
                        <a className='category-links-side-nav'>

                        <div className='d-flex pt-3 ms-3'>
                                <Image src={dashboardIcon} alt = "dasfboarf" className = "dashboard-icon first-column-icons" />
                                <p className='name'>Offers & Discounts</p>
                            </div>
                            </a>
                        </div>
                        <hr className='h-line'/>
                 
                </div>
         </div>
           
        </div>
    )
}