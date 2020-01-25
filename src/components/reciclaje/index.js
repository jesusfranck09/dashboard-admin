import React from "react";
// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      awardData: [
        {
          name: "Jesus Francisco FRancisco",
          sexo: ["Hombre"],
          CentrosTrabajo: "Sucursal Norte",
          
        },
        {
          name: "Andres Herrera ",
          sexo: ["Hombre"],
          CentrosTrabajo: "Sucursal Sur",
        },
      ],
      datos:[]
    };
  }

  render() {
    const { awardData } = this.state;

    return (
  
     
    
      <div style={{ backgroundColor: "white", padding: "10px" }}>
       <pre>{JSON.stringify(this.state.datos, null, 2)}</pre>
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "12px"
          }}
        >
          <ReactTable
            defaultFilterMethod={(filter, row) =>
             
              String(row[filter.id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
                
            }
            columns={[
              {
                Header: "Empleados",
                accessor: "name"
              },
              {
                Header: "Sexo",
                accessor: "sexo",
                Cell: row => {
                  if (Array.isArray(row.value)) {
                    return row.value.join(", ");
                  }
                },
                filterMethod: (filter, row) => {
                  // console.log(filter.value)
                  if (filter.value === "All") {
                    return true;
                  }

                  if (filter.value === "Hombre") {
                    
                    return row["sexo"].includes("Hombre");
                   
                  }

                  if (filter.value === "Mujer") {
                    return row["sexo"].includes("Mujer");
                  }


                  // return row[filter.id] === ['Technology']
                  // console.log(row[filter.id])
                  // console.log(x)
                  // return row[filter.id] === x
                },
                Filter: ({ filter, onChange }) => (
                  <select
                    style={{ width: "250px" }}
                    onChange={event => onChange(event.target.value)
                    }
                
                    //  {
                    // let data = [].slice.call(event.target.selectedOptions).map(o => { return o.value})
                    // //  console.log(data)
                    //     if(data.length > 1){
                    //         data.forEach(element => {
                    //             onChange(console.log(event.target.value.includes(element)))
                    //         });
                    //     }else{
                    //         onChange(data.toString())
                    //     }
                    // }}
                    value={filter ? filter.value : "All"}
                  >
                    <option value="All">General</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                 
                  </select>
                )
              },
              {
                Header: "Centros de Trabajo",
                accessor: "CentrosTrabajo",
                width: 170,
                Cell: ({ value }) =>
                  value === "Sucursal Norte"
                    ? "Sucursal Norte"
                    : value === "Sucursal Sur",
                filterMethod: (filter, row) => {
                  if (filter.value === "All") {
                    return true;
                  }

                  if (filter.value === "Sucursal Norte") {
                    return row[filter.id] === "Sucursal Norte";
                  }

                  if (filter.value === "Sucursal Sur") {
                    return row[filter.id] === "Sucursal Sur";
                  }
                },
                Filter: ({ filter, onChange }) => (
                  <select
                    style={{ width: "150px" }}
                    onChange={event => 
                      
                      onChange(event.target.value)

                    }
                    value={filter ? filter.value : "All"}
                  
                  >
                    <option value="All">General</option>
                    <option value="Sucursal Norte">Sucursal Norte</option>
                    <option value="Sucursal Sur">Sucursal Sur</option>
                
                  </select>
                
                )
              }
            ]}
         
            data={awardData}
            filterable
            defaultPageSize={10}
            className="-striped -highlight"


            onFetchData={(state, instance) => {

              console.log("estado" , state.sortedData)
              this.setState({datos:state.sortedData})
              // show the loading overlay
              // this.setState({loading: true})
              // // fetch your data
              // Axios.post('mysite.com/data', {
              //   page: state.page,
              //   pageSize: state.pageSize,
              //   sorted: state.sorted,
              //   filtered: state.filtered
              // })
              //   .then((res) => {
              //     // Update react-table
              //     this.setState({
              //       data: res.data.rows,
              //       pages: res.data.pages,
              //       loading: false
              //     })
              //   })
            }}
        
          >
</ReactTable>

        </div>
      </div>
    );
  }
}

export default App