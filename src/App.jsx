import "./App.css";
import Routing from "./components/Routing/Routing";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className='app'>
			<Navbar />
			<main>
				<Routing />
			</main>
		</div>
  );
}

export default App;
