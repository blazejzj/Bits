import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>loading...</p>;
    }

    if (!user) {
        return <p>No user logged in.</p>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
    );
}

export default Profile;
