import Switch from '@c/switch';
import React from 'react';
import Footer from './components/footer';
import TextNode from './components/text';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      switchin:true,
    }
  }

  switchOut(n){
    this.setState({
      switchin:n
    })
  }

  render() {
    return (
      <main className="page">
          <div className="app-center">
            <TextNode/>
            <Footer/>
            {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
          </div>
      </main>
    )
  }
}

export default Home
