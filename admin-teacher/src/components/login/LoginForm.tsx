import { FC, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthenticationContext";
import { User } from "../../types/user";
import { apiRequest } from "../../utilities/apis/apiRequest";


import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

export const LoginForm = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("admin")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            return setError("Please fill all the fields");
        }
        setLoading(true)
        try {
            const { data }: { data: { user: User, token: string } } = await apiRequest(`/auth/login/${role}`, "POST", {
                email: trimmedEmail,
                password: trimmedPassword,
            });
            login(data.user, data.token);
            navigate("/");
        } catch (error: any) {
            alert(error.message || "Login failed");
        } finally {
            setLoading(false)
        }
    };

    const onChange = (e: RadioChangeEvent) => {
        setRole(e.target.value);
    };

    return (

        <>
            <form onSubmit={handleLogin}>
                <InputField label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} Icon={IoMailOutline} />

                <InputField label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} Icon={showPassword ? MdOutlineRemoveRedEye : LuEyeClosed} onClick={() => setShowPassword(pre => !pre)} />

                <Radio.Group
                    onChange={onChange}
                    value={role}
                    options={[
                        {
                            value: "admin",
                            label: (
                                <Flex gap="small" justify="center" align="center" vertical>
                                    <RiAdminLine style={{ fontSize: 18 }} />
                                    Admin
                                </Flex>
                            ),
                        },
                        {
                            value: "teacher",
                            label: (
                                <Flex gap="small" justify="center" align="center" vertical>
                                    <LiaChalkboardTeacherSolid style={{ fontSize: 18 }} />
                                    Teacher
                                </Flex>
                            ),
                        },
                    ]}
                />

                <p className={`mb-2 text-sm text-red-600 ${error ? "opacity-100" : "opacity-0"} `}>{error}</p>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ?
                        <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span> :
                        "Sign In"
                    }
                </button>
            </form>
        </>
    )
}


interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Icon?: React.ElementType;
    onClick?: () => void
}

const InputField: FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, Icon, onClick }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                    placeholder={placeholder}
                    autoComplete="false"
                    value={value}
                    onChange={onChange}
                />
                {Icon && <Icon className={`absolute right-2 top-4 w-6 h-6 text-gray-400 ${type !== "email" && "cursor-pointer"} `} onClick={onClick} />}
            </div>
        </div>
    );
};