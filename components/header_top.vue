<template>
	<view class="header">
		<view class="header_icon" @click="back(url_left)">
			<image :src="icon" mode="widthFix"></image>
		</view>
		<view class="header_title">
			{{title}}
		</view>
		<view class="header_jump" @click="jump(url_right)">
			{{subtitle}}
			<block v-if="more">
				<image :src="more" mode="widthFix"></image>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			subtitle: {
				type: String
			},
			title: {
				type: String
			},
			icon:{
				type:String
			},
			more:{
				type:String
			},
			url_right:{
				type:String
			},
			url_left:{
				type:String
			}
		},
		data() {
			return {
				// title: '',
				// subtitle: ''
			}
		},
		methods:{
			back(url_left){
				if(url_left){
					if(url_left == ''){
						uni.navigateBack({
							delta:1
						})
					}else if(url_left=='/pages/index/me'||url_left=='/pages/index/index'||url_left=='/pages/index/life'||url_left=='/pages/index/share'){
						// 判断是不是跳转到tabbar页面
							uni.switchTab({
								url:url_left
							})
						}else{
							//跳转到有url_left的页面
						uni.navigateTo({
							url:url_left
						})
					}
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			jump(url){
				if(url=='/pages/index/me'||url=='/pages/index/index'||url=='/pages/index/life'||url=='/pages/index/share'){
					uni.switchTab({
						url:url
					})
				}else{
					uni.navigateTo({
						url:url
					})
				}
				
			}
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: calc(100rpx + var(--status-bar-height));
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	.header view {
		width: 200rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header .header_icon {
		justify-content: flex-start;
		/* padding: 0 30rpx; */
	}

	.header .header_icon image {
		width: 50rpx;
		height: 50rpx;
	}
	.header .header_title {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
	}
	.header .header_jump{
		justify-content: flex-end;
		padding: 0 30rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.header .header_jump image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
