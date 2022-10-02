import React, {useEffect} from 'react';

const AnalysisReporting = () => {
    useEffect(() => {
      document.title="SEDA - Analysis & Reporting"
    }, []);
    return (
        <div className='analysis'>
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-md-2">
                        
                    </div>
                    <div className="col-md-10">
                        <div className="card p-3 mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Analysis &amp; Reporting</h3>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                   
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
