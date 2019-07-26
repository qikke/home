import isMobile from '@/utils/isPhone';
import Switch from '@c/switch';
import Pop from '@c/windo';
import React, {Component} from 'react';
import Article from './article';
import blogCss from './blog.module.scss';
import Menu from './menu';

export default class Blog extends Component {
  constructor() {
    super()
    this.state = {
      switchin: true,
      articles: [{
        "id": 430039016,
        "title": "@使用Electron开发桌面吸色工具的心路历程",
        "labels": [
          {
            "id": 1063289740,
            "name": "nodejs",
            "color": "410ad8"
          },
          {
            "id": 1063289736,
            "name": "original",
            "color": "c98cf2"
          }
        ],
        "created_at": "2019-04-06T14:25:40Z",
        "updated_at": "2019-06-05T09:52:57Z",
        "body": "# 为什么要(zuo)\r\n> ”世界上只有一种英雄主义，那就是认清自己的发际线之后依然热爱撸码“ -- 欧大强·罗兰   \r\n\r\n[Electron](https://electronjs.org/docs)是一个非常有趣的开源项目，`“它可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用”`。光看这官方简介就让人不住跃跃欲试，再加上市面上没找到能让我中意的桌面吸色工具，所以我决定使用Electron来开发一款。   \r\n下载地址:   \r\n- [windows](https://github.com/ArthurYung/ColorPoint/releases/download/1.0.4/Color-Point-win32-x64.zip)   \r\n- [Mac](https://github.com/ArthurYung/ColorPoint/releases/download/1.0.7/Color-Point-darwin-x64.zip) \r\n\r\n# 需求与界面\r\n\r\n**我的软件，界面一定要好看，LOGO一定要大气，主色调要那种低沉性感又不失庄重，气势磅礴的黑。**   \r\n\r\n![desgin](http://cdn.toofook.com/pick-design.png)<p align=\"center\">(献丑了。果然设计师不是随便就能做的)</p>\r\n\r\n功能大致包括以下几点   \r\n\r\n- `支持快捷键操作并可自定义。`\r\n- `有历史选色记录。`\r\n- `能自由切换色值。`\r\n- `在已知透明度和背景色的条件下计算出当前取色器的rgba色值。`\r\n- `支持最小化到托盘`\r\n \r\n# 基本思路\r\nElectron没有API可以直接拿到当前指针所在位置的色值，但是提供了获取桌面资源的方法。在执行取色操作时使用`desktopCapturer`将当前桌面截图，然后在`canvas`上展示并使用`getImageData()`\r\n获取指定色值。Easy。  \r\n![prossess](http://cdn.toofook.com/proccess.png) \r\n\r\n# 遇到的问题\r\n关于Electron的介绍网络有很多，上手难度也不算高，线程之间的关系与操作还有API文档写的非常详细，但这不意味着你(zuo)起来就能一帆风顺了。  \r\n## Global变量无法获取\r\n通过ipc和global我们很容易就能实现一个简易的状态管理机制，在这里我碰到了第一个坑。   \r\n**因为remote复制对象而不是提供引用，所以在渲染进程中操作的global对象需要提前在主进程中定义初始值。**  \r\nmain process: \r\n```js\r\nglobal.sharedObj = {prop1: null};\r\n```   \r\n\r\nrenderer process:\r\n```js\r\nremote.getGlobal('sharedObj').prop1 = 125;\r\n```\r\n## 使用desktopCapturer截图有色差\r\n通过`desktopCapturer.getSources()`API我们可以得到一个[DesktopCapturerSource](https://electronjs.org/docs/api/structures/desktop-capturer-source#desktopcapturersource-%E5%AF%B9%E8%B1%A1)对象，再配合`getUserMedia`我们可以很方便的获取当前可用资源。   \r\n```js\r\n// In the renderer process.\r\nconst { desktopCapturer } = require('electron')\r\n\r\ndesktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {\r\n  ...\r\n  navigator.mediaDevices.getUserMedia({\r\n    ...\r\n    video: {\r\n      mandatory: {\r\n        chromeMediaSource: 'desktop',\r\n        chromeMediaSourceId: sources[0].id,\r\n        ...\r\n      }\r\n    }\r\n  }).then((stream) => {\r\n    const video = document.querySelector('video')\r\n    video.srcObject = stream\r\n  }).catch((e) => ...)\r\n})\r\n\r\n```\r\n以上是官方给的[使用文档](https://electronjs.org/docs/api/desktop-capturer)，将`video`的第一帧绘制到`canvas`上便成功对当前桌面进行截图。但事情并没有这么简单，在我阅片无数的双眼下，任何细微的差别都无处遁行，使用`getUserMedia`得到的图像竟然有色差\r\n![diff](http://cdn.toofook.com/color-diff2.gif)   \r\n我测算了一下，截图得到的图片和原图相比，绿色通道的值要高一些，所以我猜测造成色差的原因可能是由于浏览器使用的是[sRGB](https://www.zhihu.com/question/20602284)色域，而显示器使用的是aRGB色域(希望有大佬能帮忙指正)。   \r\n虽然通过`DesktopCapturerSource`对象上的`thumnail(NativeImage)`能直接得到当前桌面的缩略图(截图)并且没有色差，**但是`desktopCapturer`在工作中是会阻塞进程的**，不推荐直接通过`thumnail`来获取百分百比例的桌面截图。所以最后我选择使用`desktop-screenshot`这个第三方node库来实现截图步骤。   \r\n\r\n## 写入文件路径报错\r\n我使用了`lowdb`这个node库来储存设置的快捷键和历史色值，开发的时候一切正常，可打包后在Mac上运行起来就会报错`EROFS: read-only file system`\r\n![error](http://cdn.toofook.com/open-error)   \r\n未签名的app似乎在mac上很不招待见，好在Electron提供了[`app.getPath(name)`](https://electronjs.org/docs/api/app#appgetpathname)来获取文件路径的，我们无法确定用户会将软件放到哪个目录，所以我建议将需要被修改的文件放入系统文件夹或临时文件夹。\r\n```js\r\n  app.getPath(name) // Electron\r\n  or\r\n  os.tmpdir() // node原生模块获得临时文件路径\r\n```\r\n\r\n## 打包优化\r\n除了尽可能减少`dependencies`的依赖之外，基本无解。别问，问就是100M起。\r\n\r\n# 结尾\r\n虽然这是一个简单的项目，还有很多没来得及深入发掘。  \r\n虽然常伴小坑，但总的来说瑕不掩瑜，体验还是相当到位的。\r\n如果你也想体验一把桌面应用开发，Electron是个非常靠谱的选择。  \r\n[github](https://github.com/ArthurYung/ColorPoint)  \r\n\r\n参考资料:\r\n- [Electron文档](https://electronjs.org/docs)\r\n\r\n\r\n"
      }
    ],
      currentArticle: {
        "id": 430039016,
        "title": "@使用Electron开发桌面吸色工具的心路历程",
        "labels": [
          {
            "id": 1063289740,
            "name": "nodejs",
            "color": "410ad8"
          },
          {
            "id": 1063289736,
            "name": "original",
            "color": "c98cf2"
          }
        ],
        "created_at": "2019-04-06T14:25:40Z",
        "updated_at": "2019-06-05T09:52:57Z",
        "body": "# 为什么要(zuo)\r\n> ”世界上只有一种英雄主义，那就是认清自己的发际线之后依然热爱撸码“ -- 欧大强·罗兰   \r\n\r\n[Electron](https://electronjs.org/docs)是一个非常有趣的开源项目，`“它可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用”`。光看这官方简介就让人不住跃跃欲试，再加上市面上没找到能让我中意的桌面吸色工具，所以我决定使用Electron来开发一款。   \r\n下载地址:   \r\n- [windows](https://github.com/ArthurYung/ColorPoint/releases/download/1.0.4/Color-Point-win32-x64.zip)   \r\n- [Mac](https://github.com/ArthurYung/ColorPoint/releases/download/1.0.7/Color-Point-darwin-x64.zip) \r\n\r\n# 需求与界面\r\n\r\n**我的软件，界面一定要好看，LOGO一定要大气，主色调要那种低沉性感又不失庄重，气势磅礴的黑。**   \r\n\r\n![desgin](http://cdn.toofook.com/pick-design.png)<p align=\"center\">(献丑了。果然设计师不是随便就能做的)</p>\r\n\r\n功能大致包括以下几点   \r\n\r\n- `支持快捷键操作并可自定义。`\r\n- `有历史选色记录。`\r\n- `能自由切换色值。`\r\n- `在已知透明度和背景色的条件下计算出当前取色器的rgba色值。`\r\n- `支持最小化到托盘`\r\n \r\n# 基本思路\r\nElectron没有API可以直接拿到当前指针所在位置的色值，但是提供了获取桌面资源的方法。在执行取色操作时使用`desktopCapturer`将当前桌面截图，然后在`canvas`上展示并使用`getImageData()`\r\n获取指定色值。Easy。  \r\n![prossess](http://cdn.toofook.com/proccess.png) \r\n\r\n# 遇到的问题\r\n关于Electron的介绍网络有很多，上手难度也不算高，线程之间的关系与操作还有API文档写的非常详细，但这不意味着你(zuo)起来就能一帆风顺了。  \r\n## Global变量无法获取\r\n通过ipc和global我们很容易就能实现一个简易的状态管理机制，在这里我碰到了第一个坑。   \r\n**因为remote复制对象而不是提供引用，所以在渲染进程中操作的global对象需要提前在主进程中定义初始值。**  \r\nmain process: \r\n```js\r\nglobal.sharedObj = {prop1: null};\r\n```   \r\n\r\nrenderer process:\r\n```js\r\nremote.getGlobal('sharedObj').prop1 = 125;\r\n```\r\n## 使用desktopCapturer截图有色差\r\n通过`desktopCapturer.getSources()`API我们可以得到一个[DesktopCapturerSource](https://electronjs.org/docs/api/structures/desktop-capturer-source#desktopcapturersource-%E5%AF%B9%E8%B1%A1)对象，再配合`getUserMedia`我们可以很方便的获取当前可用资源。   \r\n```js\r\n// In the renderer process.\r\nconst { desktopCapturer } = require('electron')\r\n\r\ndesktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {\r\n  ...\r\n  navigator.mediaDevices.getUserMedia({\r\n    ...\r\n    video: {\r\n      mandatory: {\r\n        chromeMediaSource: 'desktop',\r\n        chromeMediaSourceId: sources[0].id,\r\n        ...\r\n      }\r\n    }\r\n  }).then((stream) => {\r\n    const video = document.querySelector('video')\r\n    video.srcObject = stream\r\n  }).catch((e) => ...)\r\n})\r\n\r\n```\r\n以上是官方给的[使用文档](https://electronjs.org/docs/api/desktop-capturer)，将`video`的第一帧绘制到`canvas`上便成功对当前桌面进行截图。但事情并没有这么简单，在我阅片无数的双眼下，任何细微的差别都无处遁行，使用`getUserMedia`得到的图像竟然有色差\r\n![diff](http://cdn.toofook.com/color-diff2.gif)   \r\n我测算了一下，截图得到的图片和原图相比，绿色通道的值要高一些，所以我猜测造成色差的原因可能是由于浏览器使用的是[sRGB](https://www.zhihu.com/question/20602284)色域，而显示器使用的是aRGB色域(希望有大佬能帮忙指正)。   \r\n虽然通过`DesktopCapturerSource`对象上的`thumnail(NativeImage)`能直接得到当前桌面的缩略图(截图)并且没有色差，**但是`desktopCapturer`在工作中是会阻塞进程的**，不推荐直接通过`thumnail`来获取百分百比例的桌面截图。所以最后我选择使用`desktop-screenshot`这个第三方node库来实现截图步骤。   \r\n\r\n## 写入文件路径报错\r\n我使用了`lowdb`这个node库来储存设置的快捷键和历史色值，开发的时候一切正常，可打包后在Mac上运行起来就会报错`EROFS: read-only file system`\r\n![error](http://cdn.toofook.com/open-error)   \r\n未签名的app似乎在mac上很不招待见，好在Electron提供了[`app.getPath(name)`](https://electronjs.org/docs/api/app#appgetpathname)来获取文件路径的，我们无法确定用户会将软件放到哪个目录，所以我建议将需要被修改的文件放入系统文件夹或临时文件夹。\r\n```js\r\n  app.getPath(name) // Electron\r\n  or\r\n  os.tmpdir() // node原生模块获得临时文件路径\r\n```\r\n\r\n## 打包优化\r\n除了尽可能减少`dependencies`的依赖之外，基本无解。别问，问就是100M起。\r\n\r\n# 结尾\r\n虽然这是一个简单的项目，还有很多没来得及深入发掘。  \r\n虽然常伴小坑，但总的来说瑕不掩瑜，体验还是相当到位的。\r\n如果你也想体验一把桌面应用开发，Electron是个非常靠谱的选择。  \r\n[github](https://github.com/ArthurYung/ColorPoint)  \r\n\r\n参考资料:\r\n- [Electron文档](https://electronjs.org/docs)\r\n\r\n\r\n"
      },
      lookPage: false,
      showLogin: false,
      userInfo: {}
    }
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

  async getArticleList () {}

  resetUserInfo(info) {
    this.setState({
      userInfo: info
    })
  }
  handleNew() {
    this.props.history.push('/new')
  }
  render() {
    const { articles, currentArticle, lookPage, userInfo } = this.state
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
        <button onClick={this.handleNew.bind(this)}>new</button>
        <div className={ blogClassNames }>
        <Pop
            noClose={true}
            title="Blogs"
            type="white"
            unmove={true}
            class={blogCss['blog-menu-box']}
          >
            <Menu articles={ articles } currentArticle = { currentArticle } changeArticle={ article => this.changeArticle(article)}/>
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
              resetUserInfo={data=>this.resetUserInfo(data)}
              data={ currentArticle } 
              userInfo={userInfo}
            />
          </Pop>
        </div>
        {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </div>
    )
  }
}
