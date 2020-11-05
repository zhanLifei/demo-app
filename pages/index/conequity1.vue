<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>兑换股权</text>
			</view>
		</view>
		<view class="top_back"></view>
		<view class="top_back2"></view>
		
		<view class="input_box">
			<view class="input_block">
				<view class="inps_title">
					<text>请在下方输入兑换份数</text>
				</view>
				<input class="inps" type="text" value="" placeholder="注：1车贝兑换3份股权，每次兑换不得少于100车贝" placeholder-class="placehss" />
			</view>
			<view class="input_block2">
				<view class="inps_title2">
					<text>请输入置换密码</text>
				</view>
				<input class="inps2" type="password" value="" placeholder=""  placeholder-class="placehss" />
			</view>
			<view class="input_block2">
				<view class="inps_title3">
					<text>请输入验证码</text>
				</view>
				<input class="inps3" type="password" value="" placeholder=""  placeholder-class="placehss" />
				<view class="getauthcode"  @click="getAuthCode">
					<text>{{codeTime}}</text>
				</view>
			</view>
		</view>
		
		
                          <btncoms :title="btntitle"  :bitstyle = "bitstyle"></btncoms>
	</view>
</template>

<script>
	import btncoms from "../../components/btncom.vue"
	export default{
		components:{
			 btncoms
		},
		data:function(){
			return{
				// Htitle:"申请救济",
				// Hlicon:"../../static/icon/left_whitch.png",
				bitstyle:"margin-top:50upx",
				btntitle:"兑换",
				bitcolor:"",
				clause:true,
				codeTime:'获取验证码',
				codeB:true
				
			}
		},
		methods:{
			jump(e){
				uni.switchTab({
					url:e
				});
			},
			getAuthCode(){
				var self = this;
				if(self.codeB){
					self.codeB = false;
					self.codeTime = 10
				if(self.codeTime > 0){
					var sss = setInterval(()=>{
						self.codeTime--;
						if(self.codeTime == 0){
							self.codeTime = '重新获取验证码'
							clearInterval(sss);
							self.codeB = true;
						}
					},1000)
				}else{
					self.codeTime = '重新获取验证码'
					self.codeB = true;
				}
				}else{
					console.log('12321')
					uni.showToast({
						title:'请勿重复获取验证码!',
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style>
	.content {
		padding-left: 24upx;
		padding-right: 24upx;
		background-color: transparent;
	}

	.header {
		background: transparent;
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
		background:  #1A81F1;
		height: 243upx;
		width: 100%;
		z-index: -1;
	}
	.top_back2{
		position: fixed;
		top: 243upx;
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
		padding: 0 30upx 200upx;
		border-radius: 10upx;
		margin-top: 40upx;
	}
	.input_block{
		/* width: 100%; */
		/* display: flex; */
		/* align-items: center; */
		padding: 30upx 0;
		border-bottom: 2upx solid #F3F3F3;
	}
	/* .input_block:nth-of-type(1){
		border-bottom: 2upx solid #F4F4F4;
	} */
	.inps_title{
		color: #333333;
		 font-size: 26upx;
		 /* border-bottom: 2upx solid #F3F3F3; */
		 padding: 30upx 0;
		 /* width: 20%; */
	}
	.placehss{
		color: #939190;
		font-size: 26upx;
	}
	.inps{
		color: #333333;
		font-size: 26upx;
		/* width: 80%; */
		margin-top: 10upx;
		
	}
	
	.input_block2{
		padding: 30upx 0;
		display: flex;
		border-bottom: 2upx solid #F3F3F3;
	}
	/* .input_block2:nth-last-of-type(1){
		border-bottom: none;
	} */
	.inps_title2{
		color: #333333;
		 font-size: 26upx;
		 width: 30%;
	}
	.inps2{
		color: #333333;
		font-size: 26upx;
		width: 70%;
		
	}
	.inps_title3{
		color: #333333;
		 font-size: 26upx;
		 width: 30%;
	}
	.inps3{
		color: #333333;
		font-size: 26upx;
		width: 40%;
		
	}
	.getauthcode{
		color: #FBB35A;
		font-size: 28upx;
		width: 40%;
	}
</style>
