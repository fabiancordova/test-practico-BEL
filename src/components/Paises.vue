<template>
 <!-- se utiliza bootstrap para dar estilo a los componentes -->
  <div id="app" class="container">
      <div class="text-center">

          <h1 class="font-weight-bold">Listado de Países</h1>
          <h2>Seleccione un continente</h2>    
      </div>
      <!-- código para seleccionar región del mundo con estilo bootstrap -->
      <div class="text-center">
        <button type="button" class="btn btn-primary" @click="seleccionarRegion('Americas')">Americas</button>
        <button type="button" class="btn btn-secondary" @click="seleccionarRegion('Europe')">Europe</button>
        <button type="button" class="btn btn-success" @click="seleccionarRegion('Asia')">Asia</button>
        <button type="button" class="btn btn-danger" @click="seleccionarRegion('Africa')">Africa</button>
        <button type="button" class="btn btn-warning" @click="seleccionarRegion('Oceania')">Oceania</button>
        <button type="button" class="btn btn-info" @click="seleccionarRegion('')">Todos</button>
      </div>

      <!-- código para seleccionar país del mundo con estilo bootstrap centrado en el medio -->
      <div class="row">
        <div class="col"> 
        </div>
        <div class="col">    
            <form id="formulario">
                <div class="form-group ">
                    <label>Buscar país</label>
                    <input type="text" class="form-control border border-primary" v-model="nombrePais">
                    <button type="button" class="btn btn-secondary mt-2" @click="buscarPais">Buscar</button>
                </div>
            </form> 
        </div>
        <div class="col"> 
       </div>  
    </div>
        <br>

    <!-- código para mostrar información del país seleccionado -->
    <div class="container" v-if="busquedadPais == true">
        <div class="row justify-content-center">
            <div class="col"> 
            </div>
             <div class="col-sm border border-primary rounded"
                v-for="dato in datoPais" :key= "dato.id">
                <b> {{dato.name}} </b>
                <br>
                <img :src="dato.flag" alt="bandera del país" width="50px" height="50px">
                <br>
                <b> Población:</b>
                <b> <span v-if="dato.population > 100000000" class="text-danger">{{dato.population}} </span> </b>
                <b> <span v-if="dato.population <= 100000000" class="text-success">{{dato.population}} </span> </b>
                <br>
                Capital: {{dato.capital}}
                <br>
                Región: {{dato.region}}
            </div>
            <div class="col"> 
            </div>
        </div>
                    <div class="fondo"></div>

    </div>

      <!-- código para mostrar información de paises según región seleccionada -->
    <div class="container">
        <div class="row">
            <div class="col-md border border-primary rounded"
             v-for="dato in datos" :key= "dato.id">
            <b> {{dato.name}} </b>
            <br>
            <img :src="dato.flag" alt="bandera del país" width="95px" height="95px">
            <br>
            Población: {{dato.population}}
            <br>
            Capital: {{dato.capital}}
            <br>
            Región: {{dato.region}}
        </div>
        </div>
    </div>
   <div>
  </div>
 </div>
</template>


<script>
import store  from '../store' //importar store para usar dispatch

export default {
  name: "Paises",

  data() {
    return {
        datos:{},
        datosOrdenados:{},
        datoPais: {},
        region: "",
        busquedadPais: false,
        nombrePais: "",
    }
  },
  mounted() {
    this.getData();  
  },
  methods: {
    //consumo de API pública de países en el mundo.  
    async getData() {
        const res= await fetch("https://restcountries.eu/rest/v2/all");
        const datos= await res.json();
        this.datosOrdenados= datos.sort( (a,b) => b.population - a.population)
        store.dispatch ('actionsPaises',this.datosOrdenados);
    },
    //filtrar de acuerdo a la región seleccionada.
    seleccionarRegion(region)
    {
        switch (region) {
            case 'Americas':
                this.datos= store.state.datos.filter( (dato) => dato.region == "Americas");
                break;
            case 'Europe':
                this.datos= store.state.datos.filter( (dato) => dato.region == "Europe");
                break;
            case 'Asia':
                this.datos= store.state.datos.filter( (dato) => dato.region == "Asia");
                break;
            case 'Africa':
                this.datos= store.state.datos.filter( (dato) => dato.region == "Africa");
                break;
            case 'Oceania':
                this.datos= store.state.datos.filter( (dato) => dato.region == "Oceania");
                break;
            default:
                this.datos= store.state.datos;
            }
        this.busquedadPais= false;

        },
    //deja la primera letra en mayúscula para que pase el filtro.
    capitalize() {
        return this.nombrePais[0].toUpperCase() + this.nombrePais.slice(1);
    },
    buscarPais()
    {       
        this.busquedadPais= true;
        this.nombrePais= this.capitalize();
        this.datoPais= store.state.datos.filter( (dato) => dato.name == this.nombrePais);
        //resetea el input del formulario
        this.nombrePais="";
    },
  }
}
</script>

<style>
</style>