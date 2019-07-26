import axios from '@/axios';
import {Button, Checkbox, Input} from 'antd';
import marked from 'marked';
import Prism from 'prismjs';
import React, {Component} from 'react';
import * as blogCss from './blog.module.scss';
import style from './newBlog.module.scss';

const renderer = new marked.Renderer()

marked.setOptions({
    highlight(code, lang) {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang)
        }
        return code
    }
})

class NewBlog extends Component{
    constructor() {
        super()
        this.state = {
            markValue: '',
            labels: [],
            newLabelFlag: false,
            checkedLabels: [],
            title: ''
        }
        this.addLabelInput = React.createRef()
        this.handleMarkChange = this.handleMarkChange.bind(this)
        this.handleAddLabel = this.handleAddLabel.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        this.getAllLabels()
    }

    getAllLabels() {
        axios.get('/Blog/getAllLabels',{
            timeout: 5000,
          }).then(res => {
            if(res.data.status === 0) {
                this.setState({labels: res.data.data.labels})
            }
        })
    }

    addLabel(value) {
        axios.post('/Blog/addLabel', {
            name: value
        }).then(res => {
            if(res.data.status === 0) {
                this.getAllLabels()
            }
        }) 
    }

    handleMarkChange(event) {
        this.setState({markValue: event.target.value})
    }

    handleAddLabel(e) {
        const value = e.target.value
        const labels = this.state.labels
        for(let label of labels) {
            if(label.name === value) {
                return
            }
        }
        this.addLabel(value)
        this.setState({newLabelFlag: false})
    }

    handleBoxChange(index, e) {
        const set = new Set(this.state.checkedLabels)
        const label = this.state.labels[index].name
        if(e.target.checked) {
            set.add(label)
        } else {
            set.delete(label)
        }
        this.setState({checkedLabels: Array.from(set)})
    }

    handleSave() {
        const params = {
            title: this.state.title,
            labels: this.state.checkedLabels.join('|'),
            body: this.state.markValue
        }
        axios.post('/Blog/addBlog', params).then(res => {
            if(res.data.status === 0) {
                this.props.history.push('/blog')
            }
        })
    }

    render() {
        const html = marked(this.state.markValue, {renderer})
        return (
            <div className={style.newBlogWrapper}>
                <div style={{position: 'relative',paddingLeft: '20px'}}>
                    {this.state.labels.map((label, index) => {
                        return <Checkbox key={label._id} onChange={this.handleBoxChange.bind(this, index)}>{label.name}</Checkbox>
                    })}
                    <div className={style.newLabel}>
                        {
                            this.state.newLabelFlag
                            ? <Input ref={this.addLabelInput} size="small" onPressEnter={this.handleAddLabel} onBlur={() => {this.setState({newLabelFlag: false})}}/> 
                            : <Button type="primary" size="small" onClick={() => {this.setState({newLabelFlag: true});setTimeout(()=>{this.addLabelInput.current.focus();},0)}}>+</Button>
                        }
                    </div>
                    <div style={{width: '300px', marginTop: '15px'}}>
                        <Input placeholder="title" value={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}} />
                    </div>
                    <Button type="primary" className={style.saveButton} onClick={this.handleSave}>save</Button>
                </div>
                <div className={style.contentWrapper}>
                    <textarea className={style.leftContent} value={this.state.markValue} onChange={this.handleMarkChange}>
                    </textarea>
                    <div  className={`${blogCss.view} ${style.rightContent}`} dangerouslySetInnerHTML={{__html:html}}></div>
                </div>
            </div>
        )
    }
}

export default NewBlog
