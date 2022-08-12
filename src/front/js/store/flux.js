const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            auth: false,
            registro: false,
        },
        actions: {
            // Registro
            registro: async (email, password, repeat) => {

                // fetching data from the backend
                if (password === repeat && email && password) {
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                    }
                    try {
                        const res = await fetch(process.env.BACKEND_URL + "/api/registro", options);
                        if (res.status === 200) {
                            alert("Registro completado")
                            setStore({
                                registro: true
                            })
                        }
                        const data = await res.json()
                        setStore({
                            registro: false
                        })
                    } catch (error) {
                        console.log("Error loading message from backend", error)
                        alert("Registro fallido")
                    }
                }
            },

            // Fetch para Login
            login: async (email, password) => {
                if (email !== "" && password != "") {
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                    };

                    try {
                        // fetching data from the backend
                        const res = await fetch(process.env.BACKEND_URL + "/api/login", options);
                        if (res.status === 200) {
                            setStore({
                                auth: true
                            })
                        } else if (res.status === 401) {
                            alert("Usuario o Password erroneos")
                        }

                        const data = await res.json();
                        console.log(data);
                        localStorage.setItem("token", data.token)
                    } catch (error) {
                        console.log("Error loading message from backend", error)
                    }
                }

            },

            // Cerrar sesion
            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false
                });
            },
        },



        // getMessage: async () => {
        // 	try{
        // 		// fetching data from the backend
        // 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
        // 		const data = await resp.json()
        // 		setStore({ message: data.message })
        // 		// don't forget to return something, that is how the async resolves
        // 		return data;
        // 	}catch(error){
        // 		console.log("Error loading message from backend", error)
        // 	}
        // },
    }
};


export default getState;