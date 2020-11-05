<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/tradingCenter')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>我的置换</text>
			</view>
		</view>
		<view class="tab">
			<view :class="['tabs',current ==index?'active':'']" v-for="(item,index) in tabs" :key='index' @click="tabChange(index)">
				{{item.name}}
			</view>
		</view>
		<view class="list" v-for="(it , i) in scrlist" :key='i'>
			<!-- <view class="list_item" >
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">单价:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				 <view class="right orange_bg" v-if="current==0" @click='cancall(it.id)'>
					取消置换
				</view>qq 
				<view class="right orange_bg" v-if="current==1" @click="deail(it.id)">
					<text v-if="it.status == 1">待支付</text>
					<text v-else-if="it.status == 2 && usermid == it.mid"  >待审核</text>
					<text v-else >待收款</text>
				</view>
				 <view class="right orange_bg" v-if="current==3 || current==2 && it.status == -1" @click="deail(it.id)">
					已取消
				</view>qq
				<view class="right orange_bg" v-if="current==3 || current==2" @click="deail(it.id)">
					
					<text v-if="it.status == -1">已取消</text>
					<text v-else>已完成</text>
				</view>
			</view> -->
			<view class="list_item" v-if="current==0" @click='cancall(it.id)'>
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">总金额:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right orange_bg">
					  取消置换
				</view>
			</view>
			 <view class="list_item" v-if="current==1" @click="deail(it.id)">
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">总金额:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right  orange_bg"  v-if="it.status == 1" >
					待支付
				</view>
				<view class="right  bule_bg" v-else-if="it.status == 2 && usermid == it.mid" >
					待审核
				</view>
				<view class="right  bule_bg" v-else-if="it.status == -2 && usermid != it.mid" >
					审诉中
				</view>
				<view class="right  bule_bg" v-else >
					待收款
				</view>
			</view>
			<!-- <view class="list_item" v-else-if="current==1 && it.status == 2 && usermid == it.mid" @click="deail(it.id)">
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">单价:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right  bule_bg" >
					待审核
				</view>
			</view> -->
			<!-- <view class="list_item" v-else-if="current==1 && it.status == 2 && usermid != it.mid" @click="deail(it.id)">
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">单价:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right  bule_bg" >
					待收款
				</view>
			</view> -->
			<view class="list_item" v-else-if="current==3 || current==2 " @click="deail(it.id)">
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">总金额:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right  gray_bg" v-if="it.status == -1" >
					已取消
				</view>
				<view class="right  bule_bg" v-else  >
					已完成
				</view>
			</view>
			<!-- <view class="list_item" v-else- @click="deail(it.id)">
				<view class="left">
					<view class="order_id">订单号：{{it.ordersn}}</view>
					<view class="pric">单价:{{it.order_price}} <text class="count">数量:{{it.purchase_quantity}}</text></view>
				</view>
				<view class="right  bule_bg" >
					已完成
				</view>
			</view> -->
			<!-- <view class="list_item">
				<view class="left">
					<view class="order_id">订单号：552252225546789</view>
					<view class="pric">单价:146 <text class="count">数量:1</text></view>
				</view>
				<view class="right gray_bg" >
					已完成	
				</view>
			</view> -->
			<!-- <view class="none">
				暂无数据
			</view> -->
		</view>
			<view class="loadclass" v-if="loadshow">
				<text>正在加载</text>
			</view>
			<view class="loadclass" v-else>
				<text>数据已加载完毕</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
					name: '置换'
				}, {
					name: '置换中'
				}, {
					name: '已完成'
				}, {
					name: '往日完成'
				}],
				page: 0,
				pages: 1,
				type: 0,
				loadshow: true,
				scrlist: [],
				usermid: uni.getStorageSync('member').mid
			}
		},
		methods: {
			cancall(e) {
				var self = this;
				uni.showModal({
					title: "提示",
					content: "确定取消吗?",
					success:(res)=>{
						if (res.confirm) {
							self.$service.auth(self, self.$service.api.center.cancelPurchasingOrder, 'GET', {
								id: e
							}, function(self, res) {
								console.log(res);
								uni.showToast({
									title:res.info,
									icon:'none'
								});
								self.page = 0;
								self.pages=1;
								self.loadshow=true;
								self.scrlist = [];
								self.Loadthepage();
							});

							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})



			},
			jump(e) {
				uni.switchTab({
					url: e
				})
			},
			deail(e) {
				uni.navigateTo({
					url: '/pages/record/order?id=' + e
				})
			},
			Loadthepage() {
				var self = this;
				if (!self.loadshow) {
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self, self.$service.api.center.getTransactionInfo, "GET", {
						page: page,
						limit: 15,
						type: self.type,

					}, function(self, res) {
						console.log(res, "123213")
						self.pages = res.data.last_page;
						self.page = page;
						// self.activity = res.data.activity
						var list = res.data.data;
						list.forEach((v, i) => {
							self.scrlist.push(v);
						});
						if (self.pages == self.page || self.scrlist.length == 0) {
							console.log("false");
							self.loadshow = false
							uni.showToast({
								title: '数据已加载完毕',
								icon: 'none'
							});
						} else {
							console.log("2" , self.page , self.pages );
							self.loadshow = true
						}
					});
				} else {
					self.loadshow = false
					uni.showToast({
						title: '数据已加载完毕',
						icon: 'none'
					});
				}
			},
			
			tabChange(index) {
				this.current = index;
				this.type = index;
				this.scrlist = [];
				this.page = 0,
					this.pages = 1,
					this.loadshow = true,
					this.Loadthepage();
			}
			/* showModel() {
				uni.showModal({
					title: '取消置换',
					content: '是否确认取消该置换',
					cancelColor: '#999',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			} */
		},
		onReachBottom() {
			console.log('121')
			this.Loadthepage();
		},
		onLoad(op) {
			if(op.type == undefined){
				this.type = 0;
				this.current = 0
			}else{
				this.type = op.type;
			this.current = op.type;
			}
			
			/* this.page = 0;
			this.pages = 1;
			this.scrlist = [] */
			this.Loadthepage();
		},
		/* onShow() {
			// this.loadshow = true
			this.Loadthepage()
			this.$service.auth(this, this.$service.api.center.getTransactionInfo, "GET", {
				page: 1,
				limit: 15,
				type: 1
			}, function(self, res) {
				console.log(res)
			})
		} */
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: auto;
	}
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

	.tab {
		position: fixed;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		// align-items: center;
		background-color: #FFFFFF;
		box-shadow: 0 0 26rpx 0 #ccc;

		.tabs {
			font-size: 28rpx;
			color: #333333;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;

			&.active {
				color: #2189FF;
				border-bottom: 4rpx solid #2189FF;
			}
		}
	}

	.list:nth-of-type(3){
		padding-top: 100rpx;
	}
	.list {
		.none {
			margin-top: 300rpx;
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			color: #999999;
		}

		width: 100%;
		padding-top: 10rpx;

		.list_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 30rpx;
			margin-top: 20rpx;
			background-color: #FFFFFF;

			.left {
				width: 70%;
				.order_id {
					font-size: 30rpx;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}

				.pric {
					font-size: 26rpx;
					color: #999999;
					margin-top: 20rpx;

					.count {
						margin-left: 40rpx;
					}
				}
			}

			.right {
				
				font-size: 28upx;
				color: #FFFFFF;
				// padding: 16rpx 30rpx;
				padding: 15upx 25upx;
				text-align: center;
				border-radius: 10rpx;

				&.bule_bg {
					background-color: #2189FF;
				}

				&.orange_bg {
					background-color: #FA9C22;
				}

				&.gray_bg {
					background-color: #CCCCCC;
				}
			}
		}
	}

	.loadclass {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		margin-top: 101upx;
		box-sizing: border-box;
		
	}
</style>
