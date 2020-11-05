<template>
	<view class="content">
		<view :class="[status != 2?'header':'header1']">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>实名认证</text>
			</view>
		</view>
		<view class="backBox" v-if="status == 0" >
			<view class="xxxxx">
			<image src="../../static/background/review.png" mode=""></image>
				<view class="ssssss" >
					审核中，请耐心等待
				</view>
			</view>
		</view>
		 <view class="backBox" v-else-if="status == 1" >
			<view class="xxxxx">
			<image src="../../static/background/passed.png" mode=""></image>
				<view class="ssssss" >
					已通过
				</view>
			</view>
		</view>
		<view class="" v-else>
		<view class="top_back"></view>
		<view class="top_back2"></view>
		<view class="top_notice">
			<text>您好，请您和您的推荐人一起认证注册，请认真对待上传的资料，如有虚假证件，一旦抽查到,会冻结您和您的推荐人帐号,谢谢理解！</text>
		</view>
		<view class="input_box">
			<view class="input_block">
				<view class="inps_title">
					<text>真实姓名</text>
				</view>
				<input class="inps" type="text" v-model="realname" placeholder="请输入真实姓名" placeholder-class="placehss" />
			</view>
			<view class="input_block">
				<view class="inps_title">
					<text>身份证号</text>
				</view>
				<input class="inps" type="text" maxlength="18" v-model="idnum" placeholder="请输入15位或18位身份证号"  placeholder-class="placehss" />
			</view>
		</view>
		
		<view class="upload_box">
			<view class="upload1">
				<view class="up_title">
					<text>上传身份证照片</text>
				</view>
				<view class="idcard_img">
					<view class="idcard_frrev">
						<view class="idcard" @click="front" v-if="frontimg == ''">
							<image src="../../static/icon/IDcardfront.png" mode=""></image>
							<text>身份证正面照片</text>
						</view>
						<block class="uplodimg" v-else>
						<view class="idcards"  >
							<image :src="frontimg" mode=""></image>
						</view>
						<view class="close" @click="close(frontimg , 1)">
							<image src="../../static/icon/closeimg.png" mode=""></image>
						</view>
						</block>
						</view>
					<view class="idcard_frrev">
						<view class="idcard" @click="rever" v-if="reverimg == ''">
							<image src="../../static/icon/IDcardfront.png" mode=""></image>
							<text >身份证反面照片</text>
						</view>
						<block class="uplodimg" v-else>
						<view class="idcards"  >
							<image :src="reverimg" mode=""></image>
						</view>
						<view class="close" @click="close(reverimg , 2)">
							<image src="../../static/icon/closeimg.png" mode=""></image>
						</view>
						</block>
					</view>
					
				</view>
			</view>
			<view class="upload1">
				<view class="up_title">
					<text>上传手持身份证照片</text>
				</view>
				<view class="idcard_img">
					<view class="idcard_frrev">
						<view class="idcard222">
							<image src="../../static/icon/inhandidcard.png" mode=""></image>
						</view>
						<view class="idcards"  v-show="false">
							<image src="../../static/icon/IDcardfront.png" mode=""></image>
						</view>
						</view>
					<view class="idcard_frrev">
						<view class="idcard" @click="idcard" v-if="idcardimg == ''">
							<image src="../../static/icon/IDcardfront.png" mode=""></image>
							<text>手持身份证照片</text>
						</view>
						<block class="uplodimg" v-else>
						<view class="idcards"  >
							<image :src="idcardimg" mode=""></image>
						</view>
						<view class="close" @click="close(idcardimg , 3)">
							<image src="../../static/icon/closeimg.png" mode=""></image>
						</view>
						</block>
					</view>
					
				</view>
			</view>
		</view>
                          <btncoms :title="btntitle" @btns="btns" :bitstyle = "bitstyle"></btncoms>
	</view>
	</view>
</template>

<script>
	import btncoms from "../../components/btncom.vue";
	import service from "../../service.js";
	export default{
		components:{
			 btncoms
		},
		data:function(){
			return{
				// Htitle:"申请救济",
				// Hlicon:"../../static/icon/left_whitch.png",
				bitstyle:"margin-top:50upx",
				btntitle:"提交审核",
				bitcolor:"",
				clause:true,
				realname:'',
				idnum:'',
				frontimg:'',
				reverimg:'',
				idcardimg:'',
				timeout:null,
				status:uni.getStorageSync('realName'),
			}
		},
		methods:{
			jump(e){
				uni.switchTab({
					url:e
				})
			},
			/* debounce(fn , wait){
				 this.timeout = null;
				return ()=>{
				if(this.timeout !== null) clearTimeout(this.timeout);
					this.timeout = setTimeout(fn , wait);
				}
			}, */
			btns(){
				
				
				if(this.timeout !== null) clearTimeout(this.timeout);
					this.timeout = setTimeout(()=>{
						console.log("123")
						uni.request({
								url:service.api.user.upIdentityCard,
								method:"POST",
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
								data:{
								realname:this.realname,
								idnum:this.idnum,
								idnum_img:this.frontimg,
								idnum_img_back:this.reverimg,
								idnum_img_hand:this.idcardimg
							},
							success: (res) => {
								if(res.data.code == 1){
									uni.showToast({
									title:res.data.info,
									icon:'none'
								});
								// setTimeout(()=>{
									this.status = 0;
								// },1000);
								}else{
									uni.showToast({
										title:res.data.info,
										icon:'none'
									});
								}
								
							},
							fail: (res) => {
								uni.showToast({
									title:res.data.data.info,
									icon:'none'
								})
							}
							});
					} , 1000);
				
				console.log(this.timeout)
				/* service.auth(this , service.api.user.upIdentityCard , "POST" , {
					realname:this.realname,
					idnum:this.idnum,
					idnum_img:this.frontimg,
					idnum_img_back:this.reverimg,
					idnum_img_hand:this.idcardimg
				},function(self,res){
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						self.status = 0;
					},1000);
				}); */
				
			/* 	uni.request({
					url:service.api.user.upIdentityCard,
					method:"POST",
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					data:{
					realname:this.realname,
					idnum:this.idnum,
					idnum_img:this.frontimg,
					idnum_img_back:this.reverimg,
					idnum_img_hand:this.idcardimg
				},
				success: (res) => {
					if(res.data.code == 1){
						uni.showToast({
						title:res.data.info,
						icon:'none'
					});
					setTimeout(()=>{
						this.status = 0;
					},1000);
					}else{
						uni.showToast({
							title:res.data.info,
							icon:'none'
						});
					}
					
				},
				fail: (res) => {
					uni.showToast({
						title:res.data.data.info,
						icon:'none'
					})
				}
				}) */
				
			},
			close(e , s){//删除身份证 s用来判断要清空那张图片
			console.log(e)
				var self = this;
					service.auth(self , service.api.user.deleteImg , "POST" , {
						path:e
					},function(_self , res){
						if(s === 1){
							_self.frontimg = '';
						}else if(s === 2){
							_self.reverimg = '';
						}else if(s === 3){
							_self.idcardimg = '';
						}
						console.log(res);
						uni.showToast({
							title:res.info,
							icon:'none'
						})
					});
			},
			front(){//上传正面身份证
			var self = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
						console.log(chooseImageRes);
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (res) => {
				                console.log(JSON.parse(res.data),"asfasdf");
								const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
								self.frontimg = path.data.url;
								console.log(self.frontimg,"asdfasdfa");
								uni.showToast({
									title:path.info,
									icon:'none'
								});
				            }
				        });
				    }
				});
			},
			rever(){//上传反面身份证
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
					                console.log(JSON.parse(res.data),"asfasdf");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									self.reverimg = path.data.url;
									console.log(self.reverimg,"asdfasdfa");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
			},
			idcard(){//上传手持身份证
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
					                console.log(JSON.parse(res.data),"asfasdf");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									self.idcardimg = path.data.url;
									console.log(res,"asdfasdfa");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
			}
			
			
		},
		onLoad() {
			
		},
		onShow() {
			uni.request({//获取实名认证的状态
				url:this.$service.api.index.check_status,
				method:'GET',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success:(res)=>{
					var res = res.data;
					this.status = res.data.status
					uni.setStorageSync('realName' , this.status);
					console.log(this.status,"authStatus");
				}
			});
		}
		
	}
</script>

<style>
	.content {
		padding-left: 24upx;
		padding-right: 24upx;
		background-color: transparent;
	}

	.header1 {
		background: transparent;
		height:calc(102rpx + var(--status-bar-height));
		position: fixed;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.header{
		background: #2189FF;
		height:calc(102rpx + var(--status-bar-height));
		position: fixed;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		/* background-color:transparent;
		background: transparent; */
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
		/* background-color: #EFF3F6; */
	}

	.top_back {
		position: fixed;
		top: 0;
		left: 0;
		background: linear-gradient(to right, #38B7F9, #1A81F1);
		height: 364upx;
		width: 100%;
		z-index: -1;
	}
	.top_back2{
		position: fixed;
		top: 364upx;
		left: 0;
		background: #EFF3F6;
		height: 100%;
		width: 100%;
		z-index: -1;
	}
	.top_notice{
		color:#FFFFFF;
		font-size: 26upx;
		line-height: 42upx;
		padding-top: 30upx;
	}
	.input_box{
		width: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30upx;
		border-radius: 10upx;
		margin-top: 40upx;
	}
	.input_block{
		/* width: 100%; */
		display: flex;
		align-items: center;
		padding: 30upx 0;
	}
	.input_block:nth-of-type(1){
		border-bottom: 2upx solid #F4F4F4;
	}
	.inps_title{
		color: #333333;
		 font-size: 26upx;
		 width: 20%;
	}
	.placehss{
		color: #939190;
		font-size: 26upx;
	}
	.inps{
		color: #333333;
		font-size: 26upx;
		width: 80%;
		
	}
	.upload_box{
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin-top: 30upx;
		padding: 0 20upx 40upx;
	}
	.upload1{
		box-sizing: border-box;
		
	}
	.up_title{
		color: #333333;
		font-size: 28upx;
		padding: 20upx 0;
	}
	.idcard_img{
		display: flex;
		justify-content: space-between;
	}
	.idcard_frrev{
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
	.close{
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}
	.idcard{
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
	.idcard image{
		width: 64upx;
		height: 56upx;
	}
	.idcard222{
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}
	.idcard222 image{
		width: 120upx;
		height: 122upx;
	}
	.idcards image{
		width: 300upx;
		height: 176upx;
	}
	.idcards{
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}
	.uplodimg{
		
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
