<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :url_ri="url_ri"></headers>
		<view class="digbox">
			<view class="perbox">
				<view class="box_left">
					<text>头像</text>
				</view>
				<view class="box_right" @click="changimg">
					<image :src="userimg" mode=""></image>
					<image src="../../static/icon/icon_right.png" mode=""></image>
				</view>
			</view>
			<!-- - -->
			<view class="perbox1">
				<view class="box_left">
					<text>手机号码</text>
				</view>
				<view class="box_right">
					<view class="">
						<text>{{phonenum}}</text>
					</view>
					<image src="../../static/icon/icon_right.png" mode=""></image>
				</view>
			</view>
			<!-- - -->
			<view class="perbox1">
				<view class="box_left">
					<text>昵称</text>
				</view>
				<view class="box_right">
					<view class="nickname">
						<input type="text"  v-model="username" :placeholder="username" placeholder-class="nameplc" />
						<!-- <input>{{username}}</input> :disabled="namestate"@confirm="changname" @blur="blur"-->
					</view>
					<image src="../../static/icon/icon_right.png" mode="" @click="changname"></image>
				</view>
			</view>
			<!-- - -->
			<view class="perbox1">
				<view class="box_left">
					<text>会员等级</text>
				</view>
				<view class="box_right">
					<view class="">
						<text>{{levelname}}</text>
					</view>
				</view>
			</view>
			<!-- - -->
			<view class="perbox1">
				<view class="box_left">
					<text>支付宝昵称</text>
				</view>
				<view class="box_right">
					<view class="nickname">
						<input type="text"   v-model="zhifubname" :placeholder="zhifubname"
						 placeholder-class="nameplc" disabled/><!--   @click="swiths(1)" -->
						<!-- <input>{{username}}</input> :disabled="namestate"@blur="nameblur"@confirm="changzhifuname"-->
					</view>
					<!-- <block v-if="aa == false">
						<image src="../../static/icon/icon_right.png" mode=""></image>
					</block>
					<block v-else>
						<text style="font-size: 30rpx; color: #999999;" @click="changphone()">确认</text>
					</block> -->
				</view>
			</view>
			<view class="perbox1">
				<view class="box_left">
					<text>支付宝收款账号</text>
				</view>
				<view class="box_right">
					<view class="nickname">
						<input type="text"  v-model="zhifubphone" :placeholder="zhifubphone"
						 placeholder-class="nameplc" disabled/><!--  @click="swiths(2)" -->
						<!-- <input>{{username}}</input> :disabled="namestate"@confirm="changphone"@blur="phonblur" -->
					</view>
					<!-- <block v-if="bb == false">
						<image src="../../static/icon/icon_right.png" mode="" ></image>
					</block>
					<block v-else>
						<text style="font-size: 30rpx; color: #999999;" @click="changphone()">确认</text>
					</block> -->
				</view>
			</view>
			<view class="perbox1">
				<view class="box_left">
					<text>钱包地址</text>
				</view>
				<view class="box_right">
					<view class="nickname">
						<input type="text"  v-model="wallet" :placeholder="wallet"
						 placeholder-class="nameplc" disabled/>
					</view>
				</view>
			</view>
			<!-- <view class="perbox1">aa
				<view class="box_left">
					<text>支付宝收款账号</text>
				</view>
				<view class="box_right">
					<view class="">
						<text>{{phonenum}}</text>
					</view>
				</view>
			</view> -->
			<!-- - -->
			<view class="bigbox1">
				<view class="perbox1">
					<view class="box_left">
						<text>积分提现收款信息</text>
					</view>
				</view>
				<view class="big1_inp">
					<input  v-model="bankuser" type="text" placeholder="输入开户名" placeholder-class="placcla" />
				</view>
				<view class="big1_inp">
					<input  v-model="bankname" :disabled="disAbled1" type="text" placeholder="输入开户银行名称"
					 placeholder-class="placcla" />
				</view>
				<view class="big2_inp">
					<view>
						<input  v-model="banknum" :disabled="disAbled2" type="number" placeholder="输入银行账号"
						 placeholder-class="placcla" />
					</view>
					<view>
						<text>注：仅支持中国银行、农业银行、建设银行、工商银行</text>
					</view>
				</view>
				<view class="big1_inpss" @click="accomp">
					<text>提交银行卡信息</text>
				</view>
			</view>
			<!-- - -->
			<view class="perbox1">
				<view class="box_left">
					<text>注册时间</text>
				</view>
				<view class="box_right">
					<view class="">
						<text>{{add_time}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue";
	export default {
		components: {
			headers
		},
		data() {
			return {
				wallet:'',
				Hlicon: "../../static/icon/left_whitch.png",
				Htitle: "个人资料",
				// Hricon:"../../static/icon/setting_white.png",
				url_ri: '/pages/main/my',
				phonenum: '',
				username: '',
				levelname: '',
				add_time: '',
				// namestate: true,
				userimg: uni.getStorageSync('member').avatar,
				zhifubname: '', //支付宝昵称
				zhifubphone: '', //支付宝账号
				bankuser: '', //
				bankname: '', //
				banknum: '', //
				disAbled1: false,
				disAbled2: false,
				aa:false,
				bb:false

			}
		},
		methods: {
			// 	bankusers() {

			// 	},
			// 	banknames() {
			// 		if (this.bankuser == '') {
			// 			uni.showToast({
			// 				title: "请输入开户名",
			// 				icon: "none"
			// 			});
			// 		} else {
			// 			this.disAbled1 = false
			// 		}

			// 	},

			// 	banknums() {
			// 		if () {
			// 			
			// 		} else {
			// 			this.disAbled2 = false

			// 		}
			// 	},
			accomp() {
				if (this.bankname == '') {
					uni.showToast({
						title: "输入开户银行名称",
						icon: "none"
					});
					return
				};
				if (this.bankuser == '') {
					uni.showToast({
						title: "请输入开户名",
						icon: "none"
					});
					return
				};
				if (this.banknum == '') {
					uni.showToast({
						title: "请输入银行卡号",
						icon: "none"
					});
					return
				};
				this.blurs("是否确认提交!", service.api.set.submitPaytype, "POST", {
					status: 2,
					account: this.banknum,
					titleofaccount: this.bankuser,
					name: this.bankname
				})
			},
			// conAccomp(){
			// 	this.blurs("是否确认提交!", service.api.set.submitPaytype, "POST", {
			// 		status: 2,
			// 		account: this.banknum,
			// 		titleofaccount: this.bankuser,
			// 		name: this.bankname
			// 	})
			// },

			 blur() {
				this.blurs("是否确认修改昵称!", service.api.set.modifyingNickname, "POST", {
					nickname: this.username
				})
			},
			/*nameblur() {
				this.blurs("是否确认修改昵称!", service.api.set.submitPaytype, "POST", {
					status: 1,
					account: this.zhifubphone,
					titleofaccount: this.zhifubname,
					name: ''
				})
			}, */
			phonblur() {
				this.blurs("是否确认修改账号!", service.api.set.submitPaytype, "POST", {
					status: 1,
					account: this.zhifubphone,
					titleofaccount: this.zhifubname,
					name: ''
				})
			},
			/* changzhifuname() {
				this.blurs("是否确认修改昵称!", service.api.set.submitPaytype, "POST", {
					status: 1,
					account: this.zhifubphone,
					titleofaccount: this.zhifubname,
					name: ''
				})
			}, */
			swiths(i){
				if(i == 1){
					this.aa = true
				}else{
					this.bb = true
				}
			},
			changphone() {
				/* if(i == 1){
					this.aa = true
				}else{
					this.bb = true
				} */
				/* var grad = this.zhifubphone.indexOf(' ');
				var grad1 = this.zhifubname.indexOf(' ');
				if(grad != -1 || grad1 != -1){
					uni.showToast({
						title:"有非法字符!",
						icon:'none'
					});
					return
				} */
				this.blurs("是否确认修改账号!", service.api.set.submitPaytype, "POST", {
					status: 1,
					account: this.zhifubphone,
					titleofaccount: this.zhifubname,
					name: ''
				})
			},
			blurs(content, url, method, data) {
				var self = this;
				uni.showModal({
					title: '提示',
					content: content,
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: url,
								method: method,
								data: data,
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									self.aa = false
									self.bb = false
									var res = res.data
									if (res.code == 1) {
										uni.showToast({
											title: res.info,
											icon: "none"
										});
										self.userinfo();
									} else {
										uni.showToast({
											title: res.info,
											icon: "none"
										});
										self.username = uni.getStorageSync('member').nickname;
									}
								}

							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							self.username = uni.getStorageSync('member').nickname; //改变已输入的昵称
							console.log('用户点击取消');
						}
					}

				});
				console.log("blur");
			},
			changname() {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '是否确认修改昵称!',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: service.api.set.modifyingNickname,
								method: "POST",
								data: {
									nickname: self.username
								},
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									var res = res.data
									if (res.code == 1) {
										uni.showToast({
											title: res.info,
											icon: "none"
										});
										self.userinfo();
									} else {
										uni.showToast({
											title: res.info,
											icon: "none"
										});
										self.username = uni.getStorageSync('member').nickname;
									}
								}

							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							self.username = uni.getStorageSync('member').nickname; //改变已输入的昵称
							console.log('用户点击取消');
						}
					}

				});
				console.log("comfirm");
			},
			changimg() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						console.log(chooseImageRes)
						const tempFilePaths = chooseImageRes.tempFilePaths;
						self.userimg = tempFilePaths[0]
						uni.uploadFile({
							url: service.api.main.avatar, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								uni.showToast({
									title: JSON.parse(res.data).info,
									icon: 'none'
								});
							}
						});
					}
				});


			},
			upimg() {
				var self = this;

				return Promise.resolve(self.userimg)
			},
			userinfo() { //获取会员信息
				var self = this;
				service.auth(this, service.api.home.info, 'GET', '', function(self, res) {
					console.log(res, "userinfo")
					var member = res.data.member;
					uni.setStorageSync("member", res.data.member);
					self.phonenum = member.account;
					self.username = member.nickname;
					self.userimg = member.avatar;
					self.levelname = member.levelname;
					self.add_time = member.add_time;
				});
			},

			paytype() { //获取支付收款信息
				var self = this;
				service.auth(this, service.api.set.paytype, 'GET', {//支付宝
					// status: 1
					type:1
				}, function(self, res) {
					// console.log(res.data, "userinfo")
					self.zhifubname = res.data.titleofaccount;
					self.zhifubphone = res.data.account;
					
				});
				service.auth(this, service.api.set.paytype, 'GET', {//银行卡
					// status: 1
					type:2
				}, function(self, res) {
					console.log(res.data, "userinfo")
					if(res.data){
						self.bankuser = res.data.titleofaccount;
						self.bankname = res.data.name;
						self.banknum = res.data.account
					}
				});
				service.auth(this, service.api.set.paytype, 'GET', {//钱包地址
					// status: 1
					type:3
				}, function(self, res) {
					console.log(res.data, "userinfo")
					if(res.data){
						self.wallet = res.data.account
					}
				});
			}
		},
		onLoad(){
			
		},
		onShow() {
			this.userinfo();
			this.paytype();
			/* service.auth(this, service.api.set.paytype, 'GET', {
				status: 2
			}, function(self, res) {
				console.log(res, "userinfosss")
				self.bankuser = res.data.titleofaccount;
				self.bankname = res.data.name;
				self.banknum = res.data.bank_account
			}); */


		}
	}
</script>

<style lang="less">
	.digbox {
		background-color: #FFFFFF;

		.perbox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30upx;
			border-bottom: 2upx solid #F2F2F2;

			.box_left {
				color: #333333;
				font-size: 30upx;
			}

			.box_right {
				display: flex;
				align-items: center;
				justify-content: center;
				view {
					color: #666666;
					font-size: 30upx;
				}
			}

			.box_right image:first-child {
				width: 160upx;
				height: 160upx;
			}

			.box_right image:last-child {
				width: 60upx;
				height: 80upx;
			}
		}

		.perbox1 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30upx;
			border-top: 2upx solid #F2F2F2;
			border-bottom: 2upx solid #F2F2F2;

			.box_left {
				color: #333333;
				font-size: 30upx;
			}

			.box_right {
				display: flex;
				align-items: center;
				justify-content: center;

				view {
					color: #666666;
					font-size: 30upx;
				}
			}

			.box_right image {
				width: 60upx;
				height: 80upx;
			}
		}

		.bigbox1 {
			.perbox1 {
				padding: 30upx;

				.box_left {
					color: #333333;
					font-size: 30upx;
					font-weight: bold;
				}
			}

			.big1_inp {
				padding: 30upx;
				color: #333333;
				font-size: 30upx;
				border-bottom: 2upx solid #F2F2F2;
				border-top: 2upx solid #F2F2F2;

				.placcla {
					color: #999999;
					font-size: 30upx;
				}
			}

			.big1_inpss {
				padding: 20upx;
				color: #FFFFFF;
				font-size: 30upx;
				border-bottom: 2upx solid #F2F2F2;
				border-top: 2upx solid #F2F2F2;
				text-align: center;
				background-color: #0089E2;
				margin: 20upx auto 30upx;
				width: 60%;
				border-radius: 40upx;
			}

			.big2_inp {

				// border-bottom: 2upx solid #F2F2F2;
				.placcla {
					color: #999999;
					font-size: 30upx;
				}

				view:first-child {
					padding: 30upx;
				}

				view:last-child {
					padding: 10upx 30upx;
					color: #999999;
					font-size: 26upx;
				}
			}
		}
	}

	.nickname {
		text-align: end;
		margin-right: 20rpx;
	}

	.nameplc {
		color: #666666;
		font-size: 30upx;
	}
</style>
