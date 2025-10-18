import React from "react";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0 w-full">
                <aside>
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved by Vaibhav Kale
                    </p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
