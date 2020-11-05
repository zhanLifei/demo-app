<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>发布买单</text>
			</view>
		</view>
		<view class="bg_blue"></view>
		<view class="d_box">
			<view class="deal">
				<view class="month">
					<view class="month_">
						本月价格
					</view>
					<view class="price">
						3 
					</view>
				</view>
				<view class="inp">
					<input type="number" placeholder="请输入数量" v-model="num" />
				</view>
				<view class="all">
					总金额：3.46
				</view>
				<view class="psw">
					<input type="password" placeholder="请输入置换密码" v-model="psw" />
				</view>
				<view class="code">
					<input type="text" placeholder="请输入验证码" v-model="code" />
					<image src="" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="btn" @click="submit">
				确认
			</view>
			<view class="btn">
				取消
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '',
				psw: '',
				code: '',
				verification: [{
						name: 'num',
						title: '请输入数量'
					},
					{
						name: 'psw',
						title: '请输入置换密码'
					},
					{
						name: 'code',
						title: '请输入验证码'
					}
				],

			}
		},
		methods: {
			submit() {
				let canNext = this.verification.some(item => {
					if (this[item.name] == '') {
						uni.showToast({
							icon: 'none',
							title: item.title
						})
					}
					return this[item.name] == ''
				})
				if (!canNext) {
					//  这里发请求
					
				}
			}
		},
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

	.bg_blue {
		width: 100%;
		height: 140rpx;
		background-color: #2189FF;
	}

	.d_box {
		width: 100%;
		margin-top: -70rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;

		.deal {
			width: 100%;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;

			.month {
				display: flex;
				justify-content: space-between;
				color: #333333;
				font-size: 32rpx;
			}

			.psw,
			.inp {
				width: 100%;
				padding-top: 40rpx;
				padding-bottom: 24rpx;
				border-bottom: 2rpx solid #F3F3F3;
			}

			.all {
				font-size: 24rpx;
				color: #333333;
				margin-top: 20rpx;
			}

			.code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 24rpx;

				image {
					width: 174rpx;
					height: 108rpx;
				}
			}
		}

	}

	.btn {
		width: 560rpx;
		height: 96rpx;
		font-size: 36rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #FFFFFF;
		margin: 0 auto;

	}

	.btns .btn:first-child {
		background-color: #2189FF;
	}

	.btns .btn:last-child {
		background-color: #BEBEBE;
		margin-top: 32rpx;
	}
</style>
