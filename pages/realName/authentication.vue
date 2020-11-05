<template>
	<view class="content">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<headers :Htitle="title" :Hlicon="icon" :url_le="url_left"></headers>
		<view class="write">
			<view class="line"><text>真实姓名:</text><input type="text" v-model="name" placeholder="请输入您的名字"></view>
			<view class="line"><text>身份证号:</text><input type="text" v-model="idnum" placeholder="请输入身份证号"></view>
			<!-- <view class="line"><text>支付宝账号:</text><input type="text" v-model="alipay" placeholder="请输入支付宝账号"></view> -->
			<!-- <label class="radio" ><radio value=""  style="transform: scale(0.5);" />我同意实名认证并授权</label> -->
			
		</view>
		<button @click="obtain">提交审核</button>
	</view>
</template>

<script>
	import headers from '@/components/header_nav.vue';
	import service from '../../service.js';
	//插件对象
	var sdkwx = uni.requireNativePlugin('RealIdentity-SdkWX');
	export default{
		components: {
			headers
		},
		data(){
			return{
				title: '实名认证',
				icon: '/static/icon/left_whitch.png',
				url_left:'/pages/realName/real_name',
				name:'',
				idnum:'',
				VerifyToken:''//识别码
			}
		},
		onLoad() {
				//初始化、
				sdkwx.initialize();
		},
		methods:{
			obtain(){
				/*----------------*/
				uni.request({
					url:service.api.realName.getRealnameVerifyToken,
					method:'POST',
					data:{
					realname:this.name,
					idnum:this.idnum
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						let self = this;
						var res = res.data;
						console.log(res,"21321");
						if(res.code == 1){
							self.VerifyToken = res.data.VerifyToken
							self.BizId = res.data.BizId
							/* uni.showModal({
								content:self.BizId
							}) */
							if(self.VerifyToken != ''){
								sdkwx.start(self.VerifyToken, function(res){
									console.log(res , "start");
									console.log(res.code);
									console.log(self.BizId)
									// console.log(res.code);
									//var msg = JSON.stringify(res);
									if(res.state == 1){
										/* uni.showToast({
											icon:'none',
											title:'认证通过'
										}) */
										// setTimeout(()=>{
											self.submitRealname();
										// },500)
										
									}else if(res.state == -1){
										uni.showToast({
											icon:'none',
											title:'认证退出'
										})
									}else if(res.state == 2){
										uni.showToast({
											icon:'none',
											title:'认证失败'
										})
									}else{
										console.log("error");
									}
									
								});
							}
						}else{
							uni.showToast({
								title:res.info,
								icon:'none'
							});
						}
					},
					fail: (res) => {
						uni.showToast({
							title:res.info,
							icon:'none'
						});
					}
				})
				
				/*----------------*/
				
				
			},
			// 实名最后的提交
			submitRealname(){
				console.log("submitRealName")
				service.auth(this,service.api.realName.realname,"POST",{
					realname:this.name,
					idnum:this.idnum,
					BizId:this.BizId
				}, function(self,res){
					console.log(res,"123456789");
					uni.showToast({
						title:res.info,
						icon:'none'
					})
					// console.info(res.info)
					//setTimeout(function(){
						if(res.code == 1){
							uni.switchTab({
								url:'/pages/main/my'
							})
							 /* uni.reLaunch({
								url:'/pages/realName/real_name'
							}) */
						}
						
					//},1000)
					
				})
			},
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	// .header{
	// 	background-color: #ff8426;
	// }
	page{
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
		height: 100%;
		padding-top: calc(102rpx + var(--status-bar-height));
		background-color: #FFFFFF;
		
	}
	.write{
		width: 100%;
		padding: 50rpx;
		box-sizing: border-box;
		// margin: 0 auto;
		.line{
			display: flex;
			// width:80%;
			font-size: 28rpx;
			height: 100rpx;
			margin-top:20rpx ;
			align-items: center;
			padding: 0 30rpx;
			border: 1rpx solid #EEEEEE;
			border-radius: 15rpx;
			text{
				margin-right: 15rpx;
			}
			input{
				font-size: 26rpx;
			}
		}
	}
	button{
		width:80%;
		height: 100rpx;
		background-color: #409afe;
		color: #FFFFFF;
		border-radius: 15rpx;
		margin: 0 auto;
	}
	
</style>
