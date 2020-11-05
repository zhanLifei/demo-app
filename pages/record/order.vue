<template>
	<view class="content">
	<!-- 	<headers :Hlicon="Hlicon" :Htitle="Htitle"></headers> -->
	
	<view class="header">
		<view class="left_" @click="jum('/pages/center/my_deal')">
			<image src="../../static/icon/left_whitch.png" mode=""></image>
		</view>
		<view class="center_title">
			<text>订单详情</text>
		</view>
	</view>
		<view class="bg_top">

		</view>
		<view class="big_box">
			<!--  -->
			<view class="box">
				<view class="order_title">
					<view class="h1">
						订单信息
					</view>
					<view class="h2" v-if="ddtas.status == 3">
						已完成
					</view>
					<view class="h2" v-if="ddtas.status == -1">
						已取消
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						置换订单
					</view>
					<view class="li_right">
						{{ddtas.ordersn}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						置换数量
					</view>
					<view class="li_right">
						{{ddtas.purchase_quantity}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						美元单价
					</view>
					<view class="li_right">
						{{ddtas.purchase_price}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						总金额$
					</view>
					<view class="li_right">
						{{ddtas.order_price}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						总金额￥
					</view>
					<view class="li_right">
						{{ddtas.price_num}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						置换时间
					</view>
					<view class="li_right">
						{{ddtas.claimtime}}
					</view>
				</view>
			</view>
			<!--  -->
			<view class="box" v-if="ddtas.seller_mid == usermid">
				<view class="order_title">
					<view class="h1">
						买家信息
					</view>
					<view class="h2">
						<!-- 已完成 -->
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						头像
					</view>
					<view class="li_right">
						<image :src="ddtas.avatar" mode="widthFix"></image>
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						姓名
					</view>
					<view class="li_right">
						{{ddtas.nickname}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						联系方式
					</view>
					<view class="li_right">
						{{ddtas.account}}
					</view>
				</view>
				<!-- <view class="order_li">
					<view class="li_left">
						支付宝名称
					</view>
					<view class="li_right">
						{{ddtas.account}}
					</view>
				</view> -->
				<!-- <view class="order_li">
					<view class="li_left">
						支付宝
					</view>
					<view class="li_right">
						{{ddtas.account}}
					</view>
				</view> -->
			</view>
			<!--  -->
			<view class="box" v-if=" ddtas.mid == usermid">
				<!-- ddtas.status == 3 && -->
				<view class="order_title">
					<view class="h1">
						卖家信息
					</view>
					<view class="h2">
						<!-- 已完成 -->
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						头像
					</view>
					<view class="li_right">
						<image :src="ddtas.seller_avatar" mode="widthFix"></image>
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						姓名
					</view>
					<view class="li_right">
						{{ddtas.seller_nickname}}
					</view>
				</view>
				<view class="order_li">
					<view class="li_left">
						联系方式
					</view>
					<view class="li_right">
						{{ddtas.seller_account}}
					</view>
				</view>
			</view>
			
			<view class="box" v-if=" ddtas.mid == usermid"> <!-- v-if=" ddtas.mid == usermid" -->
				<block v-if="ddtas.ali_pay.length > 0">
					<view class="order_li">
						<view class="li_left">
							支付宝名称
						</view>
						<view class="li_right">
							{{ddtas.ali_pay[0].titleofaccount}}
						</view>
					</view>
					<view class="order_li">
						<view class="li_left">
							支付宝
						</view>
						<view class="li_right">
							{{ddtas.ali_pay[0].account}}
						</view>
						<view class="copy" @click="copy(ddtas.ali_pay[0].account)">
							复制
						</view>
					</view>
				</block>
				

				
				
				<block v-if="ddtas.usdt_pay.length > 0">
				
					<view class="order_li">
						<view class="li_left">
							USDT-ERC20地址
						</view>
						<text class="li_right_fk">
							{{ddtas.usdt_pay[0].account}}
						</text>
						<view class="copy" @click="copy(ddtas.usdt_pay[0].account)">
							复制
						</view>
					</view>
					
				</block>
			</view>
			
			<!--  -->
			<view class="box" v-if="ddtas.status == 1 && ddtas.mid == usermid">
				<view class="order_title_pic">
					<view class="h1">
						支付截图
					</view>
					<view class="h3">
						（上传微信支付或者支付宝付款凭证截图）
					</view>
				</view>
				<view class="pic_image">
					<block v-if="SrcImage == ''">
						<view class="image_li" @click="chooseIm()">
							<image src="../../static/icon/add.png" mode="widthFix"></image>
						</view>
					</block>
					<block v-else>
						<view class="image_li digimg">
							<image :src="SrcImage" mode="widthFix"></image>
							<view class="close" @click="close(SrcImage )">
								<image src="../../static/icon/closeimg.png" mode=""></image>
							</view>
						</view>
					</block>
				</view>
			</view>

			<!-- <block v-if=" ddtas.seller_mid == usermid"> -->  <!-- v-if="ddtas.status == 2 && ddtas.status == 3" -->
				<view class="box" v-if="ddtas.status == 2 || ddtas.status == 3">
					<view class="order_title_pic">
						<view class="h1">
							支付截图
						</view>
					</view>
					<view class="pic_image" >
						<block>
							<view class="image_li digimg" @click.stop="LookImgs()">
								<image :src="ddtas.payment_voucher" mode="widthFix"></image>
							</view>
						</block>
					</view>
				</view>
			<!-- </block> -->
		</view>

		<view class="floor_box" v-if="ddtas.status == 2 && ddtas.mid != usermid">
			<view class="floor_time">
				<text style="font-size: 26upx; color: #333333;">剩余审核时间:</text>
				<text style="font-size: 26upx; color: #333333;">00:{{minText}}:{{secText}}</text>
			</view>
			<view class="complaint" @click="complaint">
				投诉
			</view>
			<view class="commit" @click="commits">
				确认收款
			</view>
		</view>
		<view class="floor_box" v-if="ddtas.status == 1 && ddtas.mid == usermid">
			<view class="floor_time">
				<text style="font-size: 26upx; color: #333333;">剩余付款时间:</text>
				<text style="font-size: 26upx; color: #333333;">00:{{minText}}:{{secText}}</text>
			</view>
			<!-- <view class="complaint" >
				投诉
			</view> -->
			<view class="commit" @click="commit">
				确认付款
			</view>
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "订单详情",
				Hlicon: "../../static/icon/left_whitch.png",
				SrcImage: '',
				id: '',
				ddtas: '',
				usermid: uni.getStorageSync('member').mid,
				timestamp: '', //时间戳
				sec: '',
				min: '',
				secText: '',
				minText: '',
				hours: '',
				seller_zhifubao:{}
			}
		},
		methods: {
			jum(e){
				uni.navigateTo({
					url:e
				})
			},
			/*------倒计时器-----*/
			CountDown() {
				var self = this;
				// var second = self.timestamp%60;
				var sec = setInterval(() => {
					if (self.sec > 0) {
						self.sec--;
						self.minText = self.min;
						if (self.sec < 10) {
							self.secText = "0" + self.sec;
						} else {
							self.secText = self.sec;
						}
					} else {
						if (self.min > 0) {
							self.min--;
							self.sec = 60;
							if (self.min < 10) {
								self.minText = "0" + self.min;
							} else {
								self.minText = self.min;
							}
						} else {
							self.minText = "00";
							self.secText = "00"
							clearInterval(sec);
						}
					}


				}, 1000)

				console.log(self.sec, self.min, "CountDown");
			},
			/*------倒计时器-----*/

			complaint() {
				var self = this;
				uni.showModal({
					title: "投诉",
					content: "如遇上传虚假凭证者，可申请投诉",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							self.$service.auth(self, self.$service.api.record.orderComplaint, 'POST', {
								id: parseInt(self.id),
								reason: '对方上传假凭证'
							}, function(self, res) {
								console.log(res);
								uni.showToast({
									title:res.info,
									icon:'none'
								});
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/center/my_deal?type='+ 1
									});
								},1500);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			commits() {
				uni.showModal({
					title: "确认收款",
					content: "是否确认收款，如收到点击确认完成置换",
					success: (res) => {
						if (res.confirm) {
							this.$service.auth(this, this.$service.api.record.auditPassOrder, 'POST', {
								id: this.id
							}, function(self, res) {
								console.log(res);
								uni.showToast({
									title: res.info,
									icon: 'none'
								});
								setTimeout(() => {
									uni.navigateTo({
										url:'/pages/center/my_deal?type='+ 1
									});
								}, 1500)

							})
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

				/* this.$service.auth(this, this.$service.api.record.auditPassOrder, 'POST', {
					id: this.id
				}, function(self, res) {
					console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/main/tradingCenter'
						})
					},1500)

				}) */
			},
			commit() {
				uni.showModal({
					title: "确认付款",
					content: "是否确认付款，点击确认完成置换",
					success: (res) => {
						if (res.confirm) {
							uni.uploadFile({
								url: this.$service.api.record.getTransactionPay, //
								filePath: this.SrcImage,
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
								name: 'file',
								formData: {
									id: parseInt(this.id),
								},
								success: (res) => {
									const ress = JSON.parse(res.data);
									uni.showToast({
										title: ress.info,
										icon: 'none'
									})
									setTimeout(() => {
										uni.navigateTo({
											url:'/pages/center/my_deal?type='+ 1
										});
									}, 1500);
									console.log(ress.data);
								}
							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			chooseIm() {
				var self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera '],
					success(res) {
						// console.log(res)
						self.SrcImage = res.tempFilePaths[0]
						// console.log(self.SrcImage)
					}
				})
			},
			close(e) { //删除身份证 s用来判断要清空那张图片
				console.log(e)
				var self = this;
				self.$service.auth(self, self.$service.api.user.deleteImg, "POST", {
					path: e
				}, function(_self, res) {
					_self.SrcImage = '';
					console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				});
			},
			/*----------*/
			// chooseIm(){//上传支付凭证证
			// var self = this;
			// 	uni.chooseImage({
			// 	    success: (chooseImageRes) => {
			// 			console.log(chooseImageRes);
			// 	        const tempFilePaths = chooseImageRes.tempFilePaths;
			// 	        uni.uploadFile({
			// 	            url: self.$service.api.user.updateIdImage, //仅为示例，非真实的接口地址
			// 				header: {
			// 					Authorization: 'Bearer ' + uni.getStorageSync('token')
			// 				},
			// 	            filePath: tempFilePaths[0],
			// 	            name: 'file',
			// 	            success: (res) => {
			// 	                console.log(JSON.parse(res.data),"asfasdf");
			// 					const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
			// 					self.SrcImage = path.data.url;
			// 					console.log(self.SrcImage,"asdfasdfa");
			// 					uni.showToast({
			// 						title:path.info,
			// 						icon:'none'
			// 					});
			// 	            }
			// 	        });
			// 	    }
			// 	});
			// },
			/*----------*/
			LookImgs() {
				// console.log(this.)
				var path = [this.ddtas.payment_voucher]
				uni.previewImage({
					urls: path,
					 indicator: 'number',
					loop: true, 
					success(res) {
						// console.log(res)
					}
				})
			},
			
			copy(text){//复制支付宝账号
				uni.setClipboardData({
				    data:text,
				    success: function () {
						uni.showToast({
							title:"复制成功",
							icon:"none"
						});
				        console.log('success');
				    }
				});
			},
			usdt(e){//复制usdt账号
				uni.setClipboardData({
				    data:this.ddtas.seller_paymentmethod[0].account,
				    success: function () {
						uni.showToast({
							title:"复制成功",
							icon:"none"
						});
				        console.log('success');
				    }
				});
			}
			
		},
		
		onLoad(op) {
			this.id = op.id;
		},

		onShow() {
			console.log(this.id)
			this.$service.auth(this, this.$service.api.record.getTransactionDetail, 'GET', {
				id: this.id
			}, function(self, res) {
				self.ddtas = res.data;
				//self.ddtas.status = 1;
				//self.ddtas.mid = self.usermid;
				self.ddtas.price_num = res.data.order_price;
				
				self.ddtas.purchase_price = Number(res.data.purchase_price / uni.getStorageSync("tr")).toFixed(2);
				self.ddtas.order_price = Number(res.data.purchase_price * res.data.purchase_quantity).toFixed(2);
				// self.ddtas.order_price = ddras.(purchase_price * purchase_quantity);
				
				self.timestamp = res.data.count_down;
				self.sec = self.timestamp % 60;
				let min = self.timestamp / 60;
				// let hours = self.timestamp/3600;
				self.min = parseInt(min);
				// self.hours = parseInt(hours);
				console.log(res, self.ddtas, self.timestamp, self.hours, self.sec);
				
				let seller_paymentmethod = res.data.seller_paymentmethod;
				seller_paymentmethod.forEach((v)=>{
					if(v.typename === "支付宝支付"){
						self.seller_zhifubao.account = v.account;
						self.seller_zhifubao.titleofaccount = v.titleofaccount;
					}
				})
				
				
			});
			this.CountDown();
			
			
		}
	}
</script>

<style>
	.content {
		width: 100%;
		background: #F2F2F2;
	}

	.bg_top {
		width: 100%;
		height: 100rpx;
		background: #2189FF;
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

	.big_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		padding-bottom: 50rpx;
		margin-top: -70rpx;
		/* transform: translateY(-80rpx); */
		overflow: hidden;
		margin-bottom: 100upx;
	}

	.box {
		width: 100%;
		/* height: 100rpx; */
		box-sizing: border-box;
		padding: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
	}

	.order_title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36rpx;
		font-weight: bold;
	}

	.h1 {}

	.h2 {
		color: #FA9C22;
	}

	.order_li {
		width: 100%;
		margin-top: 40rpx;
		color: #666666;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.li_left {}
	
	.li_right_fk{
		width: 260upx;
		display:block;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
   .li_right {
	

	}

	.li_right image {
		width: 60rpx;
		height: 60rpx;
	}

	.order_title_pic {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 36rpx;
		font-weight: bold;
	}

	.h3 {
		color: #666666;
		font-size: 24rpx;
		font-weight: 100;
	}

	.pic_image {
		width: 100%;
		padding: 36rpx 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.image_li {
		width: 160rpx;
		height: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.close {
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}

	.image_li image {
		width: 100%;
		height: 100%;
	}

	.floor_box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 30upx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.floor_time {
		width: 50%;
	}

	.complaint {
		color: #333333;
		font-size: 30upx;
		background-color: #d9d9d9;
		width: 15%;
		padding: 20upx;
		border-radius: 50upx;
		text-align: center;
	}

	.commit {
		color: #FFFFFF;
		font-size: 30upx;
		background-color: #fa9c22;
		width: 25%;
		padding: 20upx;
		border-radius: 50upx;
		text-align: center;
		margin-left: 10upx;
	}

	.digimg {
		width: 320rpx;
		height: 320rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}
	.copy{
		background-color: #fa9c22;
		padding: 10upx 20upx;
		border-radius: 20upx;
		color: #FFFFFF;
		/* width: 100upx; */
	}
</style>
