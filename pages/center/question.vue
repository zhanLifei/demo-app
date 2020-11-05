<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/service/feedback')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>上传凭证
</text>
			</view>
		</view>
		<view class="upload">
			<view class="up_box">
				<view class="inp">
					输入内容
				</view>
				<view class="area">
					<textarea v-model="content" placeholder="您可以在这里输入内容…" />
				</view>
				<view class="upload">
					<view class="up_box">
						<view class="ti">上传图片</view>
						<view class="imgs">
							<image v-if="img_arr == ''" @tap="upload" src="../../static/icon/add_icon.png" mode=""></image>
							
							<view class="imgs_box" v-else >
								<image :src="img_arr" mode="scaleToFill"></image>
								<image class="close"   @tap="close()" src="../../static/img/close.png" mode="widthFix"></image>
							</view>
							
						</view>
						<!-- <view class="up_img">
							<view class="imglist">
								<image src="../../static/icon/add_icon.png" mode=""></image>
								<image src="../../static/icon/add_icon.png" mode=""></image>
								<image src="../../static/icon/add_icon.png" mode=""></image>
							</view>
							<image src="../../static/icon/add_icon.png" mode=""></image>
						</view> -->
					</view>
				</view>
				<!-- <view class="ti">上传图片</view>
				<view class="up_img">
					<view class="imglist">
						<image src="../../static/icon/add_icon.png" mode=""></image>
						<image src="../../static/icon/add_icon.png" mode=""></image>
						<image src="../../static/icon/add_icon.png" mode=""></image>
					</view>
					<image src="../../static/icon/add_icon.png" mode=""></image>
				</view> -->
			</view>
		</view>
		<view class="bt" @click="Submi">
			确定
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	export default{
		data(){
			return{
				img_arr:'',
				id:'',
				content:'',
				subBoolean:true
			}
		},
		methods:{
			jump(url){
				uni.navigateTo({
					url
				});
			},
			close(){
				this.img_arr = '';
			},
			upload(){
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
								// self.invoiceimg = path.data.url;
								// console.log(path)
								self.img_arr = path.data.url
								console.log(self.img_arr)
								uni.showToast({
									title:path.info,
									icon:'none'
								});
				            }
				        });
				    }
				});
			},
			Submi(){
				
				if(this.img_arr == ''){
					uni.showToast({
						icon:'none',
						title:'请上传凭证！'
					})
					return
				}
				if(this.content == ''){
					uni.showToast({
						icon:'none',
						title:'输入内容！'
					})
					return
				}
				if(this.subBoolean){
					service.auth(this , service.api.service.submitWorkorder , 'POST' , {
					screenshot:this.img_arr,
					content:this.content
				} , function(self ,res){
					self.subBoolean = false;
					console.log(res);
					uni.showToast({
						icon:'none',
						title:res.info
					});
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/service/feedback'
							})
						},1500);
				});
				}
			},
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
	
	.upload{
		width: 100%;
		padding: 36rpx 20rpx 0;
		box-sizing: border-box;
		.up_box{
			width: 100%;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 20rpx 40rpx;
			.up_img{
				display: flex;
			}
			textarea{
				width: 100%;
				height: 200rpx;
				color: #333;
			}
			image{
				width: 140rpx;
				height: 140rpx;
				margin-right: 20rpx;
			}
			.inp{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 8rpx;
			}
			.ti{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 36rpx;
			}
		}
	}
	.bt{
		width: 560rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #2189FF;
		border-radius: 45rpx;
		margin: 68rpx auto 0;
		font-size: 36rpx;
	}
	
	.upload{
		width: 100%;
		padding: 36rpx 20rpx 0;
		box-sizing: border-box;
		.up_box{
			width: 100%;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 20rpx 40rpx;
			.up_img{
				display: flex;
			}
			image{
				width: 140rpx;
				height: 140rpx;
				margin-right: 20rpx;
			}
			.ti{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 36rpx;
			}
		}
	}
	
	.imgs{
		width: 100%;
		display: flex;
		.imgs_box{
			position: relative;
			.close{
				position: absolute;
				right: -20rpx;
				top: -20rpx;
				width: 80rpx;
				height: 80rpx;
			}
		}
		
		image{
			width: 140rpx;
			height: 140rpx;
		}
	}
</style>
