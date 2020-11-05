<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="">
			{{desc}}
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	import service from "../../service.js";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "使用规则",
				Hlicon: "../../static/icon/left_whitch.png",
				desc:''
			}
		},
		methods:{},
		onLoad(e) {
			this.desc = e.desc
		}
	}
</script>

<style>
	
</style>
