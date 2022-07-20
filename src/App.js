import React from "react";
import './App.css';
import Box from './components/Box'
import "./styles/global.css"

const tempMin = -20
const tempMax = 40
const heartMin = 80
const heartMax = 180
const stepsMin = 0
const stepsMax = 50000

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      water : 0,
      heart : 120,
      temperature : -10,
      steps : 3000
    }
  }

  onHeartChange = (e) => {
    this.setState({heart: Number(e.target.value)}, () => {
      this.calculateWater()
    })
  }

  onStepsChange = (e) => {
    this.setState({steps: Number(e.target.value)}, () => {
      this.calculateWater()
    })
  }

  onWeatherChange = (e) => {
    this.setState({temperature: Number(e.target.value)}, () => {
      this.calculateWater()
    })
  }

  calculateWater = () => {
    let result = 1.5
    if(this.state.temperature > 20){
      result += (this.state.temperature - 20) * 0.02
    }
    if(this.state.heart > 120){
      result += (this.state.heart - 120) * 0.0008
    }
    if(this.state.steps > 10000){
      result += (this.state.steps - 10000) * 0.00002
    }
    this.setState({water: result.toFixed(2)})
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* Water */}
          <Box 
            icon="local_drink" 
            color="#3A85FF" 
            value={this.state.water} 
            unit="L"
          />

          {/* Steps */}
          <Box 
            icon="directions_walk" 
            color="black" 
            value={this.state.steps} 
            min={stepsMin}
            max={stepsMax}
            change={this.onStepsChange}
            unit="steps"
          />

          {/* Heart */}
          <Box icon="favorite" 
            color="red" 
            value={this.state.heart}
            min={heartMin}
            max={heartMax}
            change={this.onHeartChange}
            unit="bpm"
          />

          {/* Temperature */}
          <Box icon="wb_sunny" 
            color="yellow" 
            value={this.state.temperature} 
            min={tempMin}
            max={tempMax}
            change={this.onWeatherChange}
            unit="°C"
          />
          
        </div>
      </div>
    );
  }
}

export default App;