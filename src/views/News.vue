<template>
  <div class="about">

    <Bogdan msg="Community Blogs" left = 'calc(30% - 10px)'/>

	<div id="app">
		<div class = ' navy-wrap'>
			<div class = 'navy-sub'>
				<br>
			</div>
			<div class = 'd-flex justify-content-center navy-center'>
				<router-link to="/">
					<button @click='UpdLogin()'>
						Add
					</button>
				</router-link>
			</div>
		</div>
	</div>

    <div class = 'wrap-wisconsin-30'>
		
        <div>
            <div style = 'width: 100%'>
                <h1 style = 'float: left;'>Want to add one?</h1>
                <button style='float: right;'>dismiss.</button>
                <button v-show = '!AddField' @click='AddField = !AddField' class = 'button--sacnite' style='float: right;'>yes!</button>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleComponent from "@/components/ArticleComponent.vue";
import Bogdan from "@/components/Bogdan.vue";
import axios from 'axios';

export default {
    name: "News",
    components: {
        ArticleComponent,
        Bogdan
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
                console.log('lox2')
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

<style scoped>

</style>
