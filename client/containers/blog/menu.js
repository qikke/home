import moment from 'moment';
import React, {Component} from 'react';
import * as blogCss from './blog.module.scss';
import Labels from './labels';

export default class BlogMenu extends Component {
  keywordHeighlignt(keyword, text) {
    return text.replace(new RegExp(keyword, 'gi'), `<span style="color: red;">${keyword}</span>`)
  }

  render() {
    const { currentArticle, articles } = this.props
    const {
      ['blog-menu-content']: contentCss,
      ['blog-menu-list']: listCss,
      ['blog-menu-index']: indexCss,
      ['blog-menu-wait']: waitCss,
      ['blog-menu-title']: titleCss,
      ['blog-menu-time']: timeCss
    } = blogCss
    return (
      <div className={ contentCss }>
        <ul className={ listCss }>
          {
            articles.map(article => (
              <li 
                className = { article._id == currentArticle._id ? indexCss : waitCss } 
                key = { article._id } 
                onClick={() => this.props.changeArticle(article)}
              >
                {
                  this.props.keyword === ''
                  ?  <h3 className = { titleCss }>{ article.title }</h3>
                  : <h3 dangerouslySetInnerHTML={{__html: this.keywordHeighlignt(this.props.keyword, article.title)}}></h3>
                }
                <div>
                  <span className = { timeCss }>{ moment(article.created_at).format('YYYY-MM-DD hh:mm') }</span>
                  <Labels labels={article.labels}/>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}