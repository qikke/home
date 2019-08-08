import Model from '@c/model';
import Switch from '@c/switch';
import React from 'react';
import {getCookie, setCookie} from '../../utils/cookie';
import Footer from './components/footer';
import MyIcon from './components/icons';
import TextNode from './components/text';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      switchin:true,
      user:{
        email:null,
        name:null,
      },
      model: false,
      modelType: 'ok'
    }
  }

  componentWillMount(){
    // 组件加载时查看Cookie是否有保存用户信息
    let email = getCookie("homeEmail")
    if(email){
      let name = getCookie("homeName")
      this.setState({
        user:{
          name:name,
          email:email
        }
      })
    }
  }

  switchOut(n){
    this.setState({
      switchin:n
    })
  }

  setLoading(opt){
    this.setState({
      user: opt,
      modelType: 'ok'
    })
    setCookie("homeEmail",opt.email)
    setCookie("homeName",opt.name)
    this.refs.model.show()
  }

  isErro(){
    this.setState({
      modelType: 'err'
    }) 
    this.refs.model.show()
  }

  render() {
    return (
      <main className="page">
          <div className="app-center">
            <TextNode/>
            <Footer/>
            <MyIcon 
              user={this.state.user} 
              setUser={this.setLoading.bind(this)}
              isErro={this.isErro.bind(this)} 
            />
            <Model ref='model' type={this.state.modelType} time="2000"/>
            {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
          </div>
      </main>
    )
  }
}

export default Home
