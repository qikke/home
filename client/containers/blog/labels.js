import React from 'react';
import * as blogCss from './blog.module.scss';
const Label = props => {
  const {  name, color } = props
  return (
    <span className={blogCss['blog-menu-label']}  style={{color: `#${color}`}}>{ name }</span>
  )
}

export default props => {
  return (
    <span>
      {
        props.labels.map(label => <Label key={label.id} {...label}/>)
      }
    </span>
  )
}
