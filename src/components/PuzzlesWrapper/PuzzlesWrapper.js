import React, {Component} from 'react';
import GridPiece from './GridPiece';
import Car from './Car.js';
import './PuzzlesWrapper.css';

class PuzzlesWrapper extends Component {
  constructor(props){
    super(props)

    this.state = {
      shortestScreenSide: 0,
      gridSize: 7,
      blockSize: 0,
      winningX: 0,
      winningY: 5,
      cars: [
        { i:0, j:1, width:3, height:1, travelingX:true, color: "green" },
        { i:5, j:5, width:1, height:2, travelingX:false, color: 'gold', winningCar: true },
        { i:3, j:3, width:4, height:1, travelingX:true, color: 'orange' },
        { i:1, j:0, width:4, height:1, travelingX:true, color: 'purple' },
        { i:1, j:4, width:1, height:3, travelingX:false, color: 'pink' },
        { i:2, j:4, width:4, height:1, travelingX:true, color: 'blue' },
        { i:2, j:2, width:1, height:2, travelingX:false, color: 'teal' },
        // { i:6, j:1, width:1, height:2, travelingX:false, color: 'aqua' },
      ]
    }
    this.getComponentDementionsAndSetCarDementions = this.getComponentDementionsAndSetCarDementions.bind(this)
    this.buildGrid = this.buildGrid.bind(this)
    this.renderCars = this.renderCars.bind(this)
    this.moveCar = this.moveCar.bind(this)
    this.snapCarPosition = this.snapCarPosition.bind(this)
    this.carsColliding = this.carsColliding.bind(this)
  }

  componentDidMount(){
    this.getComponentDementionsAndSetCarDementions()
  }

  getComponentDementionsAndSetCarDementions() {
    const shortestScreenSide = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
    const blockSize = shortestScreenSide/this.state.gridSize
    let {cars} = this.state
    for(let i=0; i<this.state.cars.length; i++){
      cars[i].width = cars[i].width * blockSize
      cars[i].height = cars[i].height * blockSize
      cars[i].top = cars[i].j * blockSize
      cars[i].left = cars[i].i * blockSize
    }
    this.setState({cars, shortestScreenSide, blockSize})
  }

  buildGrid(){
    const {gridSize, blockSize, winningX, winningY} = this.state
    let gridJSX = []
    for(let i=0; i<gridSize; i++){
      for(let j=0; j<gridSize; j++){
        gridJSX.push(
          <div className='puzzles-wrapper_block' key={i+'-'+j} style={{width:blockSize, height:blockSize}}>
            {i === winningX && j === winningY && "Exit"}
          </div>
        )
      }
    }
    return gridJSX
  }

  moveCar(carIndex, moveX, moveY){
    if(this.carsColliding(carIndex)){return}
    let cars = this.state.cars
    let car = cars[carIndex]
    if(car.travelingX && this.inBounds(car, moveX, 'x')){
      car.left = moveX >= 0 ? car.left + moveX : car.left + moveX
    } else if (!car.travelingX && this.inBounds(car, moveY, 'y')) {
      car.top = moveY >= 0 ? car.top + moveY : car.top + moveY
    }
    this.setState({cars})
  }

  carsColliding(carIndex){
    let cars = this.state.cars
    let car = cars[carIndex]
    for(let i=0; i<cars.length; i++){
      if(cars[i] !== car){
        if(
          car.left < cars[i].left + cars[i].width && 
          car.left + car.width > cars[i].left && 
          car.top + car.height > cars[i].top &&
          car.top < cars[i].top + cars[i].height
        ){
            console.log('nope')
          return true
        }
      }
    }
  }

  inBounds(car, movement, direction){
    const topLeft = direction === 'x' ? "left" : "top"
    const widthHeight = direction === 'x' ? "width" : "height"
    return car[topLeft] + car[widthHeight] + movement < this.state.blockSize * this.state.gridSize && car[topLeft] + movement > 0
  }

  snapCarPosition(carIndex){
    let blockSize = this.state.blockSize
    let cars = this.state.cars
    let car = cars[carIndex]
    const topLeft = car.travelingX ? "left" : "top"
    if(car[topLeft] % blockSize > blockSize / 2){
      car[topLeft] = car[topLeft] + (blockSize - car[topLeft] % blockSize)
    } else {
      car[topLeft] = car[topLeft] - car[topLeft] % blockSize
    }
    this.setState({cars})
  }

  renderCars(){
    return this.state.cars.map((car, i) => {
      return(
        <Car 
          moveCar={this.moveCar}
          snapCarPosition={this.snapCarPosition}
          key={car.i + '-' + car.j} 
          carIndex={i}
          width={car.width} 
          height={car.height} 
          top={car.top} 
          left={car.left} 
          color={car.color}
          winningCar={car.winningCar}
        />
      )
    })
  }

  render(){
    const {shortestScreenSide} = this.state
    return(
      <div style={{width:shortestScreenSide, height:shortestScreenSide}} className="puzzles-wrapper_wrapper">
        {this.buildGrid()}
        {this.renderCars()}
      </div>
    )
  }
}

export default PuzzlesWrapper