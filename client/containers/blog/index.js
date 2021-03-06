import axios from '@/axios';
import isMobile from '@/utils/isPhone';
import Switch from '@c/switch';
import Pop from '@c/windo';
import {Input} from 'antd';
import React, {Component} from 'react';
import {getCookie} from '../../utils/cookie';
import Article from './article';
import blogCss from './blog.module.scss';
import Menu from './menu';

const { Search } = Input;

export default class Blog extends Component {
  constructor() {
    super()
    this.state = {
      switchin: true,
      labels: [],
      articles: [],
      activeArticles: [],
      currentArticle: {},
      lookPage: false,
      showLogin: false,
      userInfo: {},
      activeLabelIndex: 0,
      keyword: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    Promise.all([this.getAllLabels(), this.getAllBlogs()]).then(res => {
      this.updateLabelList(this.state.labels[0].name)
    })
  }

  getAllLabels() {
    return axios.get('/Blog/getAllLabels', {timeout: 5000}).then(res => {
      if(res.data.status ===  0) {
        this.setState({labels: res.data.data.labels})
      }
    })
  }

  getAllBlogs() {
    return axios.get('/Blog/getAllBlogs', {timeout: 5000}).then(res => {
      if(res.data.status ===  0) {
        this.setState({articles: res.data.data.blogs})
        this.setState({currentArticle: this.state.articles[0] || {}})
      }
    })
  }

  switchOut(n){
    this.setState({
      switchin: n
    })
  }

  changeArticle(article) {
    this.refs.articleComponent.resetScrollTop()
    this.setState({
      currentArticle: article,
      lookPage: true
    })
  }

  showLogin() {
    this.setState({
      showLogin: true,
      lookPage: true,
      currentArticle: {
        title: 'Github授权',
        needLoginGithub: true
      }
    })
  }

  resetUserInfo(info) {
    this.setState({
      userInfo: info
    })
  }
  handleNew() {
    this.props.history.push('/new')
  }

  handleChangeLabel(index) {
    this.setState({keyword: ''})
    this.setState({activeLabelIndex: index})
    this.updateLabelList(this.state.labels[index].name)
    setTimeout(() => {this.changeArticle(this.state.activeArticles[0])}, 0)
  }

  updateLabelList(label) {
    const arr = this.state.articles.filter(article => {
      if(article.labels.indexOf(label) > -1) {
        return article
      }
    })
    this.setState({activeArticles: arr})
  }

  deleteBlog(id) {
    axios.post('/Blog/deleteBlog', {
      id
    }).then(res => {
      if(res.data.status === 0) {
        this.getAllBlogs()
      }
    })
  }

  editBlog(id) {
    const data = {
      id,
      artical: this.state.currentArticle
    }
    const path = {
      pathname:'/edit',
      query:data
    }
    this.props.history.push(path)
  }

  handleSearch(value) {
    this.setState({keyword: value})
    axios.post('/Blog/search', {
      keyword: value
    }).then(res => {
      if(res.data.status === 0) {
        this.setState({activeLabelIndex: -1})
        this.setState({activeArticles: res.data.data.blogs})
        setTimeout(() => {this.changeArticle(this.state.activeArticles[0])}, 0)
      }
    })
  }

  render() {
    const {activeArticles, currentArticle, lookPage, userInfo, keyword } = this.state
    let blogClassNames = [blogCss['blog-main']]
    if (isMobile) {
      blogClassNames.push(blogCss['blog-mobile'])
    }
    if (isMobile && lookPage) {
      blogClassNames.push(blogCss['blog-look'])
    }
    blogClassNames = blogClassNames.join(' ')
    return (
      <div className="page app-center">
        <ul className={blogCss['blog-typelist']}>
          {
            this.state.labels.map((label, index) => {
              return <li key={label._id} className={`${blogCss['blog-typeItem']} ${index === this.state.activeLabelIndex ? blogCss['blog-active'] : ''}`} onClick={this.handleChangeLabel.bind(this, index)}>{label.name}</li>
            })
          }
          <Search
            placeholder="input search text"
            onSearch={this.handleSearch}
            style={{ width: 200 }}
          />
        </ul>
        {getCookie("homeEmail") === 'qiguanshaokai@gmail.com' &&  
        <button onClick={this.handleNew.bind(this)} style={{'float': 'right'}}>new</button>}
        <div className={ blogClassNames }>
        <Pop
            noClose={true}
            title="Blogs"
            type="white"
            unmove={true}
            class={blogCss['blog-menu-box']}
          >
            <Menu keyword = {keyword}  articles={ activeArticles } currentArticle = { currentArticle } changeArticle={ article => this.changeArticle(article)}/>
          </Pop>
          <Pop
            noClose={true}
            title={currentArticle.title || ''}
            type="white"
            unmove={true}
            class={blogCss['blog-article-box']}
          >
            <Article 
              ref="articleComponent" 
              showLogin={()=>this.showLogin()} 
              reGetter={()=>this.getArticleList()} 
              deleteBlog={(id)=>this.deleteBlog(id)}
              editBlog={(id)=>this.editBlog(id)}
              resetUserInfo={data=>this.resetUserInfo(data)}
              data={ currentArticle } 
              userInfo={userInfo}
              keyword = {keyword}
            />
          </Pop>
        </div>
        {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </div>
    )
  }
}
