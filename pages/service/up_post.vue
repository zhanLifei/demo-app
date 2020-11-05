<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>上传POS机首刷凭证
				</text>
			</view>
		</view>
		<view class="imgbox">
			<view class="tit">
				上传首刷凭证
			</view>
			<view class="imgs">
				<view class="imgs_box"  v-for="(item,index) in img_arr" :key="index">
					<image :src="item" mode="scaleToFill"></image>
					<image class="close"  @tap="close(index)" src="../../static/img/close.png" mode="widthFix"></image>
				</view>
				<image @tap="upload" src="../../static/icon/add_icon.png" mode=""></image>
			</view>
		</view>
		<view class="btns" @tap="Submi">
			确定
		</view>
	</view>
	
</template>

<script>
	import service from "../../service.js";
	export default {
		data() {
			return {
				img_arr: [],
				id:''
			}
		},
		onLoad(e) {
			// console.log(e);
			this.id = e.id
		},
		methods: {
			upload(){
				var self = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: service.api.service.uploadImg, //仅为示例，非真实的接口地址
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
			close(index){
				this.img_arr.splice(index,1)
				console.log(this.img_arr)
			},
			Submi(){
				if(this.img_arr == ''){
					uni.showToast({
						icon:'none',
						title:'请上传POS机首刷凭证！'
					})
					return
				}
				let arr = []
				arr.push(this.img_arr)
				service.auth(this , service.api.service.posCheck , 'POST' , {
					pos_fields:arr,
					pos_id:this.id,
					token:uni.getStorageSync('token')
				} , function(self ,res){
					console.log(res);
					uni.showToast({
						icon:'none',
						title:res.info
					});
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/main/my'
							})
						},1000)
					
				});
				
			},
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
	.imgbox{
		width: 710rpx;
		margin: 36rpx auto 0;
		background-color: #fff;
		padding: 32rpx 20rpx 40rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		.tit{
			font-size: 28rpx;
			color: #666;
			box-sizing: border-box;
			margin-bottom: 36rpx;
			
		}
		.imgs{
			width: 100%;
			display: flex;
			.imgs_box{
				position: relative;
				margin-right: 5rpx;
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
	}
	.btns{
		text-align: center;
		margin: 150rpx auto 0;
		width: 70%;
	   color: #FFFFFF;
	   font-size: 36upx;
	   background-color:#2189FF;
	   padding: 20upx 0;
	   border-radius: 60upx;
	}
</style>
