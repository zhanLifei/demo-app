<template>
	<view ></view>
</template>

<script>
	export default{
		onLoad() {
			if(uni.getStorageSync('token') == '' || !uni.getStorageSync('token')){
				uni.reLaunch({
					url:"/pages/login/login"
				});
			}else{
				uni.reLaunch({
					url:"/pages/main/index"
				});
			}
		}
	}
</script>

<style>
</style>