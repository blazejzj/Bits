import { ChangeEvent, FormEvent, useState } from "react";
// import { useAuth } from "../../hooks/useAuth";

type UpdateEmailProps = {
    errors: string[] | undefined;
    setErrors: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    setUpdateEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateEmail({ errors, setErrors, setUpdateEmail }: UpdateEmailProps) {
    // const { user } = useAuth();
    const hasErrors = errors && errors.length > 0;

    const [formData, setFormData] = useState({
        email: "",
        authPassword: "",
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        setErrors([]);
        e.preventDefault();
    }

    function handleCancelUpdate() {
        setUpdateEmail(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="shadow flex flex-col p-3 ml-5">
            {hasErrors &&
                errors!.map((errMsg, idx) => (
                    <div
                        key={idx}
                        className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2"
                    >
                        {errMsg}
                    </div>
                ))}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">
                        New email adress:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter new email adress..."
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="authPassword" className="font-medium">
                        To update your email you must enter your email
                    </label>
                    <input
                        type="password"
                        name="authPassword"
                        id="authPassword"
                        value={formData.authPassword}
                        onChange={handleChange}
                        placeholder="Confirmation password"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                </div>
                <div className="flex gap-3 mt-3">
                    <button
                        type="submit"
                        className="font-semibold cursor-pointer gradient-wipe transition-[background-position,transform] duration-500 ease-in-out"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleCancelUpdate}
                        className="font-semibold cursor-pointer gradient-wipe transition-[background-position,transform] duration-500 ease-in-out"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmail;
