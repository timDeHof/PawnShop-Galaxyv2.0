import axios from "axios";

export async function getUsers() {
    try {
        const { data: users } = await axios.get("/api/users");
        console.log("users:", users);
        return users;
    } catch (err) {
        console.error(err);
    }
}

export async function fetchUser(token) {
    try {
        const response = await axios.get("/api/users/me", {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function loginUser(username, password) {
    const response = await axios.get("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    return response;
}
