import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col">
                        <p className='py-2 text-center'>&copy; {new Date().getFullYear()} SEDA Malaysia. All Rights Reserved - Version 1.0 | 2022</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
