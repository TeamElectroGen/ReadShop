import React from "react";

const Footer = () => {
    return (
        <footer className="bg-lightGray-200 mt-10 pt-3 w-full text-xs">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between gap-3 flex-col md:flex-row">
                    <div className="w-full bg-mediumGray-500/50 px-2 py-2 text-center flex items-center justify-center">
                        Logo & Address
                    </div>
                    <div className="w-full text-center flex flex-col gap-3">
                        <div className="bg-mediumGray-500/50 py-2 w-full">
                            Social Links
                        </div>
                        <div className="bg-mediumGray-500/50 py-2 w-full">
                            Newsletter
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex bg-mediumGray-500 items-center justify-center py-2 my-3 text-xs text-white">
                <p>Copyright</p>
            </div>
        </footer>
    );
};

export default Footer;