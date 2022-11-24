import {useEffect, useState} from 'react'
import './App.css'
import {Animal} from "./components/Animal.jsx";

function useAnimalsSearch() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        search(lastQuery);
    }, []);

    const search = async (q) => {
        const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }));
        const data = await response.json();
        setAnimals(data);
        localStorage.setItem('lastQuery', q);
    }

    return {search, animals};
}

function App() {
    const { search, animals } = useAnimalsSearch();

    return (
        <main>
            <h1>Ivan's Farm</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => search(e.target.value) }
            />

            <ul>
                {animals.map((animal) => (<Animal key={animal.id} {...animal} />))}
                {animals.length === 0 && 'No animals found'}
            </ul>
        </main>
    )
}

export default App
