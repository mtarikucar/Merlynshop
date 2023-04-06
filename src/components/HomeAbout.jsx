import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
function HomeAbout() {
    return (
        <>
            <section className="  lg:my-16 bg-white shadow ">
                <div className="items-center flex lg:flex-row flex-col  ">
                    <div className=" md:w-1/2  ml-auto mr-auto ">
                        <img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://nurlightllc.com/image/blog4.jpeg"/>
                    </div>
                    <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                            <div className="text-gree-500 p-1 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-green-500 mt-8">
                                <i className="fas fa-rocket text-xl"></i>
                            </div>
                            <h3 className="text-3xl font-semibold">A growing company</h3>
                            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                                The extension comes with three pre-built pages to help you get
                                started faster. You can change the text and images and you're
                                good to go.
                            </p>
                            <ul className="list-none mt-6">
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-green-300 mr-3"><i className="fas fa-fingerprint"></i></span>
                                        </div>
                                        <div>
                                            <h4 className="text-blueGray-500">
                                                Carefully crafted components
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-green-300 mr-3"><i className="fab fa-html5"></i></span>
                                        </div>
                                        <div>
                                            <h4 className="text-blueGray-500">Amazing page examples</h4>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-green-300 mr-3"><i className="far fa-paper-plane"></i></span>
                                        </div>
                                        <div>
                                            <h4 className="text-blueGray-500">Dynamic components</h4>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
               
            </section>

        </>

    )
}

export default HomeAbout