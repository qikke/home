import moment from 'moment';
import React, {Component} from 'react';
import * as blogCss from './blog.module.scss';
import Labels from './labels';

export default class BlogMenu extends Component {

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
                <h3 className = { titleCss }>{ article.title }</h3>
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