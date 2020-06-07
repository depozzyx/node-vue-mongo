<template>
  <div class="about">
    <h1>Recent news:</h1>
    <input type="text" v-model="ArticleAuthor" name="" placeholder="Error Title" value="">
    <input type="text" v-model="ArticleName" name="" placeholder="Error Title" value="">
    <input type="text" v-model="ArticleDesc" name="" placeholder="Error Title" value="">
    <button @click='ProcessArticle()' type="button" name="button">SUBMIT ARTICLE</button>

    <div id = 'news-body'>
        <ArticleComponent v-for='(article, index) in ArticleArray.slice().reverse()'
                          :key = 'article[3] + Date.now() * index'
                          :title = 'article[0]'
                          :desc = 'article[1]'
                          :author = 'article[2]'
                          :date = 'article[3]'
                          :rate = 'article[4]'/>
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
            ArticleName: undefined,
            ArticleDesc: undefined,
            ArticleAuthor: undefined,
            ArticleDate: undefined,
            ArticleBug: 3,
            ArticleArray: [],
        }
    },
    beforeCreate() {
        let data = 'lol'
        axios.post('http://localhost:3001/GetArticle', data, {})
        .then(res => { // then print response status
            this.ArticleArray = res.data
            // this.files = res.data
            // this.forceUpdate()

        })
    },
    methods: {
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
                let data = [this.ArticleName,this.ArticleDesc,this.ArticleAuthor]
                let url = `http://localhost:3001/PostArticle?name=${this.ArticleName}&desc=${this.ArticleDesc}&author=${this.ArticleAuthor}`

        		axios.post(url, data, {})
        		.then(res => { // then print response status
        			console.log('---',res)
        			// this.files = res.data
        			// this.forceUpdate()

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

<style>
    #news-body{
        margin-left: 30%;
        width: 40%;

    }
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
