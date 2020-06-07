<template>
    <div class="hello">
        <div class = 'error-body'>
            <div v-for = "(err, index) in array" :key = 'index * Date.now()' class = 'error-wrap' @click = 'ErrorDismiss(index)' :style = '{backgroundColor: err[2]}'>
                <p class = 'title'>{{err[0]}}</p>
                <p>{{err[1]}}</p>
            </div>
        </div>

        <div style = 'display: none' v-if='title != "[TITLE]"' >
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorHandler",
    data () {
        return {
            // items: ['a', 'b', 'c']
        }
    },
    props: {
        title: {
			type: String,
			required: true,
			default: '[TITLE]'
		},
		desc: {
			type: String,
			required: true,
			default: '[DESCRIPTION]'
		},
        type: {
			type: String,
			required: true,
			default: '[TYPE]'
		},
        array: {
            type: Array,
            required: true,
            default: function () { return [] }
        }
    },
    methods: {
        ErrorDismiss(index) {
            this.$emit('error-remove',index)
        }
    }
    // beforeUpdate () {
    //
    // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error-body{
        position: absolute;
        top: 5%;
        width: 20%;
        left: 75%;
        display: grid;
    }
    .error-wrap{

        background-color: #D4444A;
        border-radius: 10px;

        margin-bottom: 10px;
        color: #fff;
        padding: 5px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .error-wrap p{
        line-height: 50%;
        text-align: left;
        font-size: 100%;
    }
    .error-wrap .title{
        font-size: 150%;
        line-height: 50%;
        margin-bottom: 0px;
        margin-top: 20px;
        font-weight: bold;
    }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
