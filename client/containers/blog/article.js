import marked from 'marked';
import moment from 'moment';
import Prism from 'prismjs';
import React, {Component} from 'react';
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
  render () {
    const { 
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
        <div className = {blogCss['article-center']}>
          <h1> {title} </h1>
          <span className = { blogCss['blog-menu-time'] }>{ moment(created_at).format('YYYY-MM-DD') }</span>
          <Labels labels={labels} />
          <div className={blogCss.view} dangerouslySetInnerHTML={{__html:html}} />
          {/* <Comments data={this.props.data} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} showLogin={this.props.showLogin}/> */}
        </div>
      </div>
    )
  }
}
