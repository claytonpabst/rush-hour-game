import React, {Component, createContext} from 'react'

const {Provider, Consumer} = createContext()

class TrafficState extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }
  
  render(){
    return (
      <Provider value={{state:this.state}}>
        {this.props.children}
      </Provider>
    )
  }
}

export {TrafficState}

export default Consumer