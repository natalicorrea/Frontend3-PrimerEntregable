import React from 'react';
import data from './data.json';
import Opciones from './Opciones'
import Recordatorio from './Recordatorio';
import Swal from 'sweetalert2';

const ESTADO_INICIAL ={
    contador: 1,
    opcionA: data[0].opciones.a,
    opcionB: data[0].opciones.b,
    historia: data[0].historia,
    historial: [],
    seleccionPrevia: "",
    mensajeBienvenida: "Bienvenido",
};

class Main extends React.Component{
    constructor(){
        super();
        this.state = ESTADO_INICIAL;
    }

    componentDidUpdate(prevState) {
      if (prevState.contador !== this.state.contador) {
        this.state.historial.push(this.state.seleccionPrevia);
      }
    }
       

    componentDidMount() {
        this.mostrarMensajeBienvenida();
    }

    mostrarMensajeBienvenida = () => {
        Swal.fire({
          text: this.state.mensajeBienvenida,
          confirmButtonText: "COMENZAR!",
          confirmButtonColor: '#8E44AD',
        });
      };

      mostrarVentanaFinal = () => {
        Swal.fire({
          title: "Has llegado al final de esta aventura!",
          text: "Deseas volver a empezar?",
          icon: "warning",
          confirmButtonText: "REINICIAR",
          confirmButtonColor: '#8E44AD',
        }).then(() => {
          this.reiniciarHistoria();
        });
      };
    
      reiniciarHistoria = () => {
        this.setState({
          ...ESTADO_INICIAL,
          historial: [],
          mensajeBienvenida: "Volvemos a comenzar...",
        });
    
        this.mostrarMensajeBienvenida();
      };
    
      seleccionarOpcion = (boton) => {
        if (this.state.contador >= 5) {
          this.mostrarVentanaFinal();
        } else {
          const opcion = boton.target.id;
          const identificador = `${this.state.contador + 1}${opcion}`;
          const siguiente = data.find((historia) => historia.id === identificador);
          this.setState({
            contador: this.state.contador + 1,
            opcionA: siguiente.opciones.a,
            opcionB: siguiente.opciones.b,
            historia: siguiente.historia,
            seleccionPrevia: opcion,
          });
        }
      };

      render() {
        return (
          <div className="layout">
            <h1 className="historia"> {this.state.historia}</h1>
            <div className="opciones">
              <Opciones
                evento={this.seleccionarOpcion}
                opcionA={this.state.opcionA}
                opcionB={this.state.opcionB}
              />
            </div>
            <Recordatorio
              historial={this.state.historial}
              seleccionPrevia={this.state.seleccionPrevia}
            />
          </div>
        );
      }
    
}


export default Main;