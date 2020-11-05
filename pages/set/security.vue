<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="back('/pages/main/my')"> <image src="../../static/icon/left_whitch.png" mode="">
				</image>
			</view>
			<view class="center_title">
				<text>安全设置
				</text>
			</view>
		</view>
		<view class="sets">
			<view class="set" @click="jump('/pages/set/loginpsw')">
				<view>修改密码</view>
				<image src="../../static/icon/icon_right.png" mode=""></image>
			</view>
			<view class="set" @click="jump('/pages/set/dealpsw')">
				<view>修改置换密码</view>
				<image src="../../static/icon/icon_right.png" mode=""></image>
			</view>
		</view>
		<view class="btns" @click="outlogin">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back(url) {
				uni.switchTab({
					url: url
				})
			},
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			outlogin(){
				uni.removeStorageSync('token');
				uni.removeStorageSync('member');
				/*---清除洗车服务的缓存数据---*/
				uni.removeStorageSync('wasCarServ');
				/*---清除洗车服务的缓存数据---*/
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/login/login"
					})
				},1000);
			}
			
			
		}

	}
</script>

<style lang="less">
	.header {
		background-color: #2389ff;
	}

	.left_ {
		width: 36upx;
		height: 36upx;
	}

	.center_title {
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}

	page {
		background-color: #EFF3F6;
	}

	.sets {
		width: 100%;
		margin-top: 30rpx;

		.set {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			margin-bottom: 3rpx;
			background-color: #fff;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.btns {
		text-align: center;
		margin: 150rpx auto 0;
		width: 70%;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: #2189FF;
		padding: 20upx 0;
		border-radius: 60upx;
	}
</style>
