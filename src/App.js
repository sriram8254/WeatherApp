import { Component } from "react"
import { MdLocationSearching } from "react-icons/md"
import WeatherForeCast from "./components/WeatherForecast"
import WeatherRealTime from "./components/WeatherRealTime"
import './App.css'

class App extends Component {
    state = {
        searchInput: "",
        city: "Hyderbad"
    }

    onSearchChange = event => {
        this.setState({searchInput: event.target.value})
    }

    onSearchClick = () => {
        const {searchInput}=this.state
        this.setState({city: searchInput})
    }

    render() {
        const {searchInput, city}=this.state
        return <div className="bg-container">
            <div className="search-container">
                <input type="search" className="search-css" onChange={this.onSearchChange} value={searchInput} placeholder="Enter Location" />
               <button type="button" className="search-btn" onClick={this.onSearchClick}> <MdLocationSearching size={20} /></button>
            </div>
        <WeatherRealTime city={city}/>
        <WeatherForeCast city={city}/>
        </div>
    }
}

export default App