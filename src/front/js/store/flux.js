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
            registro: (email, password, repeat) => {
                try {
                    // fetching data from the backend
                    if (password === repeat && email && password) {
                        fetch(process.env.BACKEND_URL + "/api/registro", {
                                method: "POST",
                                body: JSON.stringify({
                                    "email": email,
                                    "password": password
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    setStore({
                                        registro: true
                                    })
                                }
                                response.json()
                                setStore({
                                    registro: false
                                })
                            })
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            // Fetch para Login
            login: (email, password) => {
                if (email !== "" && password != "") {
                    try {
                        // fetching data from the backend
                        fetch(process.env.BACKEND_URL + "/api/login", {
                                method: "POST",
                                body: JSON.stringify({
                                    "email": email,
                                    "password": password
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    setStore({
                                        auth: true
                                    })
                                }
                                response.json();
                            })
                            .then((data) => localStorage.setItem("token", data.access_token))
                        // don't forget to return something, that is how the async resolves
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