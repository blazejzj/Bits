import { useState, type ChangeEvent } from "react";

interface ProfileNameFormProps {
    toggleNameChange: () => void;
}

function ProfileNameForm({ toggleNameChange }: ProfileNameFormProps) {
    const [formData, setFormData] = useState({
        username: "",
        authPassword: "",
    });

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleFormSubmit() {}

    function renderForm() {
        return (
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="newName">New Name</label>
                <input type="text" name="newName" id="newName" />
                <label htmlFor="authPassword">Password</label>
                <input
                    type="authPassword"
                    name="authPassword"
                    id="authPassword"
                />
                <button type="submit">Change Name</button>
                <button onClick={toggleNameChange} className="cursor-pointer">
                    Cancel
                </button>
            </form>
        );
    }

    return <div>{renderForm()}</div>;
}

export default ProfileNameForm;
