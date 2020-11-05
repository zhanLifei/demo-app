<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>上传凭证
</text>
			</view>
		</view>
		<view class="upload">
			<view class="up_box">
				<view class="ti">上传图片</view>
				<view class="imgs">
					<view class="imgs_box"  v-for="(item,index) in img_arr">
						<image :src="item" mode="scaleToFill"></image>
						<image class="close"  @tap="close(index)" src="../../static/img/close.png" mode="widthFix"></image>
					</view>
					
					<image @tap="upload" src="../../static/icon/add_icon.png" mode=""></image>
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
		<view class="bt" @tap="Submi()">
			确定
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	export default{
		data(){
			return{
				img_arr: [],
				id:'',
			}
		},
		methods:{
			jump(url){
				uni.switchTab({
					url
				});
			},
			close(index){
				this.img_arr.splice(index,1)
				console.log(this.img_arr)
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
								self.img_arr.push(path.data.url)
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
						title:'请上传首刷凭证！'
					})
					return
				}
				let arr = []
				arr.push(this.img_arr)
				service.auth(this , service.api.center.diyformCheck , 'POST' , {
					insurance_log_id:this.id,
					pos_fields:arr
				} , function(self ,res){
					console.log(res);
					uni.showToast({
						icon:'none',
						title:res.info
					})
					if(res.code == 1){
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/center/voucher'
							})
						},1000)
					}
				});
				
			},
		},
		
		onLoad(e) {
			this.id = e.id;
			console.log(this.id)
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
