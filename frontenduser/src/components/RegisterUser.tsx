import { ChangeEvent, FormEvent, useState, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const requirements = useMemo(() => {
        const reqs: { label: string; ok: boolean }[] = [];

        const namePattern = /^[a-zA-ZæøåÆØÅ\s-]+$/;
        reqs.push({
            label: "Name: only letters, spaces or -",
            ok: namePattern.test(formData.name),
        });
        reqs.push({
            label: "Name length: 2-100 chars",
            ok: formData.name.length >= 2 && formData.name.length <= 100,
        });

        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        reqs.push({
            label: "Email format is valid",
            ok: emailPattern.test(formData.email),
        });

        reqs.push({
            label: "Username: 2-100 chars",
            ok:
                formData.username.length >= 2 &&
                formData.username.length <= 100,
        });
        const usernamePattern = /^[a-zA-Z0-9-_]{2,100}$/;
        reqs.push({
            label: "Username: letters, digits, - or _ only",
            ok: usernamePattern.test(formData.username),
        });

        reqs.push({
            label: "Password length: 8-100 chars",
            ok:
                formData.password.length >= 8 &&
                formData.password.length <= 100,
        });

        reqs.push({
            label: "Passwords must match",
            ok:
                formData.password !== "" &&
                formData.password === formData.confirmPassword,
        });

        return reqs;
    }, [formData]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors([]);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const body = await response.json();
                const errs: string[] = (body.errors as { msg: string }[])?.map(
                    (err) => err.msg
                ) || [body.msg || "Couldn't register user."];
                setErrors(errs);
                return;
            }

            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                setErrors([
                    ...errors,
                    "Internal server issues. Couldn't register",
                ]);
            }
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-cyan-700 text-center">
                    Register new user
                </h1>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2">
                    {requirements.map(({ label, ok }, idx) => (
                        <p
                            key={idx}
                            className={ok ? "text-green-600" : "text-red-600"}
                        >
                            {ok ? (
                                <FontAwesomeIcon icon={faCheck} />
                            ) : (
                                <FontAwesomeIcon icon={faXmark} />
                            )}{" "}
                            {label}
                        </p>
                    ))}
                </div>

                {errors.length > 0 &&
                    errors.map((errMsg, idx) => (
                        <div
                            key={idx}
                            className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2"
                            data-testid="register-error-div"
                        >
                            {errMsg}
                        </div>
                    ))}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-medium">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 font-medium">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1 font-medium"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-700 text-white font-semibold rounded-md py-2 hover:bg-cyan-800 transition"
                    >
                        Register now
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <NavLink
                            to="/login"
                            className="text-cyan-700 font-medium hover:underline"
                        >
                            Log in here
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;
