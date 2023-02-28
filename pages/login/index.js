import { useState } from "react";
import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import Head from 'next/head'

export default function  Login() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {email, password}
        const host = `http://36.94.216.133:8081/api/login-user`
        const user = await fetch(host, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.status == 200) {
                Cookies.set('token', data.data.access_token)
                router.push("/social")
                setLoading(false)
            }else{
                setLoading(false)
                setErrors(true)
                console.log('Error:', data.status)
            }
        })
        .catch((err) => {
            setLoading(false)
            console.error('Error:', err);
        })
    }

    return (
        <>
        <Head>
            <title>Login</title>
            <style>{'body { background-color: #f8f9fa !important; }'}</style>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </Head>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center vh-100">
                    <div className="col-md-5">
                        <div className="login-wrap p-4 p-md-5">
                        <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-user-o"></span>
                        </div>
                            <h3 className="text-center mb-4">Sign In</h3>
                            <form className="mt-0" onSubmit={(e) => handleSubmit(e)}>
                                {errors? (
                                    <div className="alert alert-danger" role="alert">
                                    Incorrect username or password. 
                                </div>
                                ):("")}
                                <div className="mb-3">
                                    {/* <label htmlFor="email" className="form-label">Email address</label> */}
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        onChange={(e) => [setEmail(e.target.value), setErrors("")]}
                                    />
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="password" className="form-label">Password</label> */}
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        onChange={(e) => [setPassword(e.target.value),  setErrors("")]}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className="d-grid">
                                    {loading ? (
                                        <button type="submit" className="btn btn-primary form-control">
                                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                                            <span className="ml-2"> Loading...</span>
                                        </button>
                                        ) : (
                                        <button type="submit" className="btn btn-primary form-control">
                                            <span className="ml-2"> Sign In</span>
                                        </button> 
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
            {`
            .form-control {
                height: 52px;
            }
            .login-wrap  {
                background: #fff;
                border-radius: 10px;
                -webkit-box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
                -moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
                box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
            }
            .login-wrap .icon {
                width: 80px;
                height: 80px;
                background: #1089ff;
                border-radius: 50%;
                font-size: 30px;
                margin: 0 auto;
                margin-bottom: 10px;
            }
            .login-wrap .icon span {
                color: #fff;
            }
            .login-wrap h3 {
                font-weight: 300;
            }
            `}
            </style>
        </>
    )
}