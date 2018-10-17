//React
import React, { Component } from 'react';
//REDUX
import {connect} from 'react-redux';
import {setPhoto} from '../actions/photoAction'
import {deletePhoto} from '../actions/photoAction'
//COMPONENTS

//ANTD
import 'antd/dist/antd.css';
import { Upload, Icon,Button} from 'antd';
const Dragger = Upload.Dragger;
//Перевод DataURL в Blob
var dataURLtoBlob = require('dataurl-to-blob');




class Contents extends Component {

  componentDidMount()
  {
    this.props.photo&&this.updateCanvas();
  }
  componentDidUpdate() { 
    this.props.photo&&this.updateCanvas();
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  updateCanvas=()=>{
    
    var img = new Image();
    var FILTER=`
    blur(${this.props.filter.blur}px)
    brightness(${this.props.filter.brightness})
    contrast(${this.props.filter.contrast})
    grayscale(${this.props.filter.grayscale})
    hue-rotate(${this.props.filter.hueRotate}deg)
    invert(${this.props.filter.invert}%)
    opacity(${this.props.filter.opacity}%)
    saturate(${this.props.filter.saturate}%)
    sepia(${this.props.filter.sepia}%)
    `
    img.src = this.props.photo;
    img.onload=()=>
    {
      var relation=img.width/img.height

      var myCanvas = this.refs.myCanvas;
      var ctx = myCanvas.getContext('2d')
     
      var myCanvas2 = this.refs.myCanvas2;
      var ctx2 = myCanvas2.getContext('2d')
      myCanvas2.width=img.width;
      myCanvas2.height=img.height;
      ctx2.filter=FILTER
      ctx2.drawImage(img, 0, 0, myCanvas2.width, myCanvas2.height); 
      
      clearInterval(this.intervalId)
      function resizeCanvas() {
        var width = document.getElementById("canvasContainer").clientWidth
        myCanvas.width = width>1000?width-200:width-20
        myCanvas.height = myCanvas.width/relation;
        ctx.filter=FILTER
        ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
          
      }
      this.intervalId = setInterval(resizeCanvas,10)

    }
  }

  mouseOver=()=>{
    var img = new Image();
    img.src = this.props.photo;
    clearInterval(this.intervalId)
    var myCanvas = this.refs.myCanvas;
    var ctx = myCanvas.getContext('2d')
    ctx.filter='none'
    ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
  }
  mouseOut=()=>{
    this.updateCanvas();
  }

  download=()=>{
    console.log("Загрузка");
    var myCanvas2 = this.refs.myCanvas2;
    var blob=dataURLtoBlob(myCanvas2.toDataURL("image/png"));
    var element = document.createElement('a');
    element.setAttribute('href',URL.createObjectURL(blob) );
    element.setAttribute('download','Css-Filter');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  onRestart=()=>{
    this.props.deletePhoto()
  }

  render() {
    var FILTER=`
    blur(${this.props.filter.blur}px)
    brightness(${this.props.filter.brightness})
    contrast(${this.props.filter.contrast})
    grayscale(${this.props.filter.grayscale})
    hue-rotate(${this.props.filter.hueRotate}deg)
    invert(${this.props.filter.invert}%)
    opacity(${this.props.filter.opacity}%)
    saturate(${this.props.filter.saturate}%)
    sepia(${this.props.filter.sepia}%)`
    if (this.props.photo) {
      return (
        <div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Button type="danger" style={{width:"150px"}} icon="undo" onClick={this.onRestart} >Restart</Button>
         
          <Button type="primary" style={{width:"150px"}} icon="download" onClick={this.download} >Download</Button>
          <canvas ref="myCanvas" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} ></canvas>
          <canvas ref="myCanvas2" style={{display:"none"}} ></canvas>
          <code>
            filter : {FILTER}<br/>
            Object.style.filter = "{FILTER}"
          </code>
        </div>  
      );
    } else {
      return (
          <Dragger 
                  multiple={false} 
                  showUploadList={false}
                  beforeUpload={(file)=>{
                    //C помощью FileReader
                    var self=this
                    var reader = new FileReader();
                    reader.onload = function(event) {
                     
                      var error = event.target.error;
                      if (error){
                        console.log('ошибка');
                      } else {
                        var dataUri = event.target.result;
                        self.props.setPhoto(dataUri);
                      }
                    };
                    reader.readAsDataURL(file);
                    //С помощью createObjectURL
                    // var imageUrl = URL.createObjectURL(file);
                    // this.props.setPhoto(imageUrl);
                    // console.log(imageUrl);
                    
                    return false
                  }}
              >
              <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger> 
      );
    }
    
  }
}

const mapStatetoProps=state=>({
    photo:state.photoReducer.photo,
    filter:state.filterReducer
})

export default connect(mapStatetoProps,{setPhoto,deletePhoto})(Contents) ;


/**
 * При сохранении на сервере
 */
 // const URL_ACTION='http://127.0.0.1:3001/upload';
// name='photos'
// action={URL_ACTION}
// onChange={(info)=>{
//   console.log(info);
//     // const status = info.file.status;
//     // if (status === 'done') {
//     //     this.props.setPhoto(info.file.name);    

//     //     message.success(`${info.file.name} file uploaded successfully.`);
//     // } else if (status === 'error') {
//     //     message.error(`${info.file.name} file upload failed.`);
//     // }
//     }
// }
// }