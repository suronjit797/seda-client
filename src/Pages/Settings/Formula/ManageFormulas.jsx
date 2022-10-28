import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import SettingSidebarNav from '../../../Components/Settings/SettingSidebarNav';
import FormulasTable from './FormulasTable';

const ManageFormulas = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formulaData, setFormulaData] = useState({
        name: "",
        unit: "",
        formula: ""
    });
    const { name, unit, formula } = formulaData

    const onInputChange1 = e => {
        setFormulaData({ ...formulaData, [e.target.name]: e.target.value });
    };
    const [c1, setC1] = useState();
    const [c2, setC2] = useState();
    const [c3, setC3] = useState();
    const [c4, setC4] = useState();
    const [c5, setC5] = useState();
    const [c6, setC6] = useState();
    const [formulaPart, setFormulaPart] = useState({
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        p6: ""
    });
    const { p1, p2, p3, p4, p5, p6 } = formulaPart
    const onInputChange = e => {
        setFormulaPart({ ...formulaPart, [e.target.name]: e.target.value });
    };
    const [parameters, setParameters] = useState([]);
    const getParameters = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parameters`, { withCredentials: true })
        if (response) {
            setParameters(response.data)
        }
    }
    useEffect(() => {
        getParameters()
    }, []);
    useEffect(() => {
        setFormulaData({ ...formulaData, formula: `${p1} ${p2} ${p3} ${p4} ${p5} ${p6}` });
    }, [p1, p2, p3, p4, p5, p6]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula`, formulaData, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setFormulaData({ name: "", unit: "", formula: "" })
            setC1(); setC2(); setC3(); setC4(); setC5(); setC6();
            setFormulaPart({ p1: "", p2: "", p3: "", p4: "", p5: "", p6: "" })
            getFormulas()
            setSuccessMessage("Formula Created Successfully")
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
        e.target.reset();
    }
    const [formulas, setFormulas] = useState([]);
    const getFormulas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/formula`, { withCredentials: true })
        if (response) {
            setFormulas(response.data)
        }
    }
    useEffect(() => {
        getFormulas()
    }, []);
    return (
        <div className='settings'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <SettingSidebarNav />
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <h3>Manage Formulas</h3>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <h4>Add A New Formula</h4>
                                    <div className='d-flex justify-content-center'>
                                        {isLoading && <Spinner animation="border" variant="dark" />}
                                    </div>
                                    {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Formula Name</label>
                                            <input type="text" id='name' name='name' value={name} onChange={onInputChange1} className='form-control' placeholder='Enter a formula Name' required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="unit">Formula Unit</label>
                                            <input type="text" id='unit' name='unit' value={unit} onChange={onInputChange1} className='form-control' placeholder='Enter a formula Name' />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Set Formula</label>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <select name="col-1" id="" className='form-select' onChange={(e) => setC1(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="col-2" id="" className='form-select' onChange={(e) => setC2(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="col-3" id="" className='form-select' onChange={(e) => setC3(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="col-4" id="" className='form-select' onChange={(e) => setC4(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="col-5" id="" className='form-select' onChange={(e) => setC5(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="col-6" id="" className='form-select' onChange={(e) => setC6(e.target.value)}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">Select Parameter</option>
                                                        <option value="operator">Select Operator</option>
                                                        <option value="formula">Select Formula</option>
                                                        <option value="value">Select Value</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c1) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p1" id="" value={p1} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p1" id="" value={p1} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p1" id="" value={p1} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p1' value={p1} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c2) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p2" id="" value={p2} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p2" id="" value={p2} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p2" id="" value={p2} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p2' value={p2} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c3) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p3" id="" value={p3} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p3" id="" value={p3} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p3" id="" value={p3} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p3' value={p3} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c4) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p4" id="" value={p4} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p4" id="" value={p4} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p4" id="" value={p4} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p4' value={p4} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c5) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p5" id="" value={p5} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p5" id="" value={p5} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p5" id="" value={p5} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p5' value={p5} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (c6) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="p6" id="" value={p6} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="p6" id="" value={p6} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="p6" id="" value={p6} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name='p6' value={p6} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="" className='me-3'>Formula Preview</label>
                                            <b>{formula}</b>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <button className='btn btn-success me-2'>Create Formula</button>
                                            <button className='btn btn-secondary'>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="row">
                                <FormulasTable formulas={formulas} getFormulas={getFormulas} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageFormulas;
