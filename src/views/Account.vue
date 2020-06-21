<template>
  <div class="about">
    <h1 v-show = 'Window === 2'>Account </h1>


    <div id = 'body'>
        <div v-if = 'Window === 2' style="overflow: auto;" class="wrapper-data">
            <div style = 'width: 100%'>
                <h1>{{UName}} <b>{{URate}} <i class="fas fa-long-arrow-alt-up"></i></b></h1>
                <h3>#{{ULogin}}</h3>
                <br />
                <h3>Creation date: {{processDate(UDate)}}</h3>
				<h3>Accound ID: {{UId}}</h3>
                <button @click="ExitAccount()">Exit</button>
                <!-- <button style='float: right;'>dismiss.</button>
                <button v-show = '!AddField' @click='AddField = !AddField' style='float: right;'>yes!</button>
                <button v-show = 'AddField' @click='AddField = !AddField' style='float: right;'>well, no.</button> -->
            </div>
        </div>
        <div v-if = 'Window === 1' class="wrapper-thin">
            <div class='d-flex justify-content-center flex-column'>
                <h3>Registration</h3>
                <input style='width: 100%;' class="p-2" type="username" v-model="TempRName" name="" placeholder="Name" value="">
                <input style='width: 100%;' class="p-2" type="login" v-model="TempRLogin" name="" placeholder="Login" value="">
                <input style='width: 100%;' class="p-2" type="password" v-model="TempRPassword" name="" placeholder="Password" value="">
                <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center'>
                    <button style = 'width: 30%;' class="p-2" @click='CheckRegister()' type="button" name="button">Register <i class="fas fa-clipboard-check"></i></button>
                    <button style = 'width: 30%;' @click='Window = 0' type="button" name="button">Back <i class="fas fa-redo"></i></button>
                </div>
            </div>
            <!-- <button style='opacity: 0;'>0</button> -->
            <!-- <h1 style='opacity: 0;'>1</h1> -->
        </div>

        <div v-if = 'Window === 0' class="wrapper-thin">
            <div class='d-flex justify-content-center flex-column'>
                <h3>Account login</h3>
                <input style='width: 100%;' class="p-2" type="login" v-model="TempLogin" name="" placeholder="Login" value="">
                <input style='width: 100%;' class="p-2" type="password" v-model="TempPassword" name="" placeholder="Password" value="">
                <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center'>
                    <button style = 'width: 30%;' @click='CheckLogin()' type="button" name="button">Login <i class="fas fa-clipboard-check"></i></button>
                    <button style = 'width: 30%;' @click='Window = 1' type="button" name="button">Register <b class="fas fa-door-open"></b></button>
                </div>
            </div>
            <!-- <button style='opacity: 0;'>0</button> -->
            <!-- <h1 style='opacity: 0;'>1</h1> -->
        </div>

        <div v-if = 'Window === -1' style="overflow: auto;" class="wrapper">
            <div class="kitten-wrapper">
                <div class='kitten-window d-flex justify-content-center flex-column' style = 'width: 100%'>
                    <h3>Processing...</h3>
                    <button class='kitten-button' @click = "ExitAccount()">Stop</button>

                </div>
            </div>
            
        </div>
        <div v-if = 'Window === -2' style="overflow: auto;" class="wrapper">
            <div class="kitten-wrapper">
                <div class='kitten-window d-flex justify-content-center flex-column'>
                    <h3>Unhadled exception.</h3>
                    <button class='kitten-button' @click = "ExitAccount()">Back</button>
                        
                </div>
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
    created() {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        if (getCookie('login')){
            this.ULogin = getCookie('login')
            this.UName = getCookie('name')
            this.UDate = getCookie('date')
            this.URate = getCookie('rate')
            this.UId = getCookie('id')
            this.Window = 2
            // alert('logged!')
        }else{
            this.Window = 0
        }
    },
    methods: {
        CheckRegister(){
            this.Window = -1
            let url = `http://localhost:3001/NewUser?name=${this.TempRName}&login=${this.TempRLogin}&password=${this.TempRPassword}`
            axios.post(url, 'lol', {})
            .then(res => { // then print response status
                // this.ArticleArray = res.data
                console.log(res.data)
                if (res.data === 'ok'){
                    this.Window = 0
                }else{
                    this.Window = -2
                }
            })
        },
        CheckLogin(){
            this.Window = -1
            let url = `http://localhost:3001/CompareUser?login=${this.TempLogin}&password=${this.TempPassword}`
            axios.post(url, 'lol', {})
            .then(res => { // then print response status
                // this.ArticleArray = res.data
                console.log(res.data)
                if (res.data === 'not ok'){
                    this.Window = -2
                }else{
                    this.Window = 2
                    this.ULogin = this.TempLogin
                    this.UName = res.data[0]
                    this.UDate = res.data[1]
                    this.URate = res.data[2]
                    this.UId = res.data[3]

                    let date = new Date(Date.now() + 86400e3);
    				date = date.toUTCString();

                    document.cookie = "login="+this.TempLogin+"; expires="+date;
    		  		document.cookie = "name="+res.data[0]+"; expires="+date;
                    document.cookie = "date="+res.data[1]+"; expires="+date;
                    document.cookie = "rate="+res.data[2]+"; expires="+date;
                    document.cookie = "id="+res.data[3]+"; expires="+date;
                }
            })
        },
        ExitAccount(){
            document.cookie = "login=";
            document.cookie = "name=";
            document.cookie = "date=";
            document.cookie = "rate=;";
            document.cookie = "id=;";
            this.TempPassword = '',
            this.TempLogin = '',
            this.TempRName = '',
            this.TempRPassword = '',
            this.TempRLogin = '',
            this.Window = 0
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        processDate(date){
            date = new Date(parseInt(date));
            var d = '0'+date.getDate();
            var m = '0'+(date.getMonth()+1);
            var y = date.getYear()%100;
            console.log(y)
            return d.substr(-2) + '/' + m.substr(-2) + '/' + y
        }
   }
};
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
</style>
