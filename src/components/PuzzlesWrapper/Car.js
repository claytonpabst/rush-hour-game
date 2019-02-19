import React, {Component} from 'react';
import './Car.css'

class Car extends Component{
  constructor(props){
    super(props)

    this.state = {}

    this.moving = false
    this.mouseX = 0
    this.mouseY = 0

    this.moveCar = this.moveCar.bind(this)
    this.stopMovingCar = this.stopMovingCar.bind(this)
    this.startMovingCar = this.startMovingCar.bind(this)
  }

  startMovingCar(e){
    this.moving = true
    this.mouseX = e.clientX
    this.mouseY = e.clientY
  }

  stopMovingCar(){
    this.moving = false
    let direction = this.props.travelingX ? 'x' : 'y'
    this.props.snapCarPosition(this.props.carIndex, direction)
  }

  moveCar(e){
    if(this.moving){
      let moveX = e.clientX - this.mouseX
      let moveY = e.clientY - this.mouseY

      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.props.moveCar(this.props.carIndex, moveX, moveY)
    }
  }

  render(){
    return(
      <div 
        onMouseDown={this.startMovingCar}
        onMouseUp={this.stopMovingCar}
        onMouseMove={this.moveCar}
        onMouseLeave={this.stopMovingCar}
        className="car" 
        style={{
          width:this.props.width, 
          height:this.props.height, 
          background:this.props.color, 
          left:this.props.left, 
          top:this.props.top,
          // padding:"20px"
        }}
      >
        {/* {this.props.winningCar && "You"} */}
      </div>
    )
  }
}

export default Car;