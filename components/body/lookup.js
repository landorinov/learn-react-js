import { useEffect, useState } from "react"
import { headers, url } from "../../lib/auth"
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

export default function User() {
    const [numberList, setnumberList] = useState(1);

    const [agamas, setAgamas] = useState([])
    const [jenisMatkuls, setJenisMatkuls] = useState([])
    const [lingkupKelass, setLingkupKelass] = useState([])
    const [modeKelass, setModeKelass] = useState([])
    const [programStudis, setProgramStudis] = useState([])
    const [semesters, setSemesters] = useState([])
    const [wilayahSekolahs, setWilayahSekolahs] = useState([])

    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    useEffect(() => {
        getAgamas()
        getJenisMatkuls()
        getLingkupKelass()
        getModeKelass()
        getProgramStudis()
        getSemesters()
        getWilayahSekolahs()
    }, [])

    const getAgamas = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=agama`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setAgamas(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getJenisMatkuls = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=jenis_mata_kuliah`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setJenisMatkuls(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getLingkupKelass = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=lingkup_kelas`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setLingkupKelass(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getModeKelass = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=mode_kelas`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setModeKelass(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getProgramStudis = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=program_studi`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setProgramStudis(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getSemesters = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=semester`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setSemesters(newData.data.content)
        } else {
            console.log("err")
        }
    }

    const getWilayahSekolahs = async () => {
        const host = `${url}/v1/lookup/list?page=0&size=100&type=wilayah_sekolah`
        const res = await fetch(host, { headers }).catch(err => console.error(err))
        if (res?.ok) {
            const newData = await res.json()
            setWilayahSekolahs(newData.data.content)
        } else {
            console.log("err")
        }
    }

    return (
        <>
            <div className="body flex-grow-1 px-3">
                <div className="container-lg">
                    <div className="car"></div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <div className="mt-2 p-2">
                                    <strong>List</strong><span className="small ms-1">Lookup</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Accordion open={open} toggle={toggle}>
                                <AccordionItem>
                                    <AccordionHeader targetId="1">Agama</AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        agamas.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="2">Jenis Mata Kuliah</AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        jenisMatkuls.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="3">Lingkup Kelas</AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        lingkupKelass.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="4">Mode Kelas</AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        modeKelass.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="5">Program Studi</AccordionHeader>
                                    <AccordionBody accordionId="5">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        programStudis.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="6">Semester</AccordionHeader>
                                    <AccordionBody accordionId="6">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        semesters.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="7">Wilayah Sekolah</AccordionHeader>
                                    <AccordionBody accordionId="7">
                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No.</th>
                                                        <th scope="col">Nama</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        wilayahSekolahs.map((item, index) => (
                                                            <tr key={index}>
                                                                <th scope="row">{index + numberList}</th>
                                                                <td>{item.nama}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}