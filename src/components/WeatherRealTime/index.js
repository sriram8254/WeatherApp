import {Component} from 'react'
import Loader from 'react-loader-spinner'
import { TiWeatherCloudy } from "react-icons/ti";
import './index.css'

const apiStatusConstants = {
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
    initial: "INITIAL"
}


const tempData = {
    name: "Old Toronto, Toronto, Golden Horseshoe, Ontario, Canada",
    temperature: 22,
    feelsLike: 22,
    wind: 3,
    humidity: 98,
    pressure: 997.38,
}

class WeatherRealTime extends Component{
    state = {
        locationData: tempData,
        apiStatus: apiStatusConstants.success
    }

    componentDidMount() {
        this.getWeatherRealTime()
    }

    
    onRetry = () => {
        this.getWeatherRealTime()
    }
    

    getWeatherRealTime = async () => {
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const {city}=this.props
        const apiUrl1 = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=UrfE6prcI4ajJCZ2ttnGJEgNiISpbdAh`
        const response = await fetch(apiUrl1)
        if(response.ok===true){
            const results = await response.json()
            const {data, location} = results
            const {values}=data
            console.log(results)
            const locationData = {
                name: location.name,
                temperature: values.temperature,
                feelsLike: values.temperatureApparent,
                wind: values.windSpeed,
                humidity: values.humidity,
                pressure: values.pressureSurfaceLevel,
            }
           
            this.setState({locationData,apiStatus: apiStatusConstants.success})
            console.log(locationData)
        }
        else {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
        
    }

    renderSuccesView = () => {
        const {locationData}=this.state
        const {name, temperature, feelsLike, wind, humidity, pressure}=locationData
        return <div className='realtime-container'>
        <div className='city-img-container'>
            <h1 className='city-name'>{name}</h1>
            <TiWeatherCloudy size={100} color='black' />
        </div>
        <div className='temperature-details-card'>
            <h1 className='temperature'>{temperature}<sup>o</sup>C</h1>
            <ul className='list-container'>
                <li className='details-container' ><p className='details-heading'>Details</p></li>
                <li className='details-container' ><p className='details-heading'>Feels like</p> <p className='details-answer'>{feelsLike}<sup>o</sup>C</p></li>
                <li className='details-container'><p className='details-heading'>Wind</p> <p className='details-answer'>{wind} m/s</p></li>
                <li className='details-container'><p className='details-heading'>Humidity</p> <p className='details-answer'>{humidity}%</p></li>
                <li className='details-container'><p className='details-heading'>Pressure</p> <p className='details-answer'>{pressure} hPa</p></li>
            </ul>
        </div>
    </div>
    }

    renderLoaderView = () => <div className='loader-container'>
        <Loader type="TailSpin" color="#0F4C81" size="25" />
    </div>

    renderFailureView = () => <div className='failure-view'>
        <img src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png" className='fai-img' alt="failure view"/>
        <h1 className='fail-heading'>Oops! Something Went Wrong</h1>
        <p className='dail-desc'>We cannot seem to find the page you are looking for.</p>
        <button type="button" className='retry-btn'>Retry</button>
    </div>

    renderBasedOnApiStatus = () => {
        const {apiStatus}=this.state
        switch (apiStatus){
            case apiStatusConstants.success:
                return this.renderSuccesView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoaderView()
            default:
                return null
        }
    }

    render() {
        return this.renderBasedOnApiStatus()
    }
}
export default WeatherRealTime