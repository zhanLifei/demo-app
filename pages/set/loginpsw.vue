<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/set/security')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>修改登录密码
				</text>
			</view>
		</view>
		<view class="blue_bg"></view>
		<view class="box">
			<view class="inp">
				<input type="password" v-model="original" placeholder="请输入原始密码" />
			</view>
			<view class="inp">
				<input type="password" v-model="pwd" placeholder="请输入登录密码" />
			</view>
			<view class="inp">
				<input type="password" v-model="repwd" placeholder="请重新输入登录密码" />
			</view>
		</view>
		<view class="btns" @click="btns">
			确认
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	export default {
		data() {
			return {
				original: '',
				pwd: '',
				repwd: ''

			}
		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			btns() {
				/* service.auth(this , service.api.set.changePwd , 'POST' , {
					original: this.original,
					pwd: this.pwd,
					repwd: this.repwd
				} , function(self , res){
					console.log(res)
					uni.showToast({
						icon:'none',
						title:res.info
					});
					setTimeout(()=>{
					uni.switchTab({
						url:"/pages/main/my"
					})
					},1500);
				}); */


				uni.request({
					url: service.api.set.changePwd,
					method: "POST",
					data: {
						original: this.original,
						pwd: this.pwd,
						repwd: this.repwd
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/main/my"
								})
							}, 1500);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}
					},
					fail: (res) => {
						var res = res.data;
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				});
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

	.blue_bg {
		width: 100%;
		height: 120rpx;
		background-color: #2189FF;
	}

	.box {
		width: 94%;
		background-color: #fff;
		border-radius: 20rpx;
		margin: -90rpx auto 0;
		padding: 20rpx 30rpx 50rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;

		.inp {
			width: 100%;
			padding: 24rpx 0;
			border-bottom: 2rpx solid #F3F3F3;
			margin-bottom: 10rpx;

			input {
				font-size: 28rpx;
				color: #333;
			}
		}
	}

	.btns {
		text-align: center;
		margin: 0 auto;
		width: 70%;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: #2189FF;
		padding: 20upx 0;
		border-radius: 60upx;
	}
</style>
