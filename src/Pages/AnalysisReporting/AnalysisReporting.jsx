import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import AnalysisReportingSidebar from '../../Components/AnalysisReporting/AnalysisReportingSidebar';

const AnalysisReporting = () => {
    useEffect(() => {
      document.title="SEDA - Analysis & Reporting"
    }, []);
    return (
        <div className='analysis'>
            <div className="container-fluid">
                <div className="row my-5 vh60">
                    <div className="col-md-2">
                        <AnalysisReportingSidebar/>
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Generate Report</h3>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                   <Link to="/" className='btn btn-secondary'>Back</Link>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalysisReporting;
