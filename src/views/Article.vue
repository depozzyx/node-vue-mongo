<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div v-if = '!ArticleError'>
        <h1 v-for='(article, index) in ArticleArray' :key = 'Date.now() * index'>{{article}}</h1>
    </div>
    <h1 v-if = 'ArticleError'>{{ArticleError}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios';
export default {
    name: "Article",
    data () {
        return {
            ArticleArray: [],
            ArticleError: undefined,
            id: -1,
        }
    },
    created() {
        if (this.$route.params.id){
            // document.cookie = "lastArticle ="+this.$route.params.id+";"
            this.id = this.$route.params.id
            axios.post(`http://localhost:3001/GetArticleById?id=${this.$route.params.id}`, 'lol', {})
            .then(res => { // then print response status
                if (res.data === 'not ok'){
                    this.ArticleError = 'Not found 404.'
                }else{
                    this.ArticleArray = res.data
                }
            })
        }else{
            this.ArticleError = 'What exatctly article do you want to visit?'
            this.id = -1
        }
    },
    methods:{
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }
};
</script>
