<template>
  <div class="home">
      <div class="container">
					<HomeTop></HomeTop>
      </div>
  </div>
</template>

<script>
	import HomeTop from './Home/HomeTop'
// @ is an alias to /src
export default {
  name: 'home',
	data(){
		return {
			
		}
	},
	components:{
		HomeTop,
	}
}
</script>
<style scoped>
.home {
    width: 100%;
}
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
		background-color:white;
    text-align: center;
    /* color: white; */
}
.title {
    font-size: 30px;
}
.lead {
    margin-top: 20px;
    font-size: 22px
}
</style>
