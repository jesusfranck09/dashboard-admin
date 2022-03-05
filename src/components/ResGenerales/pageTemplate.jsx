
import React from 'react';
import './styles.css'
export default class PageTemplate extends React.Component {
    render() {
        return (
            <div style={{ position: "absolute", bottom: "10px", left: "530px" }}>
                <font size="1" face="arial" color="black" style = {{marginBottom:25}}> Página {this.props.pageNum}</font>
            </div>
        );
    }
}

