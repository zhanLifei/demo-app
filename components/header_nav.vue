<template>
	<view class="header" :style="hstyle">
		<view class="left_icon"   @click="jump(url_le)">
			<image :src="Hlicon" mode=""></image>
		</view>
		<view class="center_title">
			<text>{{Htitle}}</text>
		</view>

		<view class="right_subtitle" @click="jum(url_ri)">
			{{subtitle}}
			<block v-if="Hricon">
				<view class="right_icon">
					<image :src="Hricon" mode=""></image>
				</view>
			</block>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			Hlicon: {
				type: String
			},
			Htitle: {
				type: String
			},
			subtitle: {
				type: String
			},
			Hricon: {
				type: String
			},
			hstyle: {
				type: String
			},
			url_le:{
				String
			},
			url_ri:{
				String
			}
		},
		data() {
			return {

			}
		},
		methods:{
			
		
		jump(url){
			if(url){
				if(url == ''){
					uni.navigateBack({
						delta:1
					})
				}else if(url == "/pages/main/tradingCenter" || url == "/pages/main/my" || url == "/pages/main/index" || url == "/pages/main/financial" || url == "carService"){//判断是不是tabbar页面
					uni.switchTab({
						url:url
					})
				}else{
					//跳转到有返回跳转的页面
					uni.navigateTo({
						url:url
					})
				}
			}else{
				uni.navigateBack({
					delta:1
				})
			}
		},
		jum(url){
			if(url){
				if(url == ''){
					uni.navigateBack({
						delta:1
					})
				}else if(url == "/pages/main/tradingCenter" || url == "/pages/main/my" || url == "/pages/main/index" || url == "/pages/main/financial" || url == "carService"){//判断是不是tabbar页面
					uni.switchTab({
						url:url
					})
				}else{
					//跳转到有返回跳转的页面
					uni.navigateTo({
						url:url
					})
				}
			}else{
				uni.navigateBack({
					delta:1
				})
			}
		}
		}
		
	}
</script>

<style>
	.header {
		/* background-color: #2575FE; */
		background-color: #2189FF;
		height: calc(102rpx + var(--status-bar-height));
		position: fixed;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		width: 100%;
		/* background-color:transparent; */
		/* background: transparent; */
	}

	image {
		width: 36upx;
		height: 36upx;
	}

	.left_icon {
		margin-top: 12upx;
		width: 20%;
		text-align: center;
		box-sizing: border-box;
	}

	.right_subtitle {
		width: 20%;
		text-align: start;
		color: #FFFFFF;
		font-size: 28upx;
	}

	.right_icon {
		margin-top: 12upx;
		box-sizing: border-box;
		text-align: center;
	}

	.center_title {
		font-size: 36upx;
		color: #FFFFFF;
		text-align: center;
		width: 60%;
	}
	
</style>
