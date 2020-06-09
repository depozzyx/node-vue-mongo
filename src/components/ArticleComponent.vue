<template>
    <div class="news-wrapper">
        <div class="news-header">
            <h1>{{title}}</h1>
            <h2>{{author}}, {{processDate(date)}}</h2>
        </div>
        <div class="news-desc">
            <p>{{processDesc(desc)}}</p>
        </div>
        <div class="news-footer">
            <b>{{rate}} / 5</b>
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
        // data: {
        //     title: '[TITLE]',
        //     desc: '[DESC]',
        //     author: '[AUTHOR]',
        //     rate: '[RATE]',
        //     date: '[DATE]',
        // },
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
        author: {
			type: String,
			required: true,
			default: '[AUTHOR]'
		},
        rate: {
			type: Number,
			required: true,
			default: 3,
		},
        date: {
			type: Number,
			required: true,
			default: 0,
		},

        // array: {
        //     type: Array,
        //     required: true,
        //     default: function () { return [] }
        // }
    },
    methods: {
        ErrorDismiss(index) {
            this.$emit('error-remove',index)
        },
        processDate(date){
            date = new Date(date);
            var d = '0'+date.getDate();
            var m = '0'+(date.getMonth()+1);
            var y = date.getYear()%100;
            console.log(y)
            return d.substr(-2) + '/' + m.substr(-2) + '/' + y
        },
        processDesc(desc){
            desc = desc + ''
            if (desc.length > 200){
                return desc.substring(0,200)+'...'
            }else{
                return desc
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .news-wrapper{
            width: calc(100%);
            padding: 30px;
            padding-right: calc(30px - 5px);
            margin-bottom: 20px;

            text-align: left;
            color: #333;
            background-color: #f5f5f5;
            border-left: 5px solid #42b983;
            border-radius: 0px;
            transition: 0.5s;
        }
        .news-wrapper:hover{
            border-left: 30px solid #42b983;
            cursor: pointer;
            padding-right: 0px;

        }
        .news-wrapper .news-header h1{
            margin: 0px;

            color: #42b983;
        }
        .news-wrapper .news-header h2{
            margin: 0px;
            color: rgba(203, 203, 203, 1);
            font-size: 100%;
            margin-top: 2px;
        }
        .news-wrapper .news-footer b{
            background: #42b983;
            padding: 5px;
            padding-top: 2px;
            padding-bottom: 2px;
            color: #fff;
        }

a {
  color: #42b983;
}
</style>
