import React from 'react'

import SideBar from './components/sideBar'

class Notes extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="notesWrap">
        <SideBar></SideBar>
      </div>
    )
  }
}

export default Notes
