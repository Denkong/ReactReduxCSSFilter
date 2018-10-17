//React
import React, { Component } from 'react';
//Router
import { Link } from "react-router-dom";
//REDUX
import {connect} from 'react-redux';
import {setFilter} from '../actions/filterAction'

//COMPONENTS
import Contents from "./Contents"
//ANTD
import { Row, Slider,Col,Layout} from 'antd';
const {Sider, Content } = Layout;


class Main extends Component {
    onChange=(value,name)=>{
      this.props.setFilter(value,name)
    }
  

  render() {
      return(
        <Layout >
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{color:"white",textAlign:"center", }}
            width={300}
          >
          
            <Row  type="flex" justify="center" align="middle" style={{height:"100%",flexFlow: "column"}}>
                
                <Col span={15}>
                  Размытие по Гауссу (blur)
                  <Slider
                    min={0}
                    max={5}
                    onAfterChange={(value)=>this.onChange(value,"blur")}
                    step={0.05}
                  />
                </Col>
                <Col span={15}>
                  Яркость (brightness)
                  <Slider
                    min={0}
                    max={5}
                    marks={{1: {
                      style: {
                        color: '#fff',
                      },
                      label: <strong>1</strong>,
                    }}}
                    defaultValue={1}
                    step={0.05}
                    onAfterChange={(value)=>this.onChange(value,"brightness")}
                  />
                </Col>
                <Col span={15}>
                  Контрастность (contrast)
                  <Slider
                    min={0}
                    max={5}
                    marks={{1: {
                      style: {
                        color: '#fff',
                      },
                      label: <strong>1</strong>,
                    }}}
                    defaultValue={1}
                    step={0.05}
                    onAfterChange={(value)=>this.onChange(value,"contrast")}
                  />
                </Col>
                <Col span={15}>
                  Оттенок серого (grayscale)
                  <Slider
                    min={0}
                    max={1}
                    defaultValue={0}
                    step={0.05}
                    onAfterChange={(value)=>this.onChange(value,"grayscale")}
                  />
                </Col>
                <Col span={15}>
                  (hue-rotate)
                  <Slider
                    min={0}
                    max={360}
                    defaultValue={0}
                    step={5}
                    onAfterChange={(value)=>this.onChange(value,"hueRotate")}
                  />
                </Col>
                <Col span={15}>
                  Негатив(invert)
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={0}
                    step={5}
                    onAfterChange={(value)=>this.onChange(value,"invert")}
                  />
                </Col>
                <Col span={15}>
                  Прозрачность(opacity)
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={100}
                    step={5}
                    onAfterChange={(value)=>this.onChange(value,"opacity")}
                  />
                </Col>
                <Col span={15}>
                  Насыщенность(saturate)
                  <Slider
                    min={0}
                    max={300}
                    defaultValue={100}
                    step={10}
                    marks={{100: {
                      style: {
                        color: '#fff',
                      },
                      label: <strong>1</strong>,
                    }}}
                    onAfterChange={(value)=>this.onChange(value,"saturate")}
                  />
                </Col>
                <Col span={15}>
                  (sepia)
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={0}
                    step={5}
                    onAfterChange={(value)=>this.onChange(value,"sepia")}
                  />
                </Col>
            </Row>
          </Sider>
                <Layout>
                  <Content >
                    <div id="canvasContainer" style={{ padding: 15, background: '#fff', height:"100vh",display:"flex",justifyContent:"center",alignItems: "center" }}>
                        <Contents/>
                        <div style={{ color: '#000',position:"absolute",bottom:0,opacity:0.4,textAlign:'center'}}>
                          Dimitriev Denis <a href="https://github.com/Denkong" target="_blank" rel="noopener noreferrer">https://github.com/Denkong</a><br/>
                          <Link to="/about">About</Link>
                        </div>
                    </div>
                   
                  </Content>
                  
                </Layout>
        </Layout>
      )
  }
}



export default connect(null,{setFilter})(Main) ;
