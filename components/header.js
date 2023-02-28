import { useState } from "react";
import Image from 'next/image'
import { delToken } from "../lib/auth";

export default function User(props) {
    // const [showSidebar, SetshowSidebar] = useState(false);
    const capitalize = e => e && e[1].toUpperCase() + e.slice(2)

    return (
        <>
            <header className="header header-sticky mb-4">
                <div className="container-fluid">
                    <button className="header-toggler px-md-0 me-md-3" type="button" onClick={props.handler} >
                        <img className="icon icon-lg" src={'/assets/icons/menu.svg'} alt='next' />
                    </button>
                    <a className="header-brand d-md-none" href="#">
                        <img className="icon icon-lg" width="118" height="46" src={'/assets/brand/coreui.svg'} alt='next' />
                    </a>
                    <ul className="header-nav d-none d-md-flex">
                        <li className="nav-item"><a className="nav-link" href="#">{capitalize(props.pathname)}</a></li>
                    </ul>
                    <ul className="header-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <img className="icon icon-lg" src={'/assets/icons/bell.svg'} alt='next' />
                            </a>
                        </li>
                    </ul>
                    <ul className="header-nav ms-3">
                        <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-md">
                                <Image className="avatar-img" src={"/assets/img/avatars/9.jpg"} alt="user@email.com" width={100} height={100} />
                            </div>
                        </a>
                            <div className="dropdown-menu dropdown-menu-end pt-0">
                                <div className="dropdown-dividerx mt-2"></div>
                                    <a className="dropdown-item" href="#">
                                        <img className="icon me-2" src={'/assets/icons/user.svg'} alt='next' />Profile
                                    </a>
                                    <a className="dropdown-item" href="" onClick={() => delToken() }>
                                        <img className="icon me-2" src={'/assets/icons/account-logout.svg'} alt='next' />Logout
                                    </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="header-divider" style={{ display: "none" }}></div>
                <div className="container-fluid" style={{ display: "none" }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb my-0 ms-2">
                            <li className="breadcrumb-item">
                                <a href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item active"><span>Tables</span></li>
                        </ol>
                    </nav>
                </div>
            </header>
        </>
    )
}