import React from 'react';

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.uploadRef = React.createRef()
    }

    componentDidMount() {
        this.easyUpload()
    }

    render () {
        return (
            <div id="upload" ref={this.uploadRef}></div>
        )
    }

    easyUpload(){
        var input = document.createElement("input");
        input.type = "file";
        this.uploadRef.current.appendChild(input)
        input.onchange = function(){
          var file = input.files[0];
          var form = new FormData();
          form.append("file", file); //第一个参数是后台读取的请求key值
          form.append("fileName", file.name);
          form.append("other", "666666"); //实际业务的其他请求参数
          var xhr = new XMLHttpRequest();
          var action = "https://qikke.cn/api/upload"; //上传服务的接口地址
          xhr.open("POST", action);
          xhr.send(form); //发送表单数据
          xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
              var resultObj = JSON.parse(xhr.responseText);
              console.log(resultObj)
            }
          }
        }
      }
}

export default Upload