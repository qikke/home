import React from 'react';

class Sprit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 1
        }
    }
    render () {
        return (
        <div>
            <button onClick={() => {this.setState({status: 1})}}>10张图</button>
            <button onClick={() => {this.setState({status: 2})}}>一张雪碧图</button>
            <button onClick={() => {this.setState({status: 3})}}>所有</button>
            <div>
                {
                    (this.state.status === 1) && (
                    <div>
                    <img src="https://qikke.cn/static/sprit/1.png"></img>
                    <img src="https://qikke.cn/static/sprit/2.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/3.png"></img>
                    <img src="https://qikke.cn/static/sprit/4.png"></img>
                    <img src="https://qikke.cn/static/sprit/5.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/6.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/7.png"></img>
                    <img src="https://qikke.cn/static/sprit/8.png"></img>
                    <img src="https://qikke.cn/static/sprit/9.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/10.jpg"></img>
                    </div>
                    )
                }
                 {   (this.state.status === 2) && (
                    <img src="https://qikke.cn/static/sprit/x.png"></img>
                    )
                }
                {   (this.state.status === 3) && (
                    <div>
                    <img src="https://qikke.cn/static/sprit/x.png"></img>
                    <img src="https://qikke.cn/static/sprit/1.png"></img>
                    <img src="https://qikke.cn/static/sprit/2.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/3.png"></img>
                    <img src="https://qikke.cn/static/sprit/4.png"></img>
                    <img src="https://qikke.cn/static/sprit/5.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/6.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/7.png"></img>
                    <img src="https://qikke.cn/static/sprit/8.png"></img>
                    <img src="https://qikke.cn/static/sprit/9.jpg"></img>
                    <img src="https://qikke.cn/static/sprit/10.jpg"></img>
                    </div>
                    )
                }
            </div>
        </div>
        )
    }
}

export default Sprit