import React, { Component } from 'react';
// import { render } from 'react-dom';
import './index.css';
import Doc from './pdfDat';
import PdfContainer from './pdf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Administrador: Jesus francisco',
      rank: 'EEO',
      description: 'Resultados Según la Ponderación'
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      state[name] = value;
      return state;
    })
  }

  createPdf = (html) => Doc.createPdf(html);

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <section className="header-bar">
          <span className="header">La Ponderación puede variar de acuerdo al valor de cada Pregunta</span>
        </section>
        <PdfContainer createPdf={this.createPdf}>
          <React.Fragment>
            <section className="flex-column">
              <h2 className="flex">Resultados de la Encuesta Evaluación de Entorno Organizacional (EEO)</h2>
              <section className="flex-row">
                <input placeholder="Rank"
                  name="rank"
                  value={this.state.rank}
                  onChange={this.onChange} />
                <input className="flex"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange} />
              </section>
              <textarea rows="20"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange} />
            </section>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

export default App
