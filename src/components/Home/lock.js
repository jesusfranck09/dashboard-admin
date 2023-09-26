import React, { Component } from 'react'
import { EditOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card,Input } from 'antd';
const { Meta } = Card;

class LOCK extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:false,
            value:''
         }
         this.onChange = this.onChange.bind(this)
    }
    onChange(e){
      this.setState({value:e.target.value})      
    }
    input(){
        this.setState({input:true})
    }
    onOK(){
        let pass = this.state.value
        if(pass === "035"){
            this.props.history.push("/empty")
        }else{
            alert("Sin datos")
        }
    }
    cancel(){
        this.props.history.push("/inicio")
    }
    render() {
        let input;
        if(this.state.input === true){
            input =<div> <Input type="password" onChange = {this.onChange}/><Button type="link" onClick={e=>{this.onOK()}}>Aceptar</Button></div>
        }
        return ( 
            <div>
                <center>
                    <Card
                    style={{ width: 300,marginTop:"5%" }}
                    cover={
                    <img
                        alt="example"
                        src="https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                    }
                    actions={[
                    <SettingOutlined key="setting" onClick={e=>this.input()} />,
                    <CloseOutlined   key="cancel" onClick={e=>this.cancel()}/>,
                    ]}
                >
                    <Meta
                    title="AVISO"
                    description="Uso restringido temporal"
                    />
                    {input}
                </Card>
                </center>
          </div>
         );
    }
}
 
export default LOCK;