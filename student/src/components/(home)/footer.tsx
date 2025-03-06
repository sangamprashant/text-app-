import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-orange-400 text-white py-8 px-6 mt-10">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div>
                    <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
                        <img src="/logo.png" width={40} height={40} />
                        <span>QUIZLY</span>
                    </Link>
                    <ul className="mt-4 space-y-2">
                        <li>Work with us</li>
                        <li>Privacy Policy</li>
                        <li>Terms and Conditions</li>
                        <li>Press Enquiries</li>
                    </ul>
                </div>
                <div>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>Payment</li>
                        <li>Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div>
                    <p>123 Riverside Rd, SmallVille OA 0909</p>
                    <p>+12940220-30</p>
                </div>
                <div>
                    <button className="bg-white text-orange-500 px-4 py-2 rounded-lg shadow">Subscribe to our Newsletter</button>
                    <div className="flex mt-4 space-x-4">
                        <FaFacebook className="text-2xl" />
                        <FaTwitter className="text-2xl" />
                        <FaInstagram className="text-2xl" />
                    </div>
                    <input type="email" placeholder="Email Address" className="mt-4 p-2 rounded-lg text-black w-full" />
                </div>
            </div>
        </footer>
    );
}

export default Footer