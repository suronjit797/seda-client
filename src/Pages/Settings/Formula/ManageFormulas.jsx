import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SettingSidebarNav from '../../../Components/Settings/SettingSidebarNav';
import FormulasTable from './FormulasTable';

const ManageFormulas = () => {
    const [SuccessMessage, setSuccessMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formulaData, setFormulaData] = useState({
        name: "",
        unit: "",
        formula: "",
        type: "system",
        formulaParts: {
            selectOne: "",
            valueOne: "",
            selectTwo: "",
            valueTwo: "",
            selectThree: "",
            valueThree: "",
            selectFour: "",
            valueFour: "",
            selectFive: "",
            valueFive: "",
        }
    });
    const { name, unit, formula } = formulaData
    const { selectOne, valueOne, selectTwo, valueTwo, selectThree, valueThree, selectFour, valueFour, selectFive, valueFive } = formulaData.formulaParts

    const onInputChange = e => {
        if (Object.keys(formulaData.formulaParts).includes(e.target.name)) {
            setFormulaData({
                ...formulaData,
                formulaParts: { ...formulaData.formulaParts, [e.target.name]: e.target.value },
            });
        } else {
            setFormulaData({
                ...formulaData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [parameters, setParameters] = useState([]);
    const getParameters = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/parameters`, { withCredentials: true })
        if (response) {
            setParameters(response.data)
        }
    }
    useEffect(() => {
        document.title = "SEDA - Manage Formulas"
        getParameters()
    }, []);

    useEffect(() => {
        const changeFormula=async()=>{
            setFormulaData({ ...formulaData, formula: `${valueOne} ${valueTwo} ${valueThree} ${valueFour} ${valueFive}` });
        }
        changeFormula()
    }, [formulaData, valueOne, valueTwo, valueThree, valueFour, valueFive]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/formula`, formulaData, { withCredentials: true })
        if (response) {
            setIsLoading(false);
            setFormulaData({
                name: "",
                unit: "",
                formula: "",
                type: "system",
                formulaParts: {
                    selectOne: "",
                    valueOne: "",
                    selectTwo: "",
                    valueTwo: "",
                    selectThree: "",
                    valueThree: "",
                    selectFour: "",
                    valueFour: "",
                    selectFive: "",
                    valueFive: "",
                }
            });
            getFormulas();
            setSuccessMessage("Formula Created Successfully");
            setTimeout(() => {
                setSuccessMessage();
            }, 2000)
        }
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
                                            <input type="text" id='name' name='name' value={name} onChange={onInputChange} className='form-control' placeholder='Enter formula name' required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="unit">Formula Unit / Value</label>
                                            <input type="text" id='unit' name='unit' value={unit} onChange={onInputChange} className='form-control' placeholder='Enter formula Unit' />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Set Formula</label>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <select name="selectOne" id="" className='form-select' onChange={onInputChange}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">System Parameter</option>
                                                        <option value="operator">Operator</option>
                                                        <option value="formula">Formula</option>
                                                        <option value="text">Text</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="selectTwo" id="" className='form-select' onChange={onInputChange}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">System Parameter</option>
                                                        <option value="operator">Operator</option>
                                                        <option value="formula">Formula</option>
                                                        <option value="text">Text</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="selectThree" id="" className='form-select' onChange={onInputChange}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">System Parameter</option>
                                                        <option value="operator">Operator</option>
                                                        <option value="formula">Formula</option>
                                                        <option value="text">Text</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="selectFour" id="" className='form-select' onChange={onInputChange}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">System Parameter</option>
                                                        <option value="operator">Operator</option>
                                                        <option value="formula">Formula</option>
                                                        <option value="text">Text</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2">
                                                    <select name="selectFive" id="" className='form-select' onChange={onInputChange}>
                                                        <option>Select Type</option>
                                                        <option value="parameter">System Parameter</option>
                                                        <option value="operator">Operator</option>
                                                        <option value="formula">Formula</option>
                                                        <option value="text">Text</option>
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
                                                        switch (selectOne) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="valueOne" id="valueOne" value={valueOne} onChange={onInputChange} className='form-select'>
                                                                        <option>Select System Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="valueOne" id="valueOne" value={valueOne} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                        <option value="=">=</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="valueOne" id="valueOne" value={valueOne} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name="valueOne" id="valueOne" value={valueOne} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (selectTwo) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="valueTwo" id="valueTwo" value={valueTwo} onChange={onInputChange} className='form-select'>
                                                                        <option>Select System Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="valueTwo" id="valueTwo" value={valueTwo} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                        <option value="=">=</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="valueTwo" id="valueTwo" value={valueTwo} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name="valueTwo" id="valueTwo" value={valueTwo} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (selectThree) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="valueThree" id="valueThree" value={valueThree} onChange={onInputChange} className='form-select'>
                                                                        <option>Select System Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="valueThree" id="valueThree" value={valueThree} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                        <option value="=">=</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="valueThree" id="valueThree" value={valueThree} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name="valueThree" id="valueThree" value={valueThree} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (selectFour) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="valueFour" id="valueFour" value={valueFour} onChange={onInputChange} className='form-select'>
                                                                        <option>Select System Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="valueFour" id="valueFour" value={valueFour} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                        <option value="=">=</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="valueFour" id="valueFour" value={valueFour} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name="valueFour" id="valueFour" value={valueFour} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
                                                                )
                                                        }
                                                    })
                                                        ()}
                                                </div>
                                                <div className="col-md-2">
                                                    {(() => {
                                                        switch (selectFive) {
                                                            case 'parameter':
                                                                return (
                                                                    <select name="valueFive" id="valueFive" value={valueFive} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Parameter</option>
                                                                        {parameters && parameters.length > 0 && parameters.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            case 'operator':
                                                                return (
                                                                    <select name="valueFive" id="valueFive" value={valueFive} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Operator</option>
                                                                        <option value="+">+</option>
                                                                        <option value="-">-</option>
                                                                        <option value="x">x</option>
                                                                        <option value="/">/</option>
                                                                        <option value="=">=</option>
                                                                    </select>
                                                                );
                                                            case 'formula':
                                                                return (
                                                                    <select name="valueFive" id="valueFive" value={valueFive} onChange={onInputChange} className='form-select'>
                                                                        <option>Select Formula</option>
                                                                        {formulas && formulas.length > 0 && formulas.map((item, index) => (
                                                                            <option value={item.name} key={index}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                );
                                                            default:
                                                                return (
                                                                    <input type="text" name="valueFive" id="valueFive" value={valueFive} onChange={onInputChange} className='form-control' placeholder='Enter a value' />
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
                                            <button className='btn btn-success me-2' type='submit'>Create Formula</button>
                                            <Link to="/" className='btn btn-secondary'>Cancel</Link>
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
