import React, { Component } from 'react';

import { Tabs,List  } from 'antd';
const TabPane = Tabs.TabPane;

const data = [
    'React, среда разработки create-react-app',
    'Redux для работы с состояниями, инструмент разработки redux-devtools-extension, redux-thunk для промежуточного обработчика',
    'Antd для дизайна https://ant.design',
    'dataurl-to-blob - пакет для преобразовании dataURL в Blob.(При сохранении изображения холста,dataURL слишком длинный и браузер запрещает сохранение. Решение - преобразовать в blob, затем обратно в Datauri через createObjectURL  ) ',
    'Detect-browser - для вывода ссобщений о неработоспособности сайта для некоторых браузеров',
];

class About extends Component {
    
    render() { 
    var code1=`
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
    `;
    var code2=`
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
    `
    var code3=`
    var img = new Image();
    var FILTER=\`
    blur(\${this.props.filter.blur}px)
    brightness(\${this.props.filter.brightness})
    contrast(\${this.props.filter.contrast})
    grayscale(\${this.props.filter.grayscale})
    hue-rotate(\${this.props.filter.hueRotate}deg)
    invert(\${this.props.filter.invert}%)
    opacity(\${this.props.filter.opacity}%)
    saturate(\${this.props.filter.saturate}%)
    sepia(\${this.props.filter.sepia}%)
    \`
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
    `
        return (
            <Tabs defaultActiveKey="2">
                <TabPane tab="Технологии, код и прочее" key="1">
                    
                    <h3 style={{ marginBottom: 16 }}>При создании SPA приложение использовались следующие технологии:</h3>
                    <List
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                    <h3 style={{ marginBottom: 16 }}>Разработка</h3>
                    ctx.filter не работает в Opera,Safari,Enge, использовал Detect-browser для вывода сообщения
                    Загрузка изображений с помощью FileReader или createObjectURL
                    <pre>
                    {code2}
                    </pre>
                    Сохранение пользователем изображения
                    <pre>
                    {code1}
                    </pre>
                    Работа с canvas
                    <pre>
                    {code3}
                    </pre>
                </TabPane>
                <TabPane tab="Об авторе" key="2">
                Автор - Димитриев Денис<br/>
                <a href="https://github.com/Denkong" target="_blank" rel="noopener noreferrer">https://github.com/Denkong</a><br/>
                <a href="http://a96259ag.beget.tech" target="_blank" rel="noopener noreferrer">http://a96259ag.beget.tech</a><br/>
                Почта: Dimitriew11@mail.ru<br/>
                </TabPane>
            </Tabs>
        );
    }
}
 
export default About;