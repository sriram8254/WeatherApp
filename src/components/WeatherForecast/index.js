import { Component } from "react";
import Loader from "react-loader-spinner";
import './index.css'
import Item from "../Item";

const apiStatusConstants = {
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class WeatherForeCast extends Component {
    state = {
        forecastData: [],
        apiStatus: apiStatusConstants.initial,
    }

    componentDidMount() {
        this.getForeCastData()
    }
 
    getForeCastData = async () => {
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const {city}=this.props
        const apiUrl1 = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&timesteps=1d&apikey=UrfE6prcI4ajJCZ2ttnGJEgNiISpbdAh`
        const response = await fetch(apiUrl1)
        if(response.ok===true){
            const results = await response.json()
            console.log(results)
            const forecastData = results.timelines.daily.map(each => ({
                time: each.time,
                clouds: each.values.cloudBaseMax,
                temperature: each.values.temperatureAvg,
                maxTemperature: each.values.temperatureMax,
                feelsLike: each.values.temperatureApparentAvg,
                wind: each.values.windSpeedAvg,
                humidity: each.values.humidityAvg,
                pressure: each.values.pressureSurfaceLevelAvg,
            })) 
           
            this.setState({forecastData,apiStatus: apiStatusConstants.success})
            console.log(forecastData)
        }
        else {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
 }

    renderSuccessView = () => {
        const {forecastData}=this.state
        return <div className="forecast-container">
        <h1 className="daily-heading">Daily</h1>
        <ul className="forecast-items-container">{forecastData.map(eachItem => <Item key={eachItem.time} itemDetails={eachItem} />)}</ul>
        </div>
    }

    
    renderLoaderView = () => <div className='loader-container'>
        <Loader type="TailSpin" color="#0F4C81" size="25" />
    </div>

    onRetry = () => {
        this.getForeCastData()
    }

    renderFailureView = () => <div className='failure-view'>
        <img src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png" className='fai-img' alt="failure view"/>
        <h1 className='fail-heading'>Oops! Something Went Wrong</h1>
        <p className='dail-desc'>We cannot seem to find the page you are looking for.</p>
        <button type="button" className='retry-btn' onClick={this.onRetry}>Retry</button>
    </div>

    renderBasedOnApiStatus = () => {
        const {apiStatus}=this.state
        switch (apiStatus){
            case apiStatusConstants.success:
                return this.renderSuccessView()
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

export default WeatherForeCast