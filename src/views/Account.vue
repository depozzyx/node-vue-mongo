<template>
  <div class="about">
    <h1 v-show = 'Window === 2'>Account </h1>


    <div id = 'body'>
        <div v-if = 'Window === 2' style="overflow: auto;" class="wrapper-data">
            <div style = 'width: 100%'>
                <h1>{{UName}} <b>{{URate}} <i class="fas fa-long-arrow-alt-up"></i></b></h1>
                <h3>#{{ULogin}}</h3>
                <br />
                <h3>Creation date:{{UDate}}</h3>
                <h3>Accound ID:{{UId}}</h3>
                <!-- <button style='float: right;'>dismiss.</button>
                <button v-show = '!AddField' @click='AddField = !AddField' style='float: right;'>yes!</button>
                <button v-show = 'AddField' @click='AddField = !AddField' style='float: right;'>well, no.</button> -->
            </div>
        </div>
        <div v-if = 'Window === 1' style="overflow: auto;" class="wrapper">
            <div class='d-flex justify-content-center flex-column' style = 'width: 100%'>
                <h3>Account registration</h3><br>
                <input style='width: 100%;' class="p-2" type="text" v-model="TempRName" name="" placeholder="Name" value="">
                <input style='width: 100%;' class="p-2" type="text" v-model="TempRLogin" name="" placeholder="Login" value="">
                <input style='width: 100%;' class="p-2" type="password" v-model="TempRPassword" name="" placeholder="Password" value="">
                <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center'>
                    <button style='margin-right: 5px;' class="p-2" @click='CheckRegister()' type="button" name="button">Register <i class="fas fa-clipboard-check"></i></button>
                    <button class="p-2" @click='Window = 0' type="button" name="button">Back</button>
                </div>
            </div>
            <!-- <button style='opacity: 0;'>0</button> -->
            <!-- <h1 style='opacity: 0;'>1</h1> -->
        </div>

        <div v-if = 'Window === 0' style="overflow: auto;" class="wrapper">
            <div class='d-flex justify-content-center flex-column' style = 'width: 100%'>
                <h3>Account login</h3><br>
                <input style='width: 100%;' class="p-2" type="text" v-model="TempLogin" name="" placeholder="Login" value="">
                <input style='width: 100%;' class="p-2" type="password" v-model="TempPassword" name="" placeholder="Password" value="">
                <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center'>
                    <button style='margin-right: 5px;' class="p-2" @click='CheckLogin()' type="button" name="button">Login <i class="fas fa-clipboard-check"></i></button>
                    <button class="p-2" @click='Window = 1' type="button" name="button">Register</button>
                </div>
            </div>
            <!-- <button style='opacity: 0;'>0</button> -->
            <!-- <h1 style='opacity: 0;'>1</h1> -->
        </div>

        <div v-if = 'Window === -1' style="overflow: auto;" class="wrapper">
            <div class='d-flex justify-content-center flex-column' style = 'width: 100%'>
                <h3>Processing...</h3>
            </div>
        </div>
        <div v-if = 'Window === -2' style="overflow: auto;" class="wrapper">
            <div class='d-flex justify-content-center flex-column' style = 'width: 100%'>
                <h3>Unhadled exception.</h3>
            </div>
        </div>
        <!-- <ArticleComponent title = 'DUCK' date = '1549312452' author = 'John Stewart' desc = ' i suppose.'/> -->
        <!-- <ArticleComponent /> -->
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
// import ArticleComponent from "@/components/ArticleComponent.vue";
import axios from 'axios';

export default {
    name: "News",
    components: {
        // ArticleComponent
    },
    data () {
        return {
            ULogin: '[LOGIN]',
            UName: 'depozzyx',
            UDate: '[DATE]',
            URate: '8',
            UId: '[ID]',

            TempPassword: '',
            TempLogin: '',
            TempRName: '',
            TempRPassword: '',
            TempRLogin: '',

            Window: 0,

            AddField: false,
            ArticleName: undefined,
            ArticleDesc: undefined,
            ArticleAuthor: undefined,
            ArticleDate: undefined,
            ArticleBug: 3,
            ArticleArray: [],
        }
    },
    beforeCreate() {
        axios.post('http://localhost:3001/GetArticle', 'lol', {})
        .then(res => { // then print response status
            this.ArticleArray = res.data
        })
    },
    methods: {
        GetArticlesArray(){
            axios.post('http://localhost:3001/GetArticle', 'lol', {})
            .then(res => { // then print response status
                this.ArticleArray = res.data
            })
        },
        CheckRegister(){
            this.Window = -1
            let url = `http://localhost:3001/NewUser?name=${this.TempRName}&login=${this.TempRLogin}&password=${this.TempRPassword}`
            axios.post(url, 'lol', {})
            .then(res => { // then print response status
                this.ArticleArray = res.data
                if (res.data === 'lol'){
                    this.Window = 0
                }else{
                    this.Window = -2
                }
            })
        },
   }
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

    #body{
        margin-left: 30.5%;
        width: 40%;
    }
    .wrapper-data{
        width: calc(100% - 50px);
        padding: 30px;
        padding-right: calc(30px - 5px);
        margin-bottom: 20px;

        text-align: left !important;
        color: #fff;
        background-color: #42b983;
        border-radius: 0px;
        transition: 0.5s;
    }
    .wrapper-data h3{
        text-align: left;
        font-size: 150%;
    }
    .wrapper-data h1{
        line-height: 50%;
        font-size: 250%;
        margin-bottom: 0px;
    }
    .wrapper-data h1 b{
        color:  #42b983;
        background-color: #fff;
        font-size: calc(100% - 15px);
        padding-top: 3px;
        padding-bottom: 0px;
        padding-left: 5px;
        padding-right: 5px;

    }
    .wrapper{
        width: calc(50% - 30px);
        margin-left: 25%;
        padding: 10px;
        padding-right: calc(30px - 5px);
        margin-bottom: 20px;


        text-align: left;
        color: #42b983;
        background-color: #fff;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        /* border: 3px solid #42b983; */
        border-radius: 5px;
        transition: 0.5s;
    }
    .wrapper h1, h3{
        line-height: 100%;
        margin: 0px;
        padding: 0px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;

        text-align: center;
    }
    .wrapper button{
        transform: translateY(-2px);
        color: #42b984;
        background: #f5f5f5;
        /* margin-left: 5px;
        margin-right: 5px; */

        border-radius: 5px;
        width: 50% !important;
        border-bottom: 2px #42b983 solid;
    }
    .wrapper button:hover{
        /* background: #aaa; */
        background: #42b983;
        color: #fff;
        transform: translateY(-2px);
        /* text-decoration: underline; */
    }
    .wrapper input{
        border-radius: 5px;
        border: 0px #000 solid;
        border-bottom: 2px #42b983 solid;
        padding: 10px;
        background: #f5f5f5;
        margin-bottom: 10px;
        margin-left: 0px;
        margin: 5px;
        transition: 0.5s;

        color: #42b983;
    }
    .wrapper input:focus{
        background: #42b983;
        color: #f5f5f5;
        outline: none;
    }
    .wrapper input::placeholder{
        color: #42b983;
    }
    .wrapper input:focus::placeholder{
        color: #f5f5f5;
    }
</style>
