import React from "react";

//include images into your bundle
// import paraiso from "/workspaces/Armanda-react-y-Fetch-react-hello/src/img/paraiso.jpg";
import TodoList from "./todoList";




//create your first component
const Home = () => {

	const backgroundStyle = {
		width: "100vw",
		height: "100vh",
		backgroundImage: `url('https://media.istockphoto.com/id/1381637603/es/foto/paisaje-de-monta%C3%B1a.jpg?s=612x612&w=0&k=20&c=Xb8h6Mu5wtjk7vuBQejJNYxVA_xYQwlsEi1Bh8XuHDU=')`, // Cambia esta URL por la URL de tu imagen
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};

	return (
		<div style={{ ...backgroundStyle }}>

			<TodoList />


			{/* <img src={paraiso} className="w-100 h-100" /> */}

		</div>

		
	);
};

export default Home;
