const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            auth: false,
        },
        actions: {
            // Fetch para Login
            login: (email, password) => {
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
                            response.json()
                        })
                        .then((data) => localStorage.setItem("token", data.access_token))
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
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
};

export default getState;