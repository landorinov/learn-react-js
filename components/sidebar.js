import Link from 'next/link'
import { useState } from "react";
import { useRouter } from 'next/router';

export default function User(props) {
    const router = useRouter();

    // const [showSidebar, SetshowSidebar] = useState(false);
    const [showNavGroup, SetshowNavGroup] = useState(false);
    const handlerNav  = () => {
        SetshowNavGroup(!showNavGroup)
    }
    
    return (
        <>
            <div className={`sidebar sidebar-dark sidebar-fixed ${props.showSidebar ? "hide" : ""}`} id="sidebar">
                <div className="sidebar-brand d-none d-md-flex">
                    <img className="sidebar-brand-full" width="56" src={'/assets/brand/logo.png'} alt='next' style={{ position: "fixed" }} />
                    <img className="sidebar-brand-narrow" width="56" src={'/assets/brand/logo.png'} alt='next' />
                </div>
                <ul className="sidebar-nav" data-coreui="navigation" data-simplebar>
                    {/* <li className="nav-item">
                        <Link className={`nav-link ${router.pathname == "/dashboard" ? "active" : ""}`} href="/dashboard">
                            <img className="nav-icon" src={'/assets/icons/speedometer.svg'} alt='next' /> Dashboard
                        </Link>
                    </li> */}
                    {/* <li className={`nav-group ${showNavGroup ? "hide" : "show"}`}> */}
                        <a className="nav-link nav-group-toggle" style={{ 'display': "none" }} href="#" onClick={ /* () => SetshowNavGroup(!showNavGroup) */ handlerNav }>
                            <img className="nav-icon" src={'/assets/icons/cursor.svg'} alt='next' /> Sosial
                        </a>
                        {/* <ul className="nav-group-items"> */}
                            <li className="nav-item"><Link className={`nav-link ${router.pathname == "/social" ? "active" : ""}`} href="/social"><span className="nav-icon"></span> Sosialisasi Sekolah</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${router.pathname == "/schools" ? "active" : ""}`} href="/schools"><span className="nav-icon"></span> Daftar Sekolah</Link></li>
                        {/* </ul> */}
                    {/* </li> */}
                </ul>
                <button className="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
            </div>
        </>
    )
}