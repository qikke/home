import React, {Component} from 'react';
import styles from './text.module.scss';

export default class TextNode extends Component {
  constructor() {
    super()
    this.state = {
      span1:false,
      span2:false,
      span3:false,
      cursor:false
    }
  }
  componentDidMount(){
    this.setTimeout0 = setTimeout(()=>{
      this.setState({
        span1:true
      })
    },1200)
    this.setTimeout1 = setTimeout(()=>{
      this.setState({
        span2:true
      })
    },1400)
    this.setTimeout2 = setTimeout(()=>{
      this.setState({
        span3:true
      })
    },1600)
    this.setTimeout3 = setTimeout(()=>{
      this.setState({
        cursor:true
      })
    },2400)
  }
  componentWillUnmount(){
    clearTimeout(this.setTimeout0)
    clearTimeout(this.setTimeout1)
    clearTimeout(this.setTimeout2)
    clearTimeout(this.setTimeout3)
  }
  render() {
    return (
      <div className={styles.text}>
        <span className={this.state.span1?styles.animate:''}>Hey There</span><br/>
        <span className={this.state.span2?styles.animate:''}>I'm Qikke</span><br/>
        <span className={this.state.span3?styles.animate:''}>( σ'ω')σ<strong>#Skr</strong><i className={this.state.cursor?styles.cursor:''}></i></span>
      </div>
    )
  }
}
