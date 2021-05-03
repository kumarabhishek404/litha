import React from 'react'

function Footer() {
    return (
        <div className='footer w-100 d-flex justify-content-center align-items-center'>
            <div className='container footer__section d-flex justify-content-between align-items-center'>
                <div className='footer__navbar capitalize'>
                    <ul className='p-0 m-0'>
                        <li>Contact Us</li>
                        <li>Licenses</li>
                    </ul>
                </div>

                <div className='footer__text'>
                    <span>© 2021, made with <i className="fa fa-heart heart"></i> by Litha Labs
                        </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;
