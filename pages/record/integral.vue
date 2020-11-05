<template>
	<view class="content">
		<!-- 积分明细 -->
		<view class="header">
			<view class="left_" @click="jump('/pages/main/index')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>积分明细</text>
			</view>
		</view>
		<view class="blue_bg"></view>
		<view class="series">
			<view class="series_inner">
				<view class="inner">
					<view class="nums">
						{{unfreeze}}
					</view>
					<view class="theme">
						可申请提现
					</view>
				</view>
				<view class="inner" @click="jum('/pages/index/applyun')">
					<view class="nums">
						{{freeze}}
					</view>
					<view class="theme">
						冻结
					</view>
				</view>
				<view class="inner">
					<view class="nums">
						{{paid}}
					</view>
					<view class="theme">
						已合计提现积分
					</view>
				</view>
			</view>
		</view>

		<view class="deal">
			<view class="deal_inner">
				<view class="real" @click="jum('/pages/record/int_detail?unfreeze='+unfreeze)">
					<image src="/static/img/poket.png" mode=""></image>
					提现
				</view>
				<view class="real" @click="jum('/pages/record/wd_record')">
					<image src="/static/img/clock.png" mode=""></image>
					提现记录
				</view>
			</view>
		</view>
		<view class="list_box">
			<view class="list">
				<view class="list_name">
					明细
				</view>
				<scroll-view style="height: 630rpx; " class="abc" show-scrollbar='false' scroll-y="true" @scrolltolower='add'>
					<view class="list_detail">
						<view class="list_item" v-for="(item,index) in listsss">
							<view class="list_bottom">
								<view class="list-left">
									<view class="list-title">
										{{item.remarks}}
									</view>
									<view class="list-day">
										{{item.createtime}}
									</view>
								</view>
								<view class="list-right">
									{{item.integral}}
								</view>
							</view>
						</view>
						<view class="loadclass" v-if="loadshow">
							<text>正在加载</text>
						</view>
						<view class="loadclass" v-else>
							<text>数据已加载完毕</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				unfreeze: '', //可申请提现 
				freeze: '', //冻结 
				paid: '', //已合计提现金额
				listsss: [],
				unfreeze: '', //可申请提现 ,
				freeze: '', //冻结,
				paid: '', //已合计提现金额
				loadshow: true,
				page: 0,
				pages: 1

			}
		},
		methods: {
			jump(url) {
				uni.switchTab({
					url: url
				})
			},
			jum(url) {
				uni.navigateTo({
					url: url
				})
			},
			add() {
				this.loadData();
			},
			loadData() {
				service.loadthepage({
					url: service.api.record.integralDetail,
					data: {
						limit: 15,
						page: this.page + 1,
					},
					method: 'GET',
					direct: true,
					that: this
				});

			}
		},
		onShow() {
			service.auth(this, service.api.record.index, 'GET', '', function(self, res) {
				console.log(res);
				self.unfreeze = res.data.unfreeze;
				self.freeze = res.data.freeze;
				self.paid = res.data.paid;
			});

			// service.auth(this, service.api.record.integralDetail, 'GET', '', function(self, res) {
			// 	console.log(res);

			// });
			this.loadData();
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
		height: 100rpx;
		background-color: #2389ff;
	}

	.series {
		width: 100%;
		padding: 30rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		margin-top: -90rpx;

		.series_inner {
			width: 100%;
			// height: 212rpx;
			padding: 56rpx 0;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.inner {
				flex: 1;
				text-align: center;

				.nums {
					font-size: 34rpx;
					color: #0767D4;
				}

				.theme {
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #666666;
				}
			}
		}
	}

	.deal {
		width: 693rpx;
		// padding: 0rpx 34rpx;
		margin: 0 auto 20rpx;

		.deal_inner {
			padding: 28rpx 0;
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			justify-content: space-around;

			view {
				width: 259rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 38rpx;
				color: #FFFFFF;
				border-radius: 20rpx;

				&:first-child {
					background: linear-gradient(to right, #FF9F5C, #FE6075);
				}

				&:last-child {
					background: linear-gradient(to right, #4FA2FF, #8C7BFF);
				}
			}
		}

		image {
			width: 54rpx;
			height: 50rpx;
			vertical-align: middle;
			margin-right: 26rpx;
		}
	}

	.list_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		// padding-bottom: 20rpx;
		margin-bottom: 30rpx;
	}

	.list {
		// width: 693rpx;
		width: 100%;
		// margin: 0 auto;
		background-color: #FFFFFF;
		padding: 34rpx 0 44rpx;
		box-sizing: border-box;
		border-radius: 20rpx;

		.list_name {
			box-sizing: border-box;
			padding-left: 30rpx;
			font-size: 34rpx;
			color: #080808;
			font-weight: bold;
		}

		.list_detail {
			margin-top: 10rpx;

			.list_item {
				width: 100%;
				box-sizing: border-box;
				padding: 0 30rpx;

				&:last-child .list_bottom {
					border-bottom: none;
				}

				.list_bottom {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 24rpx 20rpx;
					border-bottom: 2rpx solid #F4F4F4;

				}

				.list-left {
					.list-title {
						font-size: 26rpx;
						color: #333333;
					}

					.list-day {
						margin-top: 20rpx;
						font-size: 24rpx;
						color: #999999;
					}
				}

				.list-right {
					font-size: 30rpx;
					color: #FA9C22;
				}
			}

			// .list_item:last-of-type .list_bottom{
			// 	border-bottom: none;
			// }
		}
	}

	.loadclass {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
	}
</style>
