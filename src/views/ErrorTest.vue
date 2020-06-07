<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Error generator. Really.</h1>
    <div>
        <input type="text" v-model="ErrTitle" name="" placeholder="Error Title" value="">
        <input type="text" v-model="ErrDesc" name="" placeholder="Error Description" value="">
    </div>
    <button type="button" name="button" @click = 'ErrorGenerate'>Generate! Yay! We love dis!</button>
    <ErrorHandler :title="ErrTitle" :desc="ErrDesc" :type="ErrType" :array = "ErrArray" @error-remove="ErrorRemove" />
  </div>
</template>

<script>
// @ is an alias to /src
import ErrorHandler from "@/components/ErrorHandler.vue";

export default {
    name: "ErrorTest",
    components: {
        ErrorHandler
    },
    data () {
        return {
            ErrTitle: undefined,
            ErrDesc: undefined,
            ErrType: undefined,
            ErrArray: [],
        }
    },
    methods: {
       ErrorGenerate() {
           // this.ErrTitle = 'Hi!';
           // this.ErrDesc = 'Sample error (;';
           this.ErrType = '#D4444A';
           this.ErrExpires = 10;
           if (!this.ErrTitle){
               this.ErrTitle = ''
           }
           if (!this.ErrDesc){
               this.ErrDesc = ''
           }

           if ((this.title != "[TITLE]") && (this.ErrTitle.replace(' ','') != '') && (this.ErrDesc.replace(' ','') != '')){
               this.ErrArray.push([this.ErrTitle,this.ErrDesc,this.ErrType,this.ErrExpires]);
               this.ErrTitle = '';
               this.ErrDesc = '';
           }else{
               if (this.ErrTitle.replace(' ','') == '')
                   this.ErrArray.push(['No title!','Please, add some',this.ErrType,this.ErrExpires]);
               if (this.ErrDesc.replace(' ','') == '')
                   this.ErrArray.push(['No description!','Please, add some',this.ErrType,this.ErrExpires]);
           }
       },
       ErrorRemove(index){
           console.log(<index></index>)
           this.ErrArray.splice(index,1)
       }
   }
};
</script>

<style>
    input{
        border-radius: 5px;
        border: 2px #42b983 solid;
        padding: 10px;
        background: #f5f5f5;
        margin: 5px;
        transition: 0.5s;
    }
    input:focus{
        background: #42b983;
        color: #f5f5f5;
        outline: none;
    }
    input::placeholder{
        color: #42b983;
    }
    input:focus::placeholder{
        color: #f5f5f5;
    }
button {
    background-color: #42b983;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-weight: bold;
    color: #f5f5f5;
    transition: 0.5s;
    float: none;
}
button:hover{
    background-color: #f5f5f5;
    color: #42b983;
    transform: translateY(3px);
    cursor: pointer;
}
</style>
