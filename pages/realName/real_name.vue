<template>
	<view class="content">
		<!-- {{step !== null}} -->
		<!-- v-if = "step !== null" -->
		<headers :Htitle="title" :Hlicon="icon" :url_le="url_left"></headers>
		<view v-if="gg == ''"></view>
		<view v-else-if="gg != 1">
			<block v-if="cc == 0 || cc == 2 || cc == -1 || cc !== 1">
				<view class="realname" v-if="cc == 0 || cc == 2 || cc == -1"><image src="/static/background/name_bg.png" mode="widthFix"></image></view>
				<view class="cash" v-if="style == 'mobile'">
					<view class="cash_box">
						<!--  v-if="step == 'payment_cost' || step == 'realname_info' || step == 'bind_account'" -->
						<view class="cash_detail">
							<view class="detail_left">
								<image src="/static/icon/information.png" mode="widthFix"></image>
								<view class="detail_title">
									<view class="detail_title_word">支付费用</view>
									<view class="detail_title_description">实名认证需要支付1.5元</view>
								</view>
							</view>
							<block v-if="step == 'payment_cost'"><view class="detail_right" @click="paymentCost()">立即支付</view></block>
							<block v-else><view class="detail_rights">已支付</view></block>
						</view>
						<!--  v-if="step == 'bind_account'" -->
						<view class="cash_detail">
							<view class="detail_left">
								<image src="/static/icon/account.png" mode="widthFix"></image>
								<view class="detail_title">
									<view class="detail_title_word">绑定账号</view>
									<view class="detail_title_description">请绑定本人支付宝账号</view>
								</view>
							</view>
							<block v-if="step == 'bind_account' || step == 'payment_cost'">
								<view class="detail_right" @click="jump('/pages/realName/review', 'bind_account')">立即绑定</view>
							</block>
							<!-- <block v-else-if =" step === 'null'" >
							<view class="detail_rights">
								
							</view>
						</block> -->
							<block v-else><view class="detail_rights">已绑定</view></block>
						</view>
						<!-- v-if="step == 'realname_info' || step == 'bind_account'" -->
						<view class="cash_detail">
							<view class="detail_left">
								<image src="/static/icon/user.png" mode="widthFix"></image>
								<view class="detail_title">
									<view class="detail_title_word">证件信息</view>
									<view class="detail_title_description">请绑定本人身份证号和真实姓名</view>
								</view>
							</view>
							<block v-if="cc == 2 || step == 'under_review'"><view class="detail_rights">审核中</view></block>
							<block v-else-if="cc == -1"><view class="detail_right" @click="jump('/pages/realName/authentication', 'realname_info')">驳回</view></block>
							<block v-else>
								<block v-if="step == 'realname_info' || step == 'payment_cost' || step == 'bind_account'">
									<view class="detail_right" @click="jump('/pages/realName/authentication', 'realname_info')">立即绑定</view>
								</block>
								<!-- 	<block v-else-if =" step === 'null'" >
								<view class="detail_rights">
									
								</view>
							</block> -->
								<block v-else><view class="detail_rights">已绑定</view></block>
							</block>
						</view>
					</view>
				</view>

				<!-- 邮箱验证验证不通过   要填写的信息 -->
				<view class="wallet" v-else-if="style == 'email'">
					<view class="navbar">
						<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">
							{{ item.text }}
						</view>
					</view>
					<view class="box-big">
					<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
						<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
							<scroll-view class="list-scroll-content" scroll-y>
								
								<block v-if="tabIndex == 0">
								<view class="name">
									<view>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称 :</view>
									<input type="text" value="" v-model="name" placeholder="请输入名称"/>
								</view>
									<view class="name">
									<view>证件号码 :</view>
									<input type="text" value="" v-model="idcast" placeholder="请输入证件号码"/>
								</view>
								
								<view class="upload_box">
									<view class="upload1">
										<view class="up_title">
											<text>上传证件照片(护照或者身份证)</text>
										</view>
										<view class="idcard_img">
											<view class="idcard_frrev">
												<view class="idcard" v-if="frontimg == ''" @click="uploadfron(frontimg , 1)">
													<image src="../../static/icon/IDcardfront.png" mode="" v-model="imgbefore" style="margin-bottom: 10upx;"></image>
													<text>正面</text>
												</view>
												<block class="uplodimg" v-else>
													<view class="idcards">
														<image :src="frontimg" mode=""></image>
													</view>
													<view class="close" @click="close(frontimg , 1)">
														<image src="../../static/icon/closeimg.png" mode="" ></image>
													</view>
												</block>
											</view>
											<view class="idcard_frrev">
												<view class="idcard" v-if="reverimg == ''" @click="uploadrever(reverimg , 2)">
													<image src="../../static/icon/IDcardfront.png" mode="" v-model="imgreverse" style="margin-bottom: 10upx;"></image>
													<text>反面</text>
												</view>
												<block class="uplodimg" v-else>
													<view class="idcards">
														<image :src="reverimg" mode=""></image>
													</view>
													<view class="close" @click="close(reverimg , 2)">
														<image src="../../static/icon/closeimg.png" mode=""></image>
													</view>
												</block>
											</view>
								
										</view>
									</view>
								</view>
								
								
								<view class="write">
									<view class="line">
										<text>钱包地址:</text>
										<input type="text" placeholder-style="color:#ccc" v-model="add" placeholder="请输入USDT-ERC20钱包地址" />
									</view>
								</view>
								<button class="audit" @click="obtain">提交审核</button>
								</block>
								
							<block v-else-if="tabIndex == 1">
								<view class="name">
									<view>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称 :</view>
									<input type="text" value="" v-model="mingzi" placeholder="请输入名称"/>
								</view>
									<view class="name">
									<view>证件号码 :</view>
									<input type="text" value="" v-model="idnumber" placeholder="请输入证件号码"/>
								</view>
							<!-- 	<view class="name num-zfb">
									<view>支付宝账号 :</view>
									<input type="text" value="" placeholder="请输入支付宝账号"/>
								</view> -->
								<view class="upload_box">
									<view class="upload1">
										<view class="up_title">
											<text>上传证件照片(护照或者身份证)</text>
										</view>
										<view class="idcard_img">
											<view class="idcard_frrev">
												<view class="idcard" v-if="imgbefore == ''" @click="uploadfrons(imgbefore , 1)">
													<image src="../../static/icon/IDcardfront.png" mode="" style="margin-bottom: 10upx;"></image>
													<text>正面</text>
												</view>
												<block class="uplodimg" v-else>
													<view class="idcards">
														<image :src="imgbefore" mode=""></image>
													</view>
													<view class="close" @click="closes(imgbefore , 1)">
														<image src="../../static/icon/closeimg.png" mode="" ></image>
													</view>
												</block>
											</view>
											<view class="idcard_frrev">
												<view class="idcard" v-if="imgreverse == ''" @click="uploadrevers(imgreverse , 2)">
													<image src="../../static/icon/IDcardfront.png" mode="" style="margin-bottom: 10upx;"></image>
													<text>反面</text>
												</view>
												<block class="uplodimg" v-else>
													<view class="idcards">
														<image :src="imgreverse" mode=""></image>
													</view>
													<view class="close" @click="closes(imgreverse , 2)">
														<image src="../../static/icon/closeimg.png" mode=""></image>
													</view>
												</block>
											</view>
								
										</view>
									</view>
								</view>
								<view class="write">
									<view class="line">
										<text>支付宝账号:</text>
										<input type="text" placeholder-style="color:#ccc" v-model="zfb" placeholder="请输入支付宝账号" />
									</view>
								</view>
								<button class="audit" @click="zfbsbumit">提交审核</button>
							</block>
							
							
							</scroll-view>
						</swiper-item>
					</swiper>
					</view>
				</view>

				<view v-else></view>
			</block>
		</view>
		<!-- <view class="name_btn">
				<view class="btn" @click="nn">
					确认提交
				</view>
			</view> -->
		<!-- <view class="warn">
				<view class="">请务必填写本人身份信息。</view>
				<view>签字认证最后一步可能会有一笔打款，请核实身份证名字和支付宝名字是否为同一人。</view>
			</view> -->
		<!-- </block> -->
		<view v-else-if="gg == 1">
			<!-- <block v-if="cc == 5"> -->
				<view class="name_bg"><image src="/static/icon/name_success.png" mode="widthFix"></image></view>
			<!-- </block> -->
		</view>
		
		<!-- <block v-if="cc == 2 || step == 'under_review'">
			<view class="name_bg1">
				<image src="/static/me/review.png" mode="widthFix"></image>
				<view class="">
					实名信息正在审核
				</view>
			</view>
		</block> -->
	</view>
</template>

<script>
import service from '../../service.js';
// import uniIcons from "@/components/uni-icons.vue";
import headers from '@/components/header_nav.vue';
export default {
	components: {
		// uniIcons,
		headers
	},
	data() {
		return {
			// 支付宝绑定数据
			mingzi:'',
			idnumber:'',
			imgbefore:'',
			imgreverse:"",
			// usdt绑定字段
			name:"",
			idcast:'',
			frontimg: '',
			reverimg: '',
			tabIndex: 0,
			navList: [
				{
					text: 'USDT',
					state: '0'
				},
				{
					text: '支付宝账号',
					state: '1'
				}
			],
			gg: '',
			zfb:'',
			add: '',
			// style:2,
			step: null, // 后台返回的当前步骤
			cc: 1,
			title: '实名验证',
			icon: '/static/icon/left_whitch.png',
			url_left: '/pages/main/my',
			alipay_params: '',
			style: uni.getStorageSync('type')
		};
	},

	methods: {
		
		// ---------------------------------------------------------------
		// usdt 上传图片
		//正面
		uploadfron() { 
			var self = this;
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						filePath: tempFilePaths[0],
						name: 'file',
						success: (res) => {
							console.log(JSON.parse(res.data), "asfasdf");
							const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
							self.frontimg = path.data.url;
							console.log(self.frontimg, "asdfasdfa");
							uni.showToast({
								title: path.info,
								icon: 'none'
							});
						}
					});
				}
			});
		},
		//反面
		uploadrever() { 
			var self = this;
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						filePath: tempFilePaths[0],
						name: 'file',
						success: (res) => {
							console.log(JSON.parse(res.data), "asfasdf");
							const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
							self.reverimg = path.data.url;
							console.log(self.reverimg, "asdfasdfa");
							uni.showToast({
								title: path.info,
								icon: 'none'
							});
						}
					});
				}
			});
		},
		// --------------------------------------------------------------------------------------------
		// 支付宝 上传图片
		//正面
		uploadfrons() { 
			var self = this;
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						filePath: tempFilePaths[0],
						name: 'file',
						success: (res) => {
							console.log(JSON.parse(res.data), "asfasdf");
							const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
							self.imgbefore = path.data.url;
							console.log(self.imgbefore, "asdfasdfa");
							uni.showToast({
								title: path.info,
								icon: 'none'
							});
						}
					});
				}
			});
		},
		//反面
		uploadrevers() { 
			var self = this;
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						filePath: tempFilePaths[0],
						name: 'file',
						success: (res) => {
							console.log(JSON.parse(res.data), "asfasdf");
							const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
							self.imgreverse = path.data.url;
							console.log(self.imgreverse, "asdfasdfa");
							uni.showToast({
								title: path.info,
								icon: 'none'
							});
						}
					});
				}
			});
		},
		//swiper 切换
		changeTab(e){
			this.tabClick(e.target.current);
		},
		
		//顶部tab点击
		tabClick(index){
			this.change(index);
		},
		change(index){
			this.type = this.navList[index].type;
			this.tabIndex = index;
		},
		// usdtSubmit
		
		// usdt提交按钮
		obtain() {
			var self = this;
			if (self.name == '') {
				uni.showToast({
					icon: 'none',
					title: '名称不能为空'
				});
				return;
			}
			if (self.idcast == '') {
				uni.showToast({
					icon: 'none',
					title: '证件号码不能为空'
				});
				return;
			}
			if (self.frontimg == '') {
				uni.showToast({
					icon: 'none',
					title: '请上传证件正面照片'
				});
				return;
			}
			if (self.reverimg == '') {
				uni.showToast({
					icon: 'none',
					title: '请上传证件反面照片'
				});
				return;
			}
			if (self.add == '') {
				uni.showToast({
					icon: 'none',
					title: '钱包地址不能为空'
				});
				return;
			}	
			uni.request({
				url: service.api.realName.usdtSubmit,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				data: {
					realname:self.name,
					idnum:self.idcast,
					idnum_img:self.frontimg,
					idnum_img_back:self.reverimg,
					usdt: self.add,
					type:1
				},
				success(res) {
					console.log(res.data);
					if (res.data.code == 1) {
						setTimeout(function() {
							uni.showModal({
								title: '温馨提示',
								content: res.data.info,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// self.style = 0
										self.cc = 1;
										self.gg = 1;
										// uni.reLaunch({
										// 	url:'/pages/main/my'
										// })
									}
								}
							});
						}, 1000);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
					}
				}
			});
		},
		// usdt 删除图片
		close(e, s) {
			console.log(e)
			var self = this;
			service.auth(self, service.api.user.deleteImg, "POST", {
				path: e
			}, function(_self, res) {
				if (s === 1) {
					_self.frontimg = '';
				} else if (s === 2) {
					_self.reverimg = '';
				}
				console.log(res);
				uni.showToast({
					title: res.info,
					icon: 'none'
				})
			});
		},
		// 支付宝提交按钮
		zfbsbumit() {
			var self = this;
			if (self.mingzi == '') {
				uni.showToast({
					icon: 'none',
					title: '名称不能为空'
				});
				return;
			}
			if (self.idnumber == '') {
				uni.showToast({
					icon: 'none',
					title: '证件号码不能为空'
				});
				return;
			}
			if (self.imgbefore == '') {
				uni.showToast({
					icon: 'none',
					title: '请上传证件正面照片'
				});
				return;
			}
			if (self.imgreverse == '') {
				uni.showToast({
					icon: 'none',
					title: '请上传证件反面照片'
				});
				return;
			}
			if (self.zfb == '') {
				uni.showToast({
					icon: 'none',
					title: '支付宝账号不能为空'
				});
				return;
			}	
			uni.request({
				url: service.api.realName.usdtSubmit,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				data: {
					realname:self.mingzi,
					idnum:self.idnumber,
					idnum_img:self.imgbefore,
					idnum_img_back:self.imgreverse,
					alipay: self.zfb,
					type:2
				},
				success(res) {
					console.log(res.data);
					if (res.data.code == 1) {
						setTimeout(function() {
							uni.showModal({
								title: '温馨提示',
								content: res.data.info,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// self.style = 0
										self.cc = 1;
										self.gg = 1;
										// uni.reLaunch({
										// 	url:'/pages/main/my'
										// })
									}
								}
							});
						}, 1000);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
					}
				}
			});
		},
			// 支付宝 删除图片
				closes(e, s) {
					console.log(e)
					var self = this;
					service.auth(self, service.api.user.deleteImg, "POST", {
						path: e
					}, function(_self, res) {
						if (s === 1) {
							_self.imgbefore = '';
						} else if (s === 2) {
							_self.imgreverse = '';
						}
						console.log(res);
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					});
				},
		nn() {
			this.cc = 1;
		},
		jump(url, step) {
			if (this.step != step) {
				uni.showToast({
					icon: 'none',
					title: '请完成上一步'
				});
				return;
			}
			uni.navigateTo({
				url: url
			});
		},
		//支付接口
		paymentCost() {
			//#ifdef H5 || MP-WEIXIN
			uni.showToast({
				icon: 'none',
				title: '该功能只能在app内使用'
			});
			//#endif

			// #ifdef APP-PLUS
			/* service.auth(this,service.api.realName.paymentCost,"GET",{},function(self,res){ 
						if(res.code == 1){
							console.log(res,"pay")
							self.alipay_params = res.data.alipay_params
							uni.requestPayment({
								provider: 'alipay',
								orderInfo:self.alipay_params,
								success(res) {
									uni.showToast({
										icon:'none',
										title:'支付成功',
									})
									setTimeout(function(){
										uni.reLaunch({
											url:'/pages/realName/real_name'
										})
										// self.status()
									},1000)
								},
								fail: function (err) {
								        console.log('fail:' + JSON.stringify(err));
								 }
							})
						}
						// console.log(self.step);
					}) */

			uni.request({
				url: service.api.realName.paymentCost,
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: res => {
					var res = res.data;
					if (res.code == 1) {
						this.alipay_params = res.data.alipay_params;
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: this.alipay_params,
							success(res) {
								uni.showToast({
									icon: 'none',
									title: '支付成功'
								});
								setTimeout(function() {
									uni.reLaunch({
										url: '/pages/realName/real_name'
									});
									// self.status()
								}, 1000);
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				}
			});
			// #endif
		},
		// 实名步骤接口
		status() {
			service.auth(this, service.api.realName.getVerificationStep, 'GET', {}, function(self, res) {
				// console.log(res);
				if (res.code == 1) {
					self.step = res.data.step;
				}
				// console.log(self.step);
			});
			this.$forceUpdate();
		}
	},
	onShow() {
		// 获取实名步骤
		this.step = uni.getStorageSync('step');
		const user = uni.getStorageSync('member');
		this.cc = user.is_idverifly;
		this.status();

		/*----获取实名认证的状态---*/
		uni.request({
			//获取实名认证的状态
			url: this.$service.api.index.check_status,
			method: 'GET',
			header: {
				Authorization: 'Bearer ' + uni.getStorageSync('token')
			},
			success: res => {
				// var res = res.data;
			
					this.gg = res.data.data.status;
			
				
				console.log(this.gg,2222)
			}
		});
		//var res = uni.getStorageSync('realName')
		//this.gg = res
		// console.log(this.cc,this.step)
		// var nums = uni.getStorageSync('type')
		//console.log(res,11111)
	},
	onLoad(e) {
		console.log(e);
		//this.style = e.type
		this.status();

		this.$forceUpdate();
	}
};
</script>

<style lang="less">
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
	margin: 0;
	padding-top: calc(102rpx + var(--status-bar-height));
	background: #409afe;
}
.wallet{
	padding: 0 20upx;
	
}
.navbar {
		border-radius: 10upx 10upx 0  0;
		width:100%;
		display: flex;
		height: 50px;
		// padding: 0 5px;
		background: #fff;
		/* margin-top: calc(var(--status-bar-height) + 88upx); */
		box-shadow: 0px 4upx 8upx #dcdfe6;
		// position: fixed;
		// z-index: 4000;
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			// border-right: 2px solid #2189ff;
		font-size: 35rpx;
		font-weight: bold;
			color: #999;
			position: relative;
			
			&.current {
				// color: #f97020;
				color: #2189ff;
				font-size: 35rpx;
				font-weight: bold;
				border-bottom: 2px solid #2189ff;
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 60px;
					height: 0;
					/* border-bottom: 2px solid #fa436a; */
				}
			}
		}
		.nav-item:last-of-type{
			border-right: none;
			}
	}
	.box-big{
		height: 900upx;
		width: 100%;
		// padding: 0 20upx;
		background-color: #fff;
		}
		.swiper-box{
			height: 950upx;
			}
			
		.name{
			border-bottom: 1px solid #999;
			display: flex;
			height: 100upx;
			line-height: 100upx;
			font-size: 30upx;
			align-items: center;
		}	
		.name view{
			margin-left: 80upx;
			}
		.name input{
			text-indent: 30upx;
			}
		
			
			
			
			
			
			
.write {
	width: 100%;
	padding: 50rpx;
	box-sizing: border-box;
	// margin: 0 auto;
	.line {
		display: flex;
		// width:80%;
		font-size: 28rpx;
		height: 100rpx;
		// margin-top: 20rpx;
		align-items: center;
		padding: 0 10rpx;
		border: 1rpx solid #000;
		border-radius: 15rpx;
		background-color: #fff;
		text {
			margin-right: 15rpx;
		}
		input {
			font-size: 26rpx;
			width: 400upx;
		}
	}
}
.audit {
	width: 80%;
	height: 100rpx;
	line-height: 100rpx;
	background-color: #f70a0a;
	color: #ffffff;
	border-radius: 15rpx;
	margin: 0 auto;
	font-size: 35rpx;
}
.header {
	// background: #FAFAFA;
	// border-bottom: 2rpx solid #F2F2F2;
}
.realname {
	width: 100%;
	height: 320rpx;
	/* background: red; */
	/* position: fixed; */
}
.realname image {
	width: 100%;
	height: 300rpx;
}
.cash {
	width: 100%;
	position: relative;
	// margin-top: 70rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
}
.cash .cash_box {
	overflow: hidden;
	border-radius: 20rpx;
	// box-shadow: 0 0rpx 10rpx #FF8426;
}
.cash .cash_detail {
	width: 100%;
	box-sizing: border-box;
	padding: 46rpx 32rpx 10rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #ffffff;
}
.cash .cash_detail:last-child {
	padding-bottom: 60rpx;
}
.detail_left {
	display: flex;
	align-items: center;
}
.detail_left image {
	width: 60rpx;
	height: 60rpx;
	margin-right: 30rpx;
}
.detail_title .detail_title_word {
	font-size: 32rpx;
	color: #333333;
}
.detail_title .detail_title_description {
	font-size: 24rpx;
	color: #666666;
}
.cash .cash_detail .detail_right {
	width: 160rpx;
	height: 56rpx;
	line-height: 56rpx;
	text-align: center;
	border-radius: 28rpx;
	background: #409afe;
	font-size: 28rpx;
	color: #ffffff;
}
.detail_rights {
	width: 160rpx;
	height: 56rpx;
	line-height: 56rpx;
	text-align: center;
	border-radius: 28rpx;
	// background: #FF8426;
	font-size: 28rpx;
	color: #409afe;
	border: 2rpx solid #409afe;
}
.warn {
	box-sizing: border-box;
	padding: 50rpx 30rpx 0;
	font-size: 24rpx;
	color: #333333;
}
.name_btn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 50rpx;
	margin-top: 100rpx;
}
.btn {
	width: 100%;
	height: 80rpx;
	color: #ffffff;
	font-size: 34rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 80rpx;
	background: #409afe;
}
.name_bg {
	width: 100%;
	/* height: 100%; */
	height: calc(100% - 105rpx);
	background: #409afe;
	position: relative;
	// margin-top: 50rpx;
}
.name_bg image {
	width: 100%;
	height: 100%;
}

.name_bg1 {
	margin-top: 100rpx;
	text-align: center;
	image {
		width: 200rpx;
		height: 200rpx;
	}
	view {
		margin-top: 30rpx;
		font-size: 30rpx;
	}
}
.upload_box {
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin-top: 30upx;
		padding: 0 20upx 40upx;
	}

	.upload1 {
		box-sizing: border-box;

	}

	.up_title {
		color: #333333;
		font-size: 28upx;
		padding: 20upx 0;
	}

	.idcard_img {
		display: flex;
		justify-content: space-between;
	}

	.idcard_frrev {
		background-color: #F0F7FE;
		width: 300upx;
		height: 176upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10upx;
		position: relative;
	}

	.idcard {
		color: #BAC1C8;
		font-size: 24upx;
		/* width: 100%; */
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.idcard image {
		width: 64upx;
		height: 56upx;
	}

	.idcard222 {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.idcard222 image {
		width: 120upx;
		height: 122upx;
	}

	.idcards image {
		width: 300upx;
		height: 176upx;
		margin-bottom:20upx ;
	}

	.idcards {
		margin-top: 10upx;
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}
	
	.close {
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}

	.backBox {
		position: relative;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.xxxxx {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.ssssss {
		margin-top: 30upx;
	}

	.backBox image {
		width: 253upx;
		height: 253upx;

	}

	.picker_style {
		/* color: #333333; */
		color: #939190;

		font-size: 26upx;
		width: 70%;
	}
</style>
