import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import { CButton, CModal,CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import { defaultvalue } from "../msg";
// import { defaultvalue } from "../text";
import Cookies from 'js-cookie'
import axios from 'axios';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function User() {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [limitSchool, setLimitSchool] = useState(100)
    const [sendEmail, setSendEmail] = useState("")

    const [totalElements, setTotalElements] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [number, setNumber] = useState("")

    const [pageCount, setpageCount] = useState(0);
    const [numberList, setnumberList] = useState(1);
    const [exportUrl, setExportUrl] = useState(1);

    const [users, setUsers] = useState([])
    const [usersData, setUsersData] = useState([])
    const [schools, setschools] = useState([])
    const [types, settypes] = useState([])
    const [regions, setRegions] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleExport, setVisibleExport] = useState(false)
    const [visibleImport, setVisibleImport] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleEmail, setVisibleEmail] = useState(false)

    const [inputs, setInputs] = useState({
        nama: "",
        hp: "",
        email: "",
        jurusan: "",
        sekolah: "",
        jenisSekolah: "",
        wilayah: "",
        kecamatan: "",
        sender: "poltekpis@gmail.com",
        subject: "Kesempatan Kuliah di Politeknik Piksi Input Serang",
        content: "",
        all: 0,
        file: ''
    })

    const [inputsEdit, setInputsEdit] = useState({
        nama: "",
        hp: "",
        email: "",
        jurusan: "",
        sekolah: "",
        jenisSekolah: "",
        wilayah: "",
        kecamatan: ""
    })
    const [inputsDelete, setInputsDelete] = useState({
        id: ""
    })
    const [errors, setErrors] = useState({
        nama: "",
        hp: "",
        email: "",
        jurusan: "",
        sekolah: "",
        jenisSekolah: "",
        wilayah: "",
        kecamatan: ""
    }) 
    
    useEffect(() => {
        getUsers()
        getSchools()
        getTypes()
        getRegions()
    }, [])

    const getUsers = async (e, i, a, b) => {
        const limitData = e;
        const activePage = i;
        const searchData = a;
        const EmailStatus = b;
        const host = `${url}/v1/sosialisasi-sekolah/list?page=${activePage !==undefined ? i: page}&size=${limitData !==undefined ? e: limit}&nama=${searchData !==undefined ? a: search}&sendEmail=${EmailStatus !==undefined ? b: sendEmail}`
        const res = await fetch(host, {headers}).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setUsers(newData.data)
            setUsersData(newData.data.content)
            setTotalElements(newData.data.totalElements)
            setTotalPages(newData.data.totalPages)
            setNumber(newData.data.number)

            const total = newData.data.totalElements;
            const size = newData.data.numberOfElements;
            setpageCount(Math.ceil(total / size));
            setLoadingData(true)
        } else {
          console.log("err")
        }
    }

    const getSchools = async (e) => {
        const limitData = e;
        const host = `${url}/v1/sosialisasi-sekolah/list-sekolah?page=0&size=${limitData !==undefined ? e: limitSchool}`
        const res = await fetch(host, {headers}).catch(err => console.error(err))
        if (res?.ok) {
          const newData = await res.json()
          setschools(newData.data.content)
          setLimitSchool(newData.data.totalElements)
        } else {
          console.log("err")
        }
    }

    const getTypes = async () => {
        const host = `${url}/v1/sosialisasi-sekolah/list-jenis-sekolah?page=0&size=10`
        const res = await fetch(host, {headers}).catch(err => console.error(err))
        if (res?.ok) {
          const newData = await res.json()
          settypes(newData.data)
        } else {
          console.log("err")
        }
    }
 
    const getRegions = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=10&type=wilayah_sekolah`
        const res = await fetch(host, {headers}).catch(err => console.error(err))
        if (res?.ok) {
          const newData = await res.json()
          setRegions(newData.data)
        } else {
          console.log("err")
        }
    }

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
        setErrors(values => ({ ...values, [name]: "" }))
    }

    const handleChangeSelect = e => {
        setInputs(values => ({
            ...values,
            sekolah: e.id,
            kecamatan: e.wilayah
        }))
        setErrors(values => ({ ...values, sekolah: "" }))
    }

    const handleChangeExport = async (e) => {
        if(e.target?.value){
            setInputs(values => ({
                ...values, 
                wilayah: e.target?.value,
            }))
        }else{
            setInputs(values => ({
                ...values, 
                sekolah: e.id
            }))
        }
    }

    const handleChangeExportAll = async (e) => {
        console.log(e)
        setInputs(values => ({
            ...values,
            all: 1,
            wilayah: "",
            sekolah: ""
        }))
        console.log('i',inputs)
    }

    const exportUser = async () => {
        setLoading(true)
        const sek_id = inputs.sekolah
        const wil_id = inputs.wilayah
        const host = `${url}/v1/sosialisasi-sekolah/export-excel?sekolah_id=${sek_id}&wilayah_id=${wil_id}`
        await fetch(host, {
            headers: headers,
        })
        .then(res => res.json())
        .then((data) => {
            if(data.status == 200) {
                console.log('Success:', data);
                if(data.data?.url){
                    window.open(data.data.url, '_blank');
                    setLoading(false)
                }
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }

    const handleChangeEdit = e => {
        const name = e.target.name
        const value = e.target.value
        setInputsEdit(values => ({ ...values, [name]: value }))
        setErrors(values => ({ ...values, [name]: "" }))
    }

    const handleChangeSearch = e => {
        setSearch(e.target.value)
        getUsers(undefined, undefined, e.target.value)
    }

    const handleChangeLimit = e => {
        setLimit(e.target.value)
        setPage(0)
        getUsers(e.target.value, undefined, undefined)
    }

    const handleChangeFilter = e => {
        setSendEmail(e.target.value)
        getUsers(undefined, undefined, undefined, e.target.value)
    }
    
    const postUser = async () => {
        setLoading(true)
        if(inputs.nama === '' || inputs.sekolah === '' || inputs.jenisSekolah === '') {
            const name = ['nama', 'sekolah', 'jenisSekolah']
            for (let i = 0; i < name.length; i++) {
                setErrors(values => ({ ...values, [name[i]]: "Required" }))
              }
            setLoading(false)
        }else{
            const dataUser = {
                nama: inputs.nama,
                hp: inputs.hp,
                email: inputs.email,
                jurusan: inputs.jurusan,
                kecamatan: {
                    id: parseInt(inputs.wilayah)
                },
                sekolah: {
                    id: parseInt(inputs.sekolah)
                },
                jenisSekolah: {
                    id: parseInt(inputs.jenisSekolah)
                }
            }
            const host = `${url}/v1/sosialisasi-sekolah/save`
            await fetch(host, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(dataUser),
            })
            .then(res => res.json())
            .then((data) => {
                if(data.status == 200) {
                    console.log('Success:', data);
                    toast("Successfully added!");
                    getUsers()
                    setLoading(false)
                    setVisible(!visible)
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
        }
    }

    const editUser = async () => {
        setLoading(true)
        if(inputsEdit.nama === '' || inputsEdit.sekolah === '' || inputsEdit.jenisSekolah === '') {
            const name = ['nama']
            for (let i = 0; i < name.length; i++) {
                setErrors(values => ({ ...values, [name[i]]: "Required" }))
              }
            setLoading(false)
        }else{
            const dataUser = {
                id: inputsEdit.id,
                nama: inputsEdit.nama,
                hp: inputsEdit.hp,
                email: inputsEdit.email,
                jurusan: inputsEdit.jurusan,
                kecamatan: {
                    id: parseInt(inputsEdit.wilayah)
                },
                sekolah: {
                    id: inputsEdit.sekolah
                },
                jenisSekolah: {
                    id: parseInt(inputsEdit.jenisSekolah)
                }
            }
            const host = `${url}/v1/sosialisasi-sekolah/update`
            await fetch(host, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(dataUser),
            })
            .then(res => res.json())
            .then((data) => {
                if(data.status == 200) {
                    console.log('Success:', data);
                    toast("Successfully updated!");
                    getUsers()
                    setLoading(false)
                    setVisibleEdit(false)
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
        }
    }

    const deleteUser = async () => {
        setLoading(true)
        const dataUser = {
            id: inputsDelete.id
        }
          
        const host = `${url}/v1/sosialisasi-sekolah/delete`
        await fetch(host, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(dataUser),
        })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            toast("Successfully deleted!");
            getUsers()
            setLoading(false)
            setVisibleDelete(false)
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }

    const blastEmail = async () => {
        setLoading(true)
        // const ac = Buffer.from(inputs.content).toString('base64')
        // console.log(Buffer.from(ac, 'base64').toString('ascii'))

        const dataUser = {
            pengirim: inputs.sender,
            subjek: inputs.subject,
            kontent: Buffer.from(inputs.content).toString('base64')
        }
        const host = `${url}/v1/sosialisasi-sekolah/send-email`
        await fetch(host, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(dataUser),
        })
        .then(res => res.json())
        .then((data) => {
            if(data.status == 200) {
                console.log('Success:', data);
                toast("Sent successfully!");
                setLoading(false)
                // visibleEmail(false)
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }

    const handleChangeBlast = e => {
        // console.log(e, 'msg')
        setInputs(values => ({ ...values, content: e }))
    }

    const donwloadData = async () => {
        setLoading(true)
        const host = `${url}/showFile/tmp/sosialisasi_sekolah.csv`
        await fetch(host, {
            headers: headers,
        })
        .then(data => {
             if(data.status == 200) {
                    console.log('Success:', data);
                    if(data?.url){
                        window.open(data.url, '_blank');
                        setLoading(false)
                    }
                }
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }

    const importData = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', inputs.file);
        const token = Cookies.get('token')

        const host = `${url}/v1/upload/sos-sekolah`
        axios.post(host, formData, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            
        })
        .then((data) => {
            console.log('Success:', data);
            if(data.status == 200) {
                console.log('Success z:', data);
                toast("Sent successfully!");
                setLoading(false)
                // visibleImport(false)
            }
        })
        .catch((err) => {
            console.log('Error:', err);
            setLoading(false)
        });
    }

    const handleFileChange = (e) => {
        setInputs(values => ({ ...values, file: e.target.files[0] }))
    }

    const showAction = (e, i) => {
        setLoading(false)
        setErrors({
            nama: "",
            hp: "",
            email: "",
            sekolah: "",
            jurusan: "",
            jenisSekolah: "",
            wilayah: ""
        })
        getSchools(limitSchool)
       if(e == 0) {
        setInputs({
            id: "",
            nama: "",
            hp: "",
            email: "",
            sekolah: "",
            jurusan: "",
            jenisSekolah: "",
            wilayah: ""
        })
        setVisible(!visible)
       }else if(e == 1){
        if(i == "export") {
            setInputs({
                id: "",
                nama: "",
                hp: "",
                email: "",
                sekolah: "",
                jurusan: "",
                jenisSekolah: "",
                wilayah: ""
            })
            setVisibleExport(!visible)
            console.log(i)
        }else if(i == "download") {
            donwloadData()
            console.log(i)
        }else{
            setVisibleImport(!visible)
            console.log(i)
        }
       }else if(e == 2){
        setInputs({
            sender: "poltekpis@gmail.com",
            content: defaultvalue,
            subject: "Kesempatan Kuliah di Politeknik Piksi Input Serang"
        })
        setVisibleEmail(!visible)
       }else if(e == 3){
        setInputsEdit({
            id: i.id,
            nama: i.nama,
            hp: i.hp,
            email: i.email,
            sekolah: i.sekolah.id,
            jurusan: i.jurusan,
            jenisSekolah: i.jenisSekolah?.id,
            kecamatan: i.sekolah?.wilayah,
            wilayah: i.kecamatan?.id
        })
        setVisibleEdit(!visible)
       }
       else{
        setInputsDelete({
            id: i.id
        })
        setVisibleDelete(!visible)
       }
    }

    const fetchComments = async (currentPage) => {
        const res = await fetch(
        `${url}/v1/sosialisasi-sekolah/list?page=${currentPage-1}&size=${limit}&sendEmail=${sendEmail}`,
        {headers}
        );
        const data = await res.json();
        return data.data;
    };
    
    const handleClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchComments(currentPage);
        setUsers(commentsFormServer);
        if(currentPage !== 1) {
            setnumberList(limit*currentPage-limit+1);
        }else{
            setnumberList(1);
        }
    };

    return (
        <>
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <div className="car"></div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <div className="mt-2 p-2">
                                    <strong>List</strong><span className="small ms-1">Sosialisasi Sekolah, Total data <strong>{totalElements}</strong></span>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="btn btn-primary float-right me-2" onClick={() => showAction(0)}>
                                        <span className="cil-contrast btn-icon mr-2"></span> + Add data
                                    </button>
                                    <button type="button" className="btn btn-success float-right me-2" onClick={() => showAction(1, 'export')}>
                                        <span className="cil-contrast btn-icon mr-2"></span> Export data
                                    </button>
                                    {/* <button type="button" className="btn btn-success float-right me-2" onClick={() => showAction(1, 'download')}>
                                        <span className="cil-contrast btn-icon mr-2"></span> Download data
                                    </button> */}
                                    <button type="button" className="btn btn-success float-right me-2" onClick={() => showAction(1, 'import')}>
                                        <span className="cil-contrast btn-icon mr-2"></span> Import data
                                    </button>
                                    <button type="button" className="btn btn-warning float-right me-2 mt-1" onClick={() => showAction(2)}>
                                        <span className="cil-contrast btn-icon mr-2"></span> Blast email
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex bd-highlight mb-3">
                                <div className="col-auto me-auto p-2 bd-highlight">
                                    <select className="form-select" name="search" value={limit} onChange={handleChangeLimit}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>
                            
                                <div className="col-auto p-2 bd-highlight">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto">
                                            <label for="inputPassword6" className="col-form-label">Email:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select className="form-select" name="search" value={sendEmail} onChange={handleChangeFilter}>
                                                <option value="">--Select--</option>
                                                <option value="y">Sent</option>
                                                <option value="n">Not Sent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto p-2 bd-highlight">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        aria-describedby="emailHelp"
                                        name="search"
                                        value={search || ""}
                                        placeholder="Search"
                                        onChange={handleChangeSearch}
                                    />
                                </div>   
                            </div>
                            {
                                !loadingData ? (
                                    <p>Loading...</p>
                                ) : (
                            <div className="table-responsive mt-3">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Wilayah</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Sekolah</th>
                                            <th scope="col">Nomor HP</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                            {users.content?.map((user, index) => (
                                            <tr key={index}>
                                                <td scope="row">{index+numberList}</td>
                                                <td>{user.nama || "-"}</td>
                                                <td>{user.sekolah?.wilayah || "-"}</td>
                                                <td>{user.email || "-"}</td>
                                                <td>{user.sekolah?.nama || "-"}</td>
                                                <td>{user.hp || "-"}</td>
                                                <td>{user.status || "-"}</td>
                                                <td>
                                                    <span className="m-2">
                                                        <button type="button" className="btn btn-sm btn-success" onClick={() => showAction(3, user)}>
                                                            <span className="cil-contrast btn-icon mr-2"></span> Edit
                                                        </button>
                                                    </span>
                                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => showAction(4, user)}>
                                                        <span className="cil-contrast btn-icon mr-2"></span> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                                )
                            }
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handleClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            placeholder="Input Nama"
                            value={inputs.nama || ""}
                            onChange={handleChange}
                            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
                            />
                            {errors.nama ? (
                               <div className="invalid-feedback">
                                     Masukan nama.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            name="email"
                            placeholder="Input Email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Nomor HP</label>
                        <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="hp"
                            placeholder="Input Nomor"
                            value={inputs.hp || ""}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <select
                            type="text"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.wilayah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                            {errors.wilayah ? (
                               <div className="invalid-feedback">
                                     Pilih wilayah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">Nama Sekolah</label>
                        <Select 
                            getOptionLabel={option => option.nama}
                            getOptionValue={option => option.id}
                            options={schools}
                            onChange={handleChangeSelect}
                            className={`form-control p-0 ${errors.sekolah ? "is-invalid" : ""}`}
                        />
                            {errors.sekolah ? (
                               <div className="invalid-feedback">
                                    Pilih nama sekolah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Kecamatan</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.kecamatan || ""}
                            onChange={handleChange}
                            disabled
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="major" className="form-label">Jurusan</label>
                        <input
                            type="text"
                            className="form-control"
                            id="major"
                            name="jurusan"
                            placeholder="Input Jurusan"
                            value={inputs.jurusan || ""}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Jenis Sekolah</label>
                        <select
                            id="type"
                            name="jenisSekolah"
                            value={inputs.jenisSekolah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.jenisSekolah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {types.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>                            
                            {errors.jenisSekolah ? (
                               <div className="invalid-feedback">
                                    Pilih jenis sekolah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => postUser()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleExport} onClose={() => setVisibleExport(false)}>
                <CModalHeader>
                    <CModalTitle>Export data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <select
                            type="text"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChangeExport}
                            className={`form-select ${errors.wilayah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                            {errors.wilayah ? (
                               <div className="invalid-feedback">
                                     Pilih wilayah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">Nama Sekolah</label>
                        <Select 
                            getOptionLabel={option => option.nama}
                            getOptionValue={option => option.id}
                            options={schools}
                            onChange={handleChangeExport}
                            className={`form-control p-0 ${errors.sekolah ? "is-invalid" : ""}`}
                        />
                            {errors.sekolah ? (
                               <div className="invalid-feedback">
                                    Pilih nama sekolah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                    <div className="form-check">
                        <input
                            value={inputs.all}
                            type="checkbox"
                            onChange={handleChangeExportAll}
                            className={`form-check-input`}
                        />
                        <label htmlFor="check" className="form-label">Download all</label>
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleExport(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => exportUser()}>Download</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleImport} onClose={() => setVisibleImport(false)}>
                <CModalHeader>
                    <CModalTitle>Import data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <div className="mb-3">
                        <label htmlFor="file" className="form-label">File</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            placeholder="Input File"
                            accept={".csv"}
                            className={`form-control ${errors.file ? "is-invalid" : ""}`}
                            />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <button type="button" className="btn btn-success float-right me-2" onClick={() => showAction(1, 'download')}>
                        <span className="cil-contrast btn-icon mr-2"></span> Download template
                    </button>
                    <CButton color="secondary" onClick={() => setVisibleImport(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => importData()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal size="xl" visible={visibleEmail} onClose={() => setVisibleEmail(false)}>
                <CModalHeader>
                    <CModalTitle>Blast Email</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="sender" className="form-label">Pengirim</label>
                        <input
                            type="text"
                            id="sender"
                            name="sender"
                            value={inputs.sender || ""}
                            onChange={handleChange}
                            placeholder="Input Sender"
                            className={`form-control ${errors.sender ? "is-invalid" : ""}`}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subjek</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={inputs.subject || ""}
                            onChange={handleChange}
                            placeholder="Input Subject"
                            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">Pesan</label>
                        <SunEditor
                            height="300px"
                            placeholder="Please type here..."
                            defaultValue={defaultvalue}
                            onChange={handleChangeBlast}
                            setOptions={{
                                resizingBar: false,
                                buttonList: [
                                  [
                                    // 'formatBlock',
                                    // 'bold',
                                    // 'underline',
                                    // 'italic',
                                    // 'strike',
                                    // 'blockquote',
                                    // 'showBlocks',
                                    // 'fontColor',
                                    // 'hiliteColor',
                                    // 'align',
                                    // 'list',
                                    // 'table',
                                    // 'link',
                                    // 'image',
                                    // 'video',
                                    // 'removeFormat'
                                    "undo",
                                    "redo",
                                    "font",
                                    "fontSize",
                                    "formatBlock",
                                    "paragraphStyle",
                                    "blockquote",
                                    "bold",
                                    "underline",
                                    "italic",
                                    "strike",
                                    "subscript",
                                    "superscript",
                                    "fontColor",
                                    "hiliteColor",
                                    "textStyle",
                                    // "removeFormat",
                                    "outdent",
                                    "indent",
                                    "align",
                                    "horizontalRule",
                                    "list",
                                    "lineHeight",
                                    "table",
                                    "link",
                                    "image",
                                    // "video",
                                    // "audio",
                                    // "math",
                                    // "imageGallery",
                                    "fullScreen",
                                    // "showBlocks",
                                    // "codeView",
                                    // "preview",
                                    // "print",
                                    // "save",
                                    // "template"
                                  ]
                                ]
                              }}
                        />
                        {/* <textarea
                            type="text"
                            id="content"
                            name="content"
                            value={inputs.content || ""}
                            onChange={handleChange}
                            placeholder="Input Sender"
                            className={`form-control ${errors.content ? "is-invalid" : ""}`}
                            /> */}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleEmail(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => blastEmail()}>Send Email</CButton>
                    )}
                </CModalFooter>
            </CModal>
            
            <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                <CModalHeader>
                    <CModalTitle>Edit data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                            type="text"
                            id="nama"
                            name="nama"
                            placeholder="Input Nama"
                            value={inputsEdit.nama || ""}
                            onChange={handleChangeEdit}
                            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
                            />
                            {errors.nama ? (
                               <div className="invalid-feedback">
                                     Masukan nama.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            placeholder="Input Email"
                            value={inputsEdit.email || ""}
                            onChange={handleChangeEdit}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Nomor HP</label>
                        <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="hp"
                            placeholder="Input Nomor"
                            value={inputsEdit.hp || ""}
                            onChange={handleChangeEdit}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <select
                            type="text"
                            id="wilayah"
                            name="wilayah"
                            value={inputsEdit.wilayah || ""}
                            onChange={handleChangeEdit}
                            className={`form-select ${errors.wilayah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">Nama Sekolah</label>
                        <Select
                            value={schools.filter(e => e.id === inputsEdit.sekolah)}
                            getOptionLabel={option => option.nama}
                            getOptionValue={option => option.id}
                            options={schools}
                            onChange={e => setInputsEdit(values =>({
                                ...values,
                                sekolah: e.id,
                                wilayah: e.wilayah
                            }))}
                            className={`form-controlx p-0x ${errors.sekolah ? "is-invalidx" : ""}`}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Kecamatan</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputsEdit.kecamatan || ""}
                            onChange={handleChangeEdit}
                            disabled
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="major" className="form-label">Jurusan</label>
                        <input
                            type="text"
                            className="form-control"
                            id="major"
                            name="jurusan"
                            placeholder="Input Jurusan"
                            value={inputsEdit.jurusan || ""}
                            onChange={handleChangeEdit}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Jenis Sekolah</label>
                        <select
                            id="type"
                            name="jenisSekolah"
                            value={inputsEdit.jenisSekolah || ""}
                            onChange={handleChangeEdit}
                            className={`form-select ${errors.jenisSekolah ? "is-invalid" : ""}`}
                            >   
                                <option value="">Select...</option>
                                {types.content?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                            {errors.jenisSekolah ? (
                               <div className="invalid-feedback">
                                    Pilih jenis sekolah.
                                </div>
                            ) : (
                                ""
                            )}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => editUser()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                <CModalHeader>
                    <CModalTitle>Delete data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                   <p>Apakah Anda yakin akan menghapus data ini?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                    Close
                    </CButton>
                    {loading ? (
                        <CButton color="primary">
                            <span className="spinner-border spinner-border-sm" role="status"></span>                           
                            <span className="ml-2"> Loading...</span>
                        </CButton>
                        ) : (
                        <CButton color="primary" onClick={() => deleteUser()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <ToastContainer />
        </>
    )
}