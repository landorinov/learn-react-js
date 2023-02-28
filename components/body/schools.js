import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import { CButton, CModal,CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import Modal from "../modal"

export default function User() {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [totalElements, setTotalElements] = useState("")
    const [pageCount, setpageCount] = useState(0);
    const [numberList, setnumberList] = useState(1);

    const [action, setAction] = useState("")
    const [schools, setSchools] = useState([])
    const [regions, setRegions] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)

    const [inputs, setInputs] = useState({
        id: "",
        nama: "",
        wilayah: ""
    })
    const [errors, setErrors] = useState({
        nama: "",
        wilayah: ""
    })    
    
    useEffect(() => {
        getSchools(),
        getRegions()
    }, [])

    const getSchools = async (e, i, a) => {
        const limitData = e;
        const activePage = i;
        const searchData = a;
        const host = `${url}/v1/sosialisasi-sekolah/list-sekolah?page=${activePage !==undefined ? i: page}&size=${limitData !==undefined ? e: limit}&nama=${searchData !==undefined ? a: search}`
        const res = await fetch(host, {headers}).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setSchools(newData.data.content)
            setTotalElements(newData.data.totalElements)

            const total = newData.data.totalElements;
            const size = newData.data.numberOfElements;
            setpageCount(Math.ceil(total / size));
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

    const showAction = (e, i) => {
        setAction(e)
        setErrors({
            nama: "",
            wilayah: ""
        })
        if(e == 'add') {
        setInputs({
            nama: "",
            wilayah: ""
        })
        setVisible(!visible)
        }else if(e == 'edit') {
        setInputs({
            id: i.id,
            nama: i.nama,
            wilayah: i.wilayah
        })
        setVisibleEdit(!visible)
       }else{
        setInputs({
            id: i.id
        })
        setVisibleDelete(!visible)
       }
    }

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
        setErrors(values => ({ ...values, [name]: "" }))
    }
    const handleChangeSearch = e => {
        setSearch(e.target.value)
        getSchools(undefined, undefined, e.target.value)
    }
    const handleChangeLimit = e => {
        setLimit(e.target.value)
        setPage(0)
        getSchools(e.target.value, undefined, undefined)
    }
    const handleModal = () => {
        setVisibleDelete(false)
    }

    const postSchool = async () => {
        setLoading(true)
        if(inputs.nama === '' || inputs.wilayah === '' ){
            const name = ['nama', 'wilayah']
           if(inputs.nama == '' && inputs.wilayah == '') {
            for (let i = 0; i < name.length; i++) {
                setErrors(values => ({ ...values, [name[i]]: "Required" }))
              }
            setLoading(false)
           }else if(inputs.nama == '') {
            setErrors(values => ({ ...values, nama: "Required" }))
            setLoading(false)
           }else{
            setErrors(values => ({ ...values, wilayah: "Required" }))
            setLoading(false)
           }
        }else{
            const dataSchool = {
                nama: inputs.nama,
                wilayah: inputs.wilayah,
            }
              
            const host = `${url}/v1/sosialisasi-sekolah/save-sekolah`
            await fetch(host, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(dataSchool),
            })
            .then(res => res.json())
            .then((data) => {
                console.log('Success:', data);
                toast("Successfully added!");
                getSchools()
                setLoading(false)
                setVisible(!visible)
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false)
            });
        }
    }
    const editSchool = async () => {
        setLoading(true)
        const dataSchool = {
            id: inputs.id,
            nama: inputs.nama,
            wilayah: inputs.wilayah,
        }
          
        const host = `${url}/v1/sosialisasi-sekolah/update-sekolah`
        await fetch(host, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(dataSchool),
        })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            toast("Successfully updated!");
            getSchools()
            setLoading(false)
            setVisibleEdit(false)
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }
    const deleteSchool = async () => {
        setLoading(true)
        const dataSchool = {
            id: inputs.id
        }
          
        const host = `${url}/v1/sosialisasi-sekolah/delete-sekolah`
        await fetch(host, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(dataSchool),
        })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            toast("Successfully deleted!");
            getSchools()
            setLoading(false)
            setVisibleDelete(false)
        })
        .catch((err) => {
            console.error('Error:', err);
            setLoading(false)
        });
    }

    const fetchItems = async (currentPage) => {
        const res = await fetch(
        `${url}/v1/sosialisasi-sekolah/list-sekolah?page=${currentPage-1}&size=${limit}`,
        {headers}
        );
        const data = await res.json();
        return data.data.content;
    };
    const handleClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchItems(currentPage);
        setSchools(commentsFormServer);
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
                                    <strong>List</strong><span className="small ms-1">Sekolah, Total data <strong>{totalElements}</strong></span>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="btn btn-primary float-right" onClick={() => showAction('add')}>
                                        <span className="cil-contrast btn-icon mr-2"></span> + Add data
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="col-auto">
                                    <select className="form-select" name="search" value={limit} onChange={handleChangeLimit}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                    </select>
                                </div>
                            
                                <div className="col-auto">
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

                            <div className="table-responsive mt-3">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Kecamatan</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        schools.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index+numberList}</th>
                                            <td>{item.nama}</td>
                                            <td>{item?.wilayah}</td>
                                            <td>
                                                <span className="m-2">
                                                    <button type="button" className="btn btn-sm btn-success" onClick={() => showAction('edit', item)}>
                                                        <span className="cil-contrast btn-icon mr-2"></span> Edit
                                                    </button>
                                                </span>
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => showAction('delete', item)}>
                                                    <span className="cil-contrast btn-icon mr-2"></span> Delete
                                                </button>
                                            </td>
                                        </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* <Paginate
                            postsPerPage={limit}
                            totalPosts={totalElements}
                            paginate={paginate}
                            currentPage={number}
                            /> */}

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
                            value={inputs.nama || ""}
                            onChange={handleChange}
                            placeholder="Input Nama"
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
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            placeholder="Input Wilayah"
                            />
                            {errors.wilayah ? (
                               <div className="invalid-feedback">
                                     Masukan Wilayah.
                                </div>
                            ) : (
                                ""
                            )}
                        {/* <select
                            type="text"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            className={`form-select ${errors.wilayah ? "is-invalid" : ""}`}
                            >
                                <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                                ))}
                            </select>
                            {errors.wilayah ? (
                               <div className="invalid-feedback">
                                     Pilih kecamatan.
                                </div>
                            ) : (
                                ""
                            )} */}
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
                        <CButton color="primary" onClick={() => postSchool()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                <CModalHeader>
                    <CModalTitle>Edit data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama Sekolah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nama"
                            name="nama"
                            value={inputs.nama || ""}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="wilayah" className="form-label">Wilayah</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            />
                        {/* <select
                            type="text"
                            className="form-select"
                            id="wilayah"
                            name="wilayah"
                            value={inputs.wilayah || ""}
                            onChange={handleChange}
                            >
                             <option value="">Select...</option>
                                {regions.content?.map((item, index) => (
                                <option key={index} value={item.nama}>
                                    {item.nama}
                                </option>
                                ))}
                            </select> */}
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
                        <CButton color="primary" onClick={() => editSchool()}>Save</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <Modal
                title={action}
                visibleDeletex={visibleDelete}
                setVisibleDeletex={handleModal}
                deleteSchoolx={deleteSchool}
                loadingx={loading}
            />

            <ToastContainer />
        </>
    )
}