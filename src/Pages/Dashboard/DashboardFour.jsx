import React from 'react';
import { FullScreen } from "react-full-screen";

const DashboardFour = ({ handle }) => {
    return (
        <div className='dashboard'>
            <div className="container-fluid">
                <FullScreen handle={handle}>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card p-2 mb-2 bg-warning">
                                <div className="row">
                                    <div className="col-md-10"><b>Thermal Power, Q(kW)</b></div>
                                    <div className="col-md-2"><b>0.00</b></div>
                                </div>
                            </div>
                            <div className="card p-2 mb-2 bg-warning">
                                <div className="row">
                                    <div className="col-md-10"><b>Thermal Energy, (kWh)</b></div>
                                    <div className="col-md-2"><b>0.00</b></div>
                                </div>
                            </div>
                            <div className="card p-2 mb-2 bg-warning">
                                <div className="row">
                                    <div className="col-md-10"><b>Solar Irradiation (kWh/m2)</b></div>
                                    <div className="col-md-2"><b>0.00</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card p-2 mb-2 bg-success text-white">
                                <div className="row">
                                    <div className="col-md-10"><b>Thermal Power, Q (kW)</b></div>
                                    <div className="col-md-2"><b>0.00</b></div>
                                </div>
                            </div>
                            <div className="card p-2 mb-2 bg-success text-white">
                                <div className="row">
                                    <div className="col-md-10"><b>Thermal Energy, (kWh)</b></div>
                                    <div className="col-md-2"><b>0.00</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bg-light mb-2">
                        <aside className='col-md-4'>
                            <div className='row d-flex justify-content-center'><h5 className="col-4 bg-warning text-white text-center p-2">Solar Side</h5></div>
                            <div className="row mb-3">
                                <div className="col-md-10">Aperture areas of collector (m2)</div>
                                <div className="col-md-2 bg-warning text-center">0.00</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-10">Ambience Temperature (<sup>°</sup> C)</div>
                                <div className="col-md-2 bg-warning text-center">0.00</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-10">Supply Water Temperature(<sup>°</sup> C)</div>
                                <div className="col-md-2 bg-warning text-center">0.00</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-10">Return Water Temperature (<sup>°</sup> C)</div>
                                <div className="col-md-2 bg-warning text-center">0.00</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-10">M29a Flow Rate solar (m3/h)</div>
                                <div className="col-md-2 bg-warning text-center">0.00</div>
                            </div>
                        </aside>
                        <div className="col-md-8 ">
                            <div className='row d-flex justify-content-center'><h5 className="col-4 bg-success text-white text-center p-2">Consumer Side</h5></div>
                            <div className="row mb-2  px-2">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-10">Supply Water Temperature(<sup>°</sup> C)</div>
                                        <div className="col-md-2 bg-warning text-center">0.00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <img src="/images/solar-panel.png" alt="consumer side" height="300" />
                                </div>
                            </div>
                            <div className="row mb-2  px-2">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <div className="row mb-2">
                                        <div className="col-md-10">Return Water Temperature (<sup>°</sup> C)</div>
                                        <div className="col-md-2 bg-warning text-center">0.00</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-10">M29a Flow Rate solar (m3/h)</div>
                                        <div className="col-md-2 bg-warning text-center">0.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FullScreen>
            </div>
        </div>
    );
}

export default DashboardFour;
