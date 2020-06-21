<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/error-test">Error</router-link> |
      <router-link to="/account">Account</router-link>
      <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">Пользователь</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat');

	/* .g-but{ */
	button{
		padding: 7px;
		padding-left: 15px;
		padding-right: 15px;
		margin: 5px !important;
		
		background: #fff;
		font-size: 120% !important;
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		color: #f77062;
		border: none;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
		border-radius: 100px !important;
		transition: 0.5s;
	}	
	button:hover{
		background: #f77062;
		box-shadow: 2px 2px 10px #f77062;
		color: #fff;
	}
	button:focus{
		outline: none !important;
	}

	input{
		padding: 7px;
		padding-left: 15px;
		padding-right: 15px;
		margin: 5px !important;
		
		background: #fff;
		font-size: 120% !important;
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		color: #f77062;
		border: 0px #f77062 solid;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
		border-radius: 100px !important;
		transition: 0.5s;
	}
	input:focus{
		outline: none !important;
		box-shadow: 2px 2px 10px #f77062, inset 0px 0px 0px 3px #f77062;
		/* box-shadow: inset 0px 0px 0px 2px #f77062; */
		/* border: 3px #f77062 solid; */
	}

	h3{
		margin: 10px !important;
		text-transform: uppercase;
		font-family: 'Montserrat', sans-serif;
		font-weight: 500;
	}

	.kitten-window{
		position: absolute;
		width: 20% !important;
		height: 30% !important;
		top: 10%;
		left: 40%;

		font-size: 120% !important;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
		font-weight: 900 !important;
		background: #fff;
		border-radius: 20px;
		color: #f77062;
		box-shadow: 2px 2px 10px #f77062, inset 0px 0px 0px 3px #f77062;
		align-items: center;
		text-align: center;
	}
	.kitten-wrapper{
		position: absolute;
		margin: 0px;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		padding: 0px;
		background: #fff;
	}
	.kitten-button{
		width: 50%;
	}

	.wrapper-thin{
		width: 30%;
		margin-left: 35%;
	}
	

</style>
