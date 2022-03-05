import React, { Component } from 'react';
import {Card, Button} from 'antd'
import { Chart } from "react-google-charts";
import './index.css'
import { FloatingButton, Item } from "react-floating-button";
import downloadIcon from "./close.svg";
class Donut extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		let {estadisticas,verGraficas,reporte} = this.props
		let arraySexo = [];
		let array = [];
		let arrayExpLab = [];
		let arrayAnt = [];
		let arrayEstudios = [];
		let arrayTipoPuesto = [];
		let hombre = [];
		let mujer = [];
		let edad1519= []
		let edad2024= []
		let edad2529= []
		let edad3034= []
		let edad3539= []
		let edad4044= []
		let edad4549= []
		let edad5054= []
		let edad5559= []
		let edad6064= []
		let edad6569= []
		let edad70omas= []
		let sinEstudios= []
		let primaria= []
		let secundaria= []
		let preparatoria= []
		let licenciatura= []
		let maestria= []
		let doctorado= []
		let expLab6Meses=[]
		let expLab6Meses1Año=[]
		let expLab1a4años=[]
		let expLab5a9años=[]
		let expLab10a14años=[]
		let expLab15a19años=[]
		let expLab20a24años=[]
		let expLab25años=[] 
		let ant6Meses=[]
		let ant6Meses1Año=[]
		let ant1a4años=[]
		let ant5a9años=[]
		let ant10a14años=[]
		let ant15a19años=[]
		let ant20a24años=[]
		let ant25años=[]
		let operativo = []
		let profesionalTecnico= []
		let supervisor = []
		let gerencial = []
		let directivo = []
		estadisticas.map(rows=>{
			array.push(rows.FechaNacimiento)
			arrayExpLab.push(rows.ExperienciaLaboral)
			arrayAnt.push(rows.TiempoPuesto)
			arrayEstudios.push(rows.NivelEstudios)
			arraySexo.push(rows.Sexo)
			arrayTipoPuesto.push(rows.TipoPuesto)
		})
		//////////////////////// genero ////////////////////
		const resultSexoH= arraySexo.filter(function(valor){
			return valor === "MASCULINO"
		})
		  hombre.push(resultSexoH)
		  const resultSexoM= arraySexo.filter(function(valor){
			return valor === "FEMENINO"
		  })
		  mujer.push(resultSexoM)
		//////////////////////////////////Edad/////////////////
			const result1519 = array.filter(function(valor){
			return valor === "15 A 19"
			})
			edad1519.push(result1519)
			const result2024 = array.filter(function(valor){
			return valor === "20 A 24"
			})
			edad2024.push(result2024)
			const result2529 = array.filter(function(valor){
			return valor === "25 A 29"
			})
			edad2529.push(result2529)
			const result3034 = array.filter(function(valor){
			return valor === "30 A 34"
			})
			edad3034.push(result3034)
			const result3539 = array.filter(function(valor){
			return valor === "35 A 39"
			})
			edad3539.push(result3539)
			const result4044 = array.filter(function(valor){
			return valor === "40 A 44"
			})
			edad4044.push(result4044)
			const result4549 = array.filter(function(valor){
			return valor === "45 A 49"
			})
			edad4549.push(result4549)
			const result5054 = array.filter(function(valor){
			return valor === "50 A 54"
			})
			edad5054.push(result5054)
			const result5559 = array.filter(function(valor){
			return valor === "55 A 59"
			})
			edad5559.push(result5559)
			const result6064 = array.filter(function(valor){
			return valor === "60 A 64"
			})
			edad6064.push(result6064)
			const result6569 = array.filter(function(valor){
			return valor === "65 A 69"
			})
			edad6569.push(result6569)
			const result70omas = array.filter(function(valor){
			return valor === "70 0 mas"
			})
			edad70omas.push(result70omas)
		/////////////////// Formacion/////////////////////////////
		  const resultSinEstudios= arrayEstudios.filter(function(valor){
			return valor === "SIN FORMACION"
		  })
		  sinEstudios.push(resultSinEstudios)
		  const resultPrimaria= arrayEstudios.filter(function(valor){
			return valor === "PRIMARIA"
		  })
		  primaria.push(resultPrimaria)
		  const resultSecundaria= arrayEstudios.filter(function(valor){
			return valor === "SECUNDARIA"
		  })
		  secundaria.push(resultSecundaria)
		  const resultPreparatoria= arrayEstudios.filter(function(valor){
			return valor === "PREPARATORIA O BACHILLERATO"
		  })
		  preparatoria.push(resultPreparatoria)
		  const resultLicenciatura= arrayEstudios.filter(function(valor){
			return valor=== "LICENCIATURA"
		  })
		  licenciatura.push(resultLicenciatura)
		  const resultMaestria= arrayEstudios.filter(function(valor){
			return valor === "MAESTRIA"
		  })
		  maestria.push(resultMaestria)
		  const resultDoctorado= arrayEstudios.filter(function(valor){
			return valor === "DOCTORADO"
		  })
		  doctorado.push(resultDoctorado)
		  
		  ///////////////////////////Exp Laboral/////////////////////////////////
		  const resultExpLab6Meses= arrayExpLab.filter(function(valor){
			return valor === "MENOS DE 6 MESES"
		  })
		  expLab6Meses.push(resultExpLab6Meses)
		  const resultExpLab1Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 6 MESES Y 1 AÑO"
		  })
		  expLab6Meses1Año.push(resultExpLab1Año)
		  const resultExpLab4Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 1 A 4 AÑOS"
		  })
		  expLab1a4años.push(resultExpLab4Año)
		  const resultExpLab9Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 5 A 9 AÑOS"
		  })
		  expLab5a9años.push(resultExpLab9Año)
		  const resultExpLab14Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 10 A 14 AÑOS"
		  })
		  expLab10a14años.push(resultExpLab14Año)
		  const resultExpLab19Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 15 A 19 AÑOS"
		  })
		  expLab15a19años.push(resultExpLab19Año)
		  const resultExpLab24Año= arrayExpLab.filter(function(valor){
			return valor === "ENTRE 20 A 24 AÑOS"
		  })
		  expLab20a24años.push(resultExpLab24Año)
		  const resultExpLab25Año= arrayExpLab.filter(function(valor){
			return valor === "25 AÑOS O MAS"
		  })
		  expLab25años.push(resultExpLab25Año)
		////////////////////////////Antiguedad /////////////////////////
		  const resultAnt6Meses= arrayAnt.filter(function(valor){
			return valor === "MENOS DE 6 MESES"
		  })
		  ant6Meses.push(resultAnt6Meses)
		  const resultAnt1Año= arrayAnt.filter(function(valor){
			return valor === "ENTRE 6 MESES Y 1 AÑO"
		  })
		  ant6Meses1Año.push(resultAnt1Año)
		  const resultAnt4Año= arrayAnt.filter(function(valor){
			return valor === "ENTRE 1 A 4 AÑOS"
		  })
		  ant1a4años.push(resultAnt4Año)
		  const resultAnt9Año= arrayAnt.filter(function(valor){
			return valor === "ENTRE 5 A 9 AÑOS"
		  })
		  ant5a9años.push(resultAnt9Año)
		  const resultAnt14Año= arrayAnt.filter(function(valor){
			return valor=== "ENTRE 10 A 14 AÑOS"
		  })
		  ant10a14años.push(resultAnt14Año)
		  const resultAnt19Año= arrayAnt.filter(function(valor){
			return valor === "ENTRE 15 A 19 AÑOS"
		  })
		  ant15a19años.push(resultAnt19Año)
		  const resultAnt24Año= arrayAnt.filter(function(valor){
			return valor === "ENTRE 20 A 24 AÑOS"
		  })
		  ant20a24años.push(resultAnt24Año)
		  const resultAnt25Año= arrayAnt.filter(function(valor){
			return valor === "25 AÑOS O MAS"
		  })
		  ant25años.push(resultAnt25Año)
		  //////////////////////////////////Puesto///////////////////////////////////////////
		  const resultOperativo= arrayTipoPuesto.filter(function(valor){
			return valor === "OPERATIVO"
		  })
		  operativo.push(resultOperativo)
		  const resultProfesionalTecnico= arrayTipoPuesto.filter(function(valor){
			return valor === "PROFESIONAL O TECNICO"
		  })
		  profesionalTecnico.push(resultProfesionalTecnico)
		  const resultSupervisor= arrayTipoPuesto.filter(function(valor){
			return valor === "SUPERVISOR"
		  })
		  supervisor.push(resultSupervisor)
		  const resultGerencial= arrayTipoPuesto.filter(function(valor){
			return valor === "GERENCIAL"
		  })
		  gerencial.push(resultGerencial)
		  const resultDirectivo= arrayTipoPuesto.filter(function(valor){
			return valor === "DIRECTIVO"
		  })
		  directivo.push(resultDirectivo)
		  let graficaTitulo;
		  let graficaPuesto = 
			<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				["Puesto","Porcentaje"],
				["operativo",operativo[0].length],
				["profesionalTecnico",profesionalTecnico[0].length],
				["supervisor",supervisor[0].length],
				["gerencial",gerencial[0].length],
				["directivo",directivo[0].length],
				]
				}
				options={{
				title:`Distribución por Puesto` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>	
			let graficaAnt = 
			<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				["Antiguedad","Porcentaje"],
				["Menos de 6 meses",ant6Meses[0].length],
				["Entre 6 meses y 1 año",ant6Meses1Año[0].length],
				["Entre 1 a 4 años",ant1a4años[0].length],
				["Entre 5 a 9 años",ant5a9años[0].length],
				["Entre 10 a 14 años",ant10a14años[0].length],
				["Entre 15 a 19 años",ant15a19años[0].length],
				["Entre 20 a 24 años",ant20a24años[0].length],
				["25 años o más",ant25años[0].length],
				]
				}
				options={{
				title:`Distribución por Antiguedad` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>	
			let graficaExpLab = 
			<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				["Experiencia laboral","Porcentaje"],
				["Menos de 6 meses",expLab6Meses[0].length],
				["Entre 6 meses y 1 año",expLab6Meses1Año[0].length],
				["Entre 1 a 4 años",expLab1a4años[0].length],
				["Entre 5 a 9 años",expLab5a9años[0].length],
				["Entre 10 a 14 años",expLab10a14años[0].length],
				["Entre 15 a 19 años",expLab15a19años[0].length],
				["Entre 20 a 24 años",expLab20a24años[0].length],
				["25 años o más",expLab25años[0].length],
				]
				}
				options={{
				title:`Distribución por Experiencia laboral` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>	
			let graficaEdad = 
			<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				["Edad","Porcentaje"],
				["15 a 19 años",edad1519[0].length],
				["20 a 24 años",edad2024[0].length],
				["25 a 29 años",edad2529[0].length],
				["30 a 34 años",edad3034[0].length],
				["35 a 39 años",edad3539[0].length],
				["40 a 44 años",edad4044[0].length],
				["45 a 49 años",edad4549[0].length],
				["50 a 54 años",edad5054[0].length],
				["55 a 59 años",edad5559[0].length],
				["60 a 64 años",edad6064[0].length],
				["65 a 69 años",edad6569[0].length],
				["70 o mas",edad70omas[0].length]
				]
				}
				options={{
				title:`Distribución por Edad` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>
			let graficaFormacion  = 
				<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
					["Formación","Porcentaje"],
					["Sin formación",sinEstudios[0].length],
					["Primaria",primaria[0].length],
					["Secundaria",secundaria[0].length],
					["Preparatoria",preparatoria[0].length],
					["Licenciatura",licenciatura[0].length],
					["Maestria",maestria[0].length],
					["Doctorado",doctorado[0].length],

				]}
				options={{
				title:`Distribución por Formación académica` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>
			let graficaGenero  = 
				<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				['Género', 'Porcentaje'],
				['Masculino', hombre[0].length],
				['Femenino', mujer[0].length],

				]}
				options={{
				title:`Distribución por Género` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>
			let graficas;
			if(verGraficas === true){
				graficaTitulo = <h6 style={{marginTop:"4%"}}><strong>Gráficas de distribucion en {localStorage.getItem("razonsocial")}</strong></h6>
				graficas = <div style={{marginTop:"5%"}} className="graficasEstadistica">
				<FloatingButton>
				<Item
				imgSrc={downloadIcon}
				onClick={(e) => {
				window.location.reload();
				}}
				/>
        		</FloatingButton>;
				{graficaEdad}
				{graficaGenero} 
				{graficaFormacion}
				{graficaAnt}
				{graficaPuesto}
				{graficaExpLab}
				</div>	
				
			}else{
				graficas =
				<Chart
				width={'400px'}
				height={'250px'}
				chartType="PieChart"
				loader={<div>Cargando distribución</div>}
				data={[
				['Género', 'Porcentaje'],
				['Masculino', hombre[0].length],
				['Femenino', mujer[0].length],

				]}
				options={{
				title:`Distribución por Género` ,
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
			/>
			}

		return (
			<div>
				<Card>
				<center>{graficaTitulo}</center>
				{graficas}
				</Card>
			</div>	   
		 );
	}
}
 
export default Donut;