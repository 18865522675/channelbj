<template>
	<div class="sidebar">
		<template v-for="(item,index) in items">
			<router-link :to="item.path" v-if="item.path">
				<el-menu-item v-if="!item.children&&item.meta.show" :index="item.path">
						<!--<i :class="item.icon"></i>-->
						<i class="el-icon-date"></i>
						<span>{{item.meta.title}}</span>
				</el-menu-item>
			</router-link>
			<!-- 判断是否有二级路由 -->
			<el-submenu v-if="item.children" :index="String(index*3+3)">
				<template slot="title">
					<!--<i :class="item.icon"></i>-->
					<i class="el-icon-date"></i>
					<span>{{item.meta.title}}</span>
				</template>
				<!--递归组件，把遍历的值传回子组件，完成递归调用-->
				<Menu :items="item.children"/>
			</el-submenu>
		</template>
	</div>
</template>

<script>
	// import bus from '../common/bus';
	// @ is an alias to /src
	export default {
		name: "Menu",
		props: {
			items:Array
		},
		data() {
			return {
				// collapse: false,
			}
		},
// 		created() {
// 			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
// 			bus.$on('collapse', msg => {
// 				this.collapse = msg;
// 			})
// 		}
	};
</script>
<style  lang="less">
	.el-submenu{
		.el-submenu__title{
			font-size:13px;
			padding: 0 10px!important;
		}
		.el-menu-item{
			font-size: 13px;
			padding: 0 25px!important;
		}
		i{
			font-size:12px
		}
	}
	.el-submenu__icon-arrow{
		right: 8px!important;
	}
	.menu_page {
		position: fixed;
		top: 71px;
		left: 0;
		min-height: 100%;
		background-color: #324057;
		z-index: 99;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.el-menu {
		border: none;
	}

	.fa-margin {
		margin-right: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 180px;
		min-height: 400px;
	}

	.el-menu-vertical-demo {
		width: 64px;
	}

	.el-submenu .el-menu-item {
		min-width: 180px;
	}

	.hiddenDropdown,
	.hiddenDropname {
		display: none;
	}
i.el-submenu__icon-arrow.el-icon-arrow-right {
	display: none !important;
}
	a {
		color:#ccc;
		text-decoration: none;
	}
</style>
