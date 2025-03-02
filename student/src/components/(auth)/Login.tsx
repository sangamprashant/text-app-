import { useState } from "react";
import { useNotificationContext } from "../../(providers)/NotificationContext";
import { apiRequest } from "../../utilities/api/apiRequest";
import { useAuth } from "../../(providers)/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { _notification } = useNotificationContext()
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail.includes("@")) {
            _notification.Error("Invalid Email", "Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const { data }: { data: { user: User, token: string } } = await apiRequest(`/auth/login/student`, "POST", {
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

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Student Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded-lg text-white font-medium ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
