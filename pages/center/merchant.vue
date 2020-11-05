<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="backBox" v-if="statu == 3">
			<view class="xxxxx">
			<image src="../../static/background/passed.png" mode=""></image>
				<view class="ssssss" >
					已通过
				</view>
			</view>
		</view>
		<view class="backBox" v-if="statu == 2">
			<view class="xxxxx">
			<image src="../../static/background/review.png" mode=""></image>
				<view class="ssssss" >
					审核中，请耐心等待
				</view>
			</view>
		</view>
		<view class="" v-if="statu == 1">
			<view class="top_sel_box">
				<view class="sel_wind" @click="seltype">
					<view class="sel_title">
						<text>{{typename}}</text>
					</view>
					<view class="sel_icon">
						<image :src="showtype?'../../static/icon/merchan_up.png':'../../static/icon/merchant_down.png'" mode=""></image>
					</view>
				</view>
				<view class="drop_down" v-if="showtype">
					<view class="drop_it" v-for="(it ,i) in droplis" :key="it.id" @click="selservice(it.id , it.catname)">
						<text>{{it.catname}}</text>
					</view>
				</view>
			</view>
			<view class="mask" v-if="showtype"></view> <!-- 遮罩 -->
			<!-- - -->
			<view class="box_title">
				<text>身份证信息</text>
			</view>
			<view class="box1">
				<view class="box1_block">
					<view class="blockss">
						<text>姓名</text>
					</view>
					<input class="inssss" type="text" v-model="name" placeholder="请输入姓名" placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>身份证号</text>
					</view>
					<input class="inssss" maxlength="18" type="text" v-model="idcard" placeholder="请输入身份证号码" placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>法人手机号码</text>
					</view>
					<input class="inssss" maxlength="11" type="text" v-model="mobile" placeholder="请输入法人手机号码" placeholder-class="inputcl" />
				</view>
				<view class="upload_idcard">
					<view class="upimage">
						<view class="card_fre">
							<block v-if="frontimg == ''">
								<view class="fre_img" @click="front(1)">
									<image src="../../static/icon/IDcardfront.png" mode=""></image>
								</view>
								<view class="fre_text">
									<text>法人手持身份证正面上传</text>
								</view>
							</block>
							<block class="uplodimg" v-else>
								<view class="idcards">
									<image :src="frontimg" mode=""></image>
								</view>
								<view class="close" @click="close(1)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>
						<!-- <view class="" v-if="false">
						<image src="" mode=""></image>
					</view> -->
					</view>
					<view class="upimage">
						<view class="card_fre">
							<block v-if="reverimg == ''">
								<view class="fre_img" @click="front(2)">
									<image src="../../static/icon/IDcardfront.png" mode=""></image>
								</view>
								<view class="fre_text">
									<text>法人手持身份证反面上传</text>
								</view>
							</block>
							<block class="uplodimg" v-else>
								<view class="idcards">
									<image :src="reverimg" mode=""></image>
								</view>
								<view class="close" @click="close(2)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>
						<!-- <view class="" v-if="false">
						<image src="" mode=""></image>
					</view> -->
					</view>
				</view>
			</view>
			<!-- - -->
			<view class="box_title">
				<text>店铺信息</text>
			</view>
			<view class="box1">
				<view class="box1_block">
					<view class="blockss">
						<text>店铺名称</text>
					</view>
					<input class="inssss" type="text" v-model="merchname" placeholder="请输入店铺名称" placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>店铺地址</text>
					</view>
					<input @click="getLoc" disabled v-model="address" class="inssss" type="text" placeholder="请输入店铺地址"
					 placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>店铺联系电话</text>
					</view>
					<input class="inssss" type="text" v-model="merch_mobile" placeholder="请输入店铺联系电话" placeholder-class="inputcl" />
				</view>
				<view class="upload_idcard22">
					<view class="upimage22">
						<view class="card_fre">
							<block v-if="businessImg == ''">
								<view class="fre_img" @click="front(3)">
									<image src="../../static/icon/IDcardfront.png" mode=""></image>
								</view>
								<view class="fre_text">
									<text>营业执照上传</text>
								</view>
							</block>
							<block v-else>
								<view class="idcards22">
									<image :src="businessImg" mode=""></image>
								</view>
								<view class="close" @click="close(3)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>
						<!-- <view class="" v-if="false">
						<image src="" mode=""></image>
					</view> -->
					</view>
					<view class="upimage22">
						<view class="card_fre22">
							<block v-if="flatImg == ''">
								<view class="fre_img" @click="front(4)">
									<image src="../../static/icon/IDcardfront.png" mode=""></image>
								</view>
								<view class="fre_text">
									<text>展示图上传</text>
								</view>
							</block>

							<block v-else>
								<view class="idcards22">
									<image :src="flatImg" mode=""></image>
								</view>
								<view class="close" @click="close(4)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>
						<!-- <view class="" v-if="false">
						<image src="" mode=""></image>
					</view> -->
					</view>
				</view>
			</view>
			<!-- - -->
			<view class="box_title">
				<text>收款信息</text>
			</view>
			<view class="box1">
				<view class="box1_block">
					<view class="blockss">
						<text>开户名</text>
					</view>
					<input class="inssss" type="text" v-model="bankrealname" placeholder="请输入法人开户名" placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>开户银行</text>
					</view>
					<input class="inssss" type="text" v-model="bankname" placeholder="请输入法人开户银行XX分行" placeholder-class="inputcl" />
				</view>
				<view class="box1_block">
					<view class="blockss">
						<text>法人银行账号</text>
					</view>
					<input class="inssss" type="text" v-model="bankcard" placeholder="请输入法人银行账号" placeholder-class="inputcl" />
				</view>
				<!-- <view class="upload_idcard">
			<view class="upimage">
			<view class="card_fre">
				<view class="fre_img">
					<image src="../../static/icon/IDcardfront.png" mode=""></image>
				</view>
				<view class="fre_text">
					<text>法人手持身份证正面上传</text>
				</view>
			</view>
				<view class="" v-if="false">
					<image src="" mode=""></image>
				</view>
			</view>
			<view class="upimage">
			<view class="card_fre">
				<view class="fre_img">
					<image src="../../static/icon/IDcardfront.png" mode=""></image>
				</view>
				<view class="fre_text">
					<text>法人手持身份证反面上传</text>
				</view>
			</view>
				<view class="" v-if="false">
					<image src="" mode=""></image>
				</view>
			</view>
		</view> -->
			</view>
			<view class="box_notie">
				<text>注：收款银行仅支持中国银行、农业银行、建设银行、工商银行</text>
			</view>
			<!-- - -->
			<!-- <view class="box_title">
			<text>推荐人信息</text>
		</view>
		<view class="box1">
			<view class="box1_block">
				<view class="blockss">
					<text>推荐人ID</text>
				</view>
				<input class="inssss" type="text" v-model="referrer" placeholder="请输入推荐人ID" placeholder-class="inputcl" />
			</view>
		</view> -->
			<view class="bottom_btn" @click="submit">
				<text>提交申请</text>
			</view>
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "申请成为商家",
				Hlicon: "../../static/icon/left_whitch.png",
				showtype: false,
				typename: "请选择店铺类别",
				type: '', //店铺类别
				name: '', //
				idcard: '', //身份证号
				mobile: '', //手机号码
				frontimg: '', //正面图片
				reverimg: '', //反面图片
				merchname: '', //店铺名称
				address: '', //店铺地址
				merch_mobile: '', //店铺联系电话
				businessImg: '', //营业执照
				flatImg: '', //展示图
				bankrealname: '', //银行实名
				bankname: '', //银行
				bankcard: '', //银行卡号
				longitude: '', //经度
				latitude: '', //纬度
				statu: uni.getStorageSync('merchantAuth'), //店铺申请的状态值
				//referrer:'',//推荐人IDd
				droplis: uni.getStorageSync('category') /* [
					{
						id: 1,
						name: "洗车服务"
					},
					{
						id: 2,
						name: "修车服务"
					},
					{
						id: 3,
						name: "年审服务"
					},
					{
						id: 4,
						name: "学车服务"
					},
					{
						id: 5,
						name: "加油服务"
					}
				] */
			}
		},
		methods: {
			upLocadfile(_success) {
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: self.$service.api.home.uploadImgHLF, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							filePath: tempFilePaths[0],
							name: 'file',
							// formData: {
							//     'user': 'test'
							// },
							success: (uploadFileRes) => {
								var ss = JSON.parse(uploadFileRes.data);
								console.log(ss);
								_success(self, ss);
								// e = ss.data.url;
							}
						});
					}
				});
			},

			front(i) {
				if (i == 1) {
					this.upLocadfile(function(self, res) {
						self.frontimg = res.data.url;
						uni.showToast({
							title: res.info,
							icon: "none"
						})
					});
				} else if (i == 2) {
					this.upLocadfile(function(self, res) {
						self.reverimg = res.data.url;
						uni.showToast({
							title: res.info,
							icon: "none"
						})
					});
				} else if (i == 3) {
					this.upLocadfile(function(self, res) {
						self.businessImg = res.data.url;
						uni.showToast({
							title: res.info,
							icon: "none"
						})
					});
				} else if (i == 4) {
					this.upLocadfile(function(self, res) {
						self.flatImg = res.data.url;
						uni.showToast({
							title: res.info,
							icon: "none"
						})
					});
				}

				// this.upLocadfile(function(self , res){
				// 	self.frontimg = res.data.url;
				// 	uni.showToast({
				// 		title:res.info,
				// 		icon:"none"
				// 	})
				// });
			},

			/*-------*/
			close(i) {
				if (i == 1) {
					this.frontimg = '';
				} else if (i == 2) {
					this.reverimg = '';
				} else if (i == 3) {
					this.businessImg = '';
				} else if (i == 4) {
					this.flatImg = '';
				}
			},
			/*-------*/

			seltype() {
				this.showtype = !this.showtype
			},
			selservice(e, n) {
				this.showtype = !this.showtype;
				this.typename = n;
				this.type = e;
			},

			getLoc() {
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         const latitude = res.latitude;
				//         const longitude = res.longitude;
				//         uni.openLocation({
				//             latitude: latitude,
				//             longitude: longitude,
				//             success: function (res) {
				//                 console.log('success',res);
				//             }
				//         });
				//     }
				// });
				// var self = thisfunction;
				uni.chooseLocation({
					success: (res)=>{
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.address = res.address;
					}
				});
			},


			submit() {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '请确保所有项目已填写和正确,否则可能会导致申请不通过!',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							self.$service.auth(self, self.$service.api.center.apply_merch, 'POST', {
								type: self.type,
								name: self.name,
								idcard: self.idcard,
								mobile: self.mobile,
								identity_positive_image: self.frontimg,
								identity_other_image: self.reverimg,
								merchname: self.merchname,
								merch_address: self.address,
								merch_mobile: self.merch_mobile,
								merch_license: self.businessImg,
								merch_showimg: self.flatImg,
								bankrealname: self.bankrealname,
								bankname: self.bankname,
								bankcard: self.bankcard,
								lat: self.longitude,
								lng: self.latitude

							}, function(self, res) {
								console.log(res);
								uni.showToast({
									title: res.info,
									icon: "none"
								});
								

								setTimeout(() => {
									self.statu = 2;
									uni.switchTab({
										url: '/pages/main/my'
									})
								}, 1500)

							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});


			}
		},
		onShow() {
			// uni.getLocation({
			//     type: 'wgs84',
			//     success:(res)=>{
			// 		this.longitude = res.longitude;
			// 		this.latitude = res.latitude;
			//         console.log('当前位置的经度：' + res.longitude ,"longitude");
			//         console.log('当前位置的纬度：' + res.latitude);
			//     }
			// });
			// this.$service.auth(this , this.$service.api.center.check_status, 'POST' , '' , function(self , res){
			// 	console.log(res)
			// })
			
			

			uni.request({//获取商家认证状态
				url: this.$service.api.center.check_status,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					var res = res.data
					this.statu = res.status;
					uni.setStorageSync('merchantAuth' , this.statu);
					console.log(this.statu , 'merchantAuth');
				}
			});
		}

	}
</script>

<style>
	.content {
		background-color: #f6f3f7;
	}

	.top_sel_box {
		background-color: #FFFFFF;
		padding: 30upx;
		position: relative;
		z-index: 3;
	}

	.sel_wind {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.drop_down {
		background-color: #FFFFFF;
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 3;
	}

	.drop_it {
		background-color: #FFFFFF;
		text-align: center;
		padding: 20upx;
		box-sizing: border-box;
		color: #494949;
		font-size: 28upx;
	}

	.drop_it:nth-child(2n) {
		background-color: #faf7fa;
	}

	.mask {
		z-index: 2;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.sel_title {
		color: #212121;
		font-size: 28upx;
		font-weight: bold;
	}

	.sel_icon {
		margin-top: 5upx;
	}

	.sel_icon image {
		width: 32upx;
		height: 32upx;
		margin-left: 10upx;
	}

	.box_title {
		color: #494949;
		font-size: 26upx;
		padding: 20upx 30upx;
	}

	.box_title text {
		padding: 0 10upx;
		border-left: 4upx solid #2189FF;
	}

	.box1 {
		background-color: #FFFFFF;
	}

	.box1_block {
		display: flex;
		padding: 30upx;
		border-bottom: 2upx solid #E5E5E5;
	}

	.blockss {
		color: #333333;
		font-size: 30upx;
		width: 31%;
	}

	.inputcl {
		color: #999999;
		font-size: 28upx;
	}

	.inssss {
		width: 69%;
	}

	.upload_idcard {
		display: flex;
		justify-content: space-around;
		padding: 30upx;
	}

	.upimage {
		width: 330upx;
		height: 194upx;
		background-color: #f6f3f7;
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.upimage22 {
		width: 100%;
		height: 253upx;
		background-color: #f6f3f7;
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.upimage22:first-of-type {
		margin-bottom: 20upx;
	}

	.fre_img {
		text-align: center;
	}

	.fre_img image {
		width: 66upx;
		height: 59upx;
	}

	.fre_text {
		color: #A7A7A7;
		font-size: 22upx;
	}

	.upload_idcard22 {
		/* display: flex; */
		/* justify-content: space-around; */
		padding: 30upx;
	}

	.box_notie {
		color: #494949;
		font-size: 26upx;
		padding: 20upx 30upx;
		color: #F70A0A;
		font-size: 20upx;
	}

	.bottom_btn {
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 30upx auto 60upx;
	}

	.close {
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}

	.idcards image {
		width: 330upx;
		height: 194upx;
	}

	.idcards {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.idcards22 image {
		width: 682upx;
		height: 253upx;
	}

	.idcards22 {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.backBox {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.xxxxx{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.ssssss{
		margin-top: 30upx;
	}
	.backBox image {
		width: 253upx;
		height: 253upx;
		
	}
</style>
