import Model from '@c/model';
import Switch from '@c/switch';
import React from 'react';
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
    let email = this.getCookie("homeEmail")
    if(email){
      let name = this.getCookie("homeName")
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

  getCookie(name) 
  { 
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
  } 

  setCookie(name,value){
        var exp = new Date();
        exp.setTime(exp.getTime() + 7 * 24 * 3600 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }

  setLoading(opt){
    this.setState({
      user: opt,
      modelType: 'ok'
    })
    this.setCookie("homeEmail",opt.email)
    this.setCookie("homeName",opt.name)
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
