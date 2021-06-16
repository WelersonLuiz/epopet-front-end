import React, { Component, useState} from "react";

class BusinessList extends Component {
  state = {
    value:"Clinica laranja",
    business:[
      {id:"1", name: "Clinica Laranja", address:"Rua da Laranja, nº1,Tiradentes,São Paulo,SP"},
      {id:"2", name: "Clinica Limão", address:"Rua do Limão, nº2, Morumbi,São Paulo,SP" },
      {id:"3", name: "Clinica Coco", address:{ street:"Rua do Coco, nº3", district:" Leblon", city: "Rio de Janeiro", State:"RJ"} },
      {id:"4", name: "Clinica Manga", address:{ street:"Rua da Manga, nº4", district:" Ipanema", city: "Rio de Janeiro", State:"RJ"} }
    ]
  };

  

  /* constructor(){
    super();
    this.state={
      DDL1: [],
      DDL2:[],
      selectddl:'',
    };
  }
 */
 /*  componentDidMount(){
    this.setState({
      DDL1:[
        {name: 'SP', DDL2:['Tiradentes','Morumbi']},
        {name: 'RJ',DDL2:['Leblon','Ipanema']}
      ],
    });
  }
 */
  /* selectChange(e){
    this.setState({selectddl:e.target.value});
    this.setState({DDL2:this.setState.DDL1.find( x => x.name===e.target.value).DDL2});
  } */



  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push("/");
  }

  onChange = e =>{
    this.setState({value:e.target.value})
  }
    
  render() {  
    const {value,business} =this.state;
    const clinica = [
      'Clinica Laranja',
      'Clinica Limão',
      'Clinica Coco',
      'Clinica Manga'
    ];
    const [busca, setBusca] = useState('');
  //  console.log(busca)
    return (
      <form>
        <label>Selecione uma Clínica
         <select
         id="business"
          value={this.state.business.name}
          onChange={this.onChange}
         >
          {this.state.business.map (business =>(
          <option key={business.id} value={business.name} >
              {business.name}
            </option>
          ))}
         </select>
        </label>  
        <p htmlfor="business">{value}</p>
       {/*  <div>
        <label>Selecione o Estado
         <select value={this.state.selectddl} onChange={this.selectChange.bind(this)}>
           <option>
             {this.state.DDL1.map(x => {
               return <option>{x.name}</option>
             })}
           </option>
         </select>
       </label>
       <select>
         <option>
           {
             this.state.DDL2.map(x => {
               return <option>{x}</option>
             })
           }
         </option>
       </select>
        </div> */}
        <div>
          {/* <input 
          type = "text"
          value={busca} 
          onChange={(ev) => setBusca(ev.target.value) }/>
          <ul>
            {clinica.map((clinica)=>(
              <li key={clinica}>{clinica}</li>
            ))}
          </ul> */}
        </div>
      </form>
    );
  }
}

export default BusinessList;
