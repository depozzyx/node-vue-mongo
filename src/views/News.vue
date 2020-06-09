<template>
  <div class="about">
    <h1>Recent blogs: </h1>


    <div id = 'news-body'>
        <div style="overflow: auto;" class="news-wrapper">
            <div style = 'width: 100%'>
                <h1 style = 'float: left;'>Want to add one?</h1>
                <button style='float: right;'>dismiss.</button>
                <button v-show = '!AddField' @click='AddField = !AddField' style='float: right;'>yes!</button>
                <button v-show = 'AddField' @click='AddField = !AddField' style='float: right;'>well, no.</button>
            </div>
            <div v-if = 'AddField && TimCook' class = 'd-flex flex-column justify-content-start' style = 'width: 100%; margin-top: 50px;'>
                <input style = 'width: 40%' type="text" v-model="ArticleName" name="" placeholder="Blog title" value="">
                <input style = 'resize:both' type="text" v-model="ArticleDesc" name="" placeholder="Error Title" value="">
                <button @click='ProcessArticle()' type="button" name="button">Add</button>
            </div>
            <div v-if = 'AddField && !TimCook' class = 'd-flex flex-column justify-content-start' style = 'width: 100%; margin-top: 50px;'>
                <h4>You are not logged in. Would you like to?</h4>
                <router-link to="/account"><button type="button" name="button">Go to login!</button></router-link>
            </div>
            <!-- <button style='opacity: 0;'>0</button> -->
            <!-- <h1 style='opacity: 0;'>1</h1> -->
        </div>
        <transition-group name="list" tag="div">
            <router-link :to="{ name: 'Article', params: { id: article[5]}}"
                         v-for='(article, index) in ArticleArray.slice().reverse()'
                         :key = 'Date.now() * index'>
                <ArticleComponent :title = 'article[0]'
                                  :desc = 'article[1]'
                                  :author = 'article[2]'
                                  :date = 'article[3]'
                                  :rate = 'article[4]'
                                  class="list-item"/>
            </router-link>
        </transition-group>
        <!-- <ArticleComponent title = 'DUCK' date = '1549312452' author = 'John Stewart' desc = ' i suppose.'/> -->
        <!-- <ArticleComponent /> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleComponent from "@/components/ArticleComponent.vue";
import axios from 'axios';

export default {
    name: "News",
    components: {
        ArticleComponent
    },
    data () {
        return {
            AddField: false,
            TimCook: false,

            ArticleName: undefined,
            ArticleDesc: undefined,
            ArticleAuthor: undefined,
            ArticleAuthorLogin: undefined,
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
    created(){
        this.ArticleAuthor = this.getCookie('name')
        this.ArticleAuthorLogin = this.getCookie('login')
        if (this.ArticleAuthorLogin){
            this.TimCook = true
        }
    },
    methods: {
        GetArticlesArray(){
            axios.post('http://localhost:3001/GetArticle', 'lol', {})
            .then(res => { // then print response status
                this.ArticleArray = res.data
            })
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        ProcessArticle(){
            this.ArticleBug = 6
            !this.ArticleName ? this.ArticleName = '' : this.ArticleBug -= 1
            !this.ArticleDesc ? this.ArticleDesc = '' : this.ArticleBug -= 1
            !this.ArticleAuthor ? this.ArticlAuthor = '' : this.ArticleBug -= 1

            !this.ArticleName.replace(' ','') ? this.ArticleName = '' : this.ArticleBug -= 1
            !this.ArticleDesc.replace(' ','') ? this.ArticleDesc = '' : this.ArticleBug -= 1
            !this.ArticleAuthor.replace(' ','') ? this.ArticlAuthor = '' : this.ArticleBug -= 1

            this.ArticleDate =  Date.now()

            if (!this.ArticleBug){
                let url = `http://localhost:3001/PostArticle?name=${this.ArticleName}&desc=${this.ArticleDesc}&author=${this.ArticleAuthor}&login=${this.ArticleAuthorLogin}`

        		axios.post(url, 'data', {})
        		.then(res => { // then print response status
        			if (res.data == 'ok'){
                        this.GetArticlesArray()
                    }else{
                        this.TimCook = false
                        console.log('lox')
                        document.cookie = "login=;expires=0";
                    }

        		})
                this.ArticleName = ''
                this.ArticleDesc = ''
                this.ArticleAuthor = ''


            }else{
                console.log('lox')
            }

        },
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

<style scope>
    .news-wrapper{
        width: calc(100%);
        padding: 10px;
        padding-right: calc(30px - 5px);
        margin-bottom: 20px;

        text-align: left;
        color: #fff;
        background-color: #42b983;
        border-left: 5px solid #42b983;
        border-radius: 0px;
        transition: 0.5s;
    }
    .news-wrapper:hover{
        /* border-left: 30px solid #42b983; */
        /* cursor: pointer; */
        /*     padding-right: 0px; */
    }
    .news-wrapper h1{
        line-height: 100%;
        margin: 0px;
        padding: 0px;
    }
    .news-wrapper button{
        transform: translateY(-2px);
        color: #42b984;
        background: #fff;
        margin-left: 5px;
    }
    .news-wrapper button:hover{
        /* background: #aaa; */
        transform: translateY(-2px);
        text-decoration: underline;
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(-10px);
    }
    #news-body{
        margin-left: 30%;
        width: 40%;

    }
    /* input{
        border-radius: 5px;
        border: 2px #42b983 solid;
        padding: 10px;
        background: #f5f5f5;
        margin: 5px;
        transition: 0.5s;
    } */
    input{
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
    margin: 0px;
}
button:hover{
    background-color: #f5f5f5;
    color: #42b983;
    transform: translateY(3px);
    cursor: pointer;
}
</style>
