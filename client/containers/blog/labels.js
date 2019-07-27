import React from 'react';
import * as blogCss from './blog.module.scss';
const Label = props => {
  const name = props.label
  const color = props.color
  return (
    <span className={blogCss['blog-menu-label']}  style={{color: `#${color}`}}>{ name }</span>
  )
}

const labelColor = ['410ad8', 'c98cf2']

export default props => {
  return (
    <span>
      {
        props.labels.map((label, index) => <Label key={label} label={label} color={labelColor[index%2]}/>)
      }
    </span>
  )
}
