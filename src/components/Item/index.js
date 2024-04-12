import { Component } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import './index.css'

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


class Item extends Component {
    state = {
        show: false
    }

    onDayClick = () => {
        this.setState(prevState => ({show: !prevState.show}))
    }

    render() {
        const {show}=this.state
        const {itemDetails}=this.props
        const {pressure, humidity, wind, feelsLike, temperature, time, clouds, maxTemperature}=itemDetails
        const d = new Date(time);
        const day = d.getDay();
        return <li>
            <div  className="item-container" onClick={this.onDayClick}>
         <div className="icon-day-container">
         <TiWeatherSunny color="#E2C43E" size={30} />
         <p className="day-css">{weekday[day]}</p>
         </div>
         <div className="nature-temperature-container">
            <p className="nature">clear sky</p>
            <p className="nature-temperature">{temperature}<sup>o</sup>C/{feelsLike}<sup>o</sup>C</p>
         </div>
         </div>
         {show&&<ul className="another-items-container">
            <li className="container-another-item"><p className="qun">Pressure:</p><p className="ans">{pressure} hPa</p></li>
            <li className="container-another-item"><p className="qun">Humidity:</p><p className="ans">{humidity}%</p></li>
            <li className="container-another-item"><p className="qun">Clouds:</p><p className="ans">{clouds}%</p></li>
            <li className="container-another-item"><p className="qun">Wind Speed:</p><p className="ans">{wind}m/s</p></li>
            <li className="container-another-item"><p className="qun">Feels Like:</p><p className="ans">{feelsLike}<sup>o</sup>C</p></li>
            <li className="container-another-item"><p className="qun">Max Temperature:</p><p className="ans">{maxTemperature}<sup>o</sup>C</p></li>
         </ul>}
         
        </li>
    }
}

export default Item