import marked from 'marked';
import moment from 'moment';
import Prism from 'prismjs';
import React, {Component} from 'react';
import {getCookie} from '../../utils/cookie';
// import Login from './login'
// import Comments from './comments'
import * as blogCss from './blog.module.scss';
import Labels from './labels';

const renderer = new marked.Renderer()
renderer.link = (href, title, text) => `<a target="_blank" href="${href}" title="${title}">${text}</a>`

marked.setOptions({
  highlight(code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang)
    }
    return code
  }
})

export default class Article extends Component {
  resetScrollTop() {
    this.refs.article && (this.refs.article.scrollTop = '0px')
  }
  keywordHeighlignt(keyword, text) {
    return text.replace(new RegExp(keyword, 'gi'), `<span style="color: red;">${keyword}</span>`)
  }
  render () {
    const { 
      _id,
      body, 
      title, 
      labels, 
      created_at
    } = this.props.data
    if (!body) {
      return (<div></div>)
    }
    const html = marked(body, {renderer})
    return (
      <div ref="article" className = {blogCss.article}>
        {
          getCookie("homeEmail") === 'qiguanshaokai@gmail.com' && 
        <div>
        <button style={{'marginRight': '20px'}} onClick={() => {this.props.editBlog(_id)}}>edit</button>
        <button onClick={() => {this.props.deleteBlog(_id)}}>delete</button>
        </div>
        }
        <div className = {blogCss['article-center']}>
          <h1> {title} </h1>
          <span className = { blogCss['blog-menu-time'] }>{ moment(created_at).format('YYYY-MM-DD') }</span>
          <Labels labels={labels} />
          {
            this.props.keyword === ''
            ? <div className={blogCss.view} dangerouslySetInnerHTML={{__html:html}} />
            : <div className={blogCss.view} dangerouslySetInnerHTML={{__html:this.keywordHeighlignt(this.props.keyword, html)}} />
          }
          {/* <Comments data={this.props.data} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} showLogin={this.props.showLogin}/> */}
        </div>
      </div>
    )
  }
}
