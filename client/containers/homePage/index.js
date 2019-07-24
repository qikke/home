import React from 'react';
import Footer from './components/footer';
import TextNode from './components/text';

class Home extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <main className="page">
          <div className="app-center">
            <TextNode/>
            <Footer/>
          </div>
      </main>
    )
  }
}

export default Home
