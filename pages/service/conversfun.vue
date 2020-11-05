<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :subtitle="subtitle" :url_ri="'/pages/service/myfun'"></headers>
		<view class="fun_box">
			<view class="all_box" v-for="(it , i) in funlist" :key="it.id">
				
		<view class="fun_it" >
			<view class="cent_con"  :style="'background:url(' + it.bgimage + ') no-repeat' + '; background-size: cover;'">
				<view class="leto_text">
					<text>{{it.couponname}}</text>
				</view>
				<view class="cent_bot">
					<view class="bot_left">
						<text style="font-size: 26upx; font-weight: bold;">{{Number(it.money)}}</text>
						<text>{{it.type == 1? '车贝':'积分'}}</text>
					</view>
					<view class="bot_right">
						<text>•使用有效期:</text>
						<text>{{it.timedays}}天</text>
					</view>
				</view>
			</view>
			<view class="fun_botbtn">
				<view class="btn_left" @tap="jump(it.desc)">
					<text>使用规则</text>
				</view>
				<view class="btn_right" @tap="receive(it.id)"> 
					<text>兑换</text>
				</view>
			</view>
		</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	import service from "../../service.js";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "兑换劵",
				Hlicon: "../../static/icon/left_whitch.png",
				subtitle:"我的劵",
				funlist:''
			}
		},
		methods:{
			receive(id){
				/* service.auth(this , service.api.service.get_exchange , 'POST' , {
					couponid:id,
					token:uni.getStorageSync('token')
				} , function(self,res){
					uni.showToast({
						icon:'none',
						title:res.info,
						duration:2000
					});
				}); */
				
				 uni.request({
					url:service.api.service.get_exchange,
					method:"POST",
					data:{
						couponid:id
						// token:uni.getStorageSync('token')
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if(res.code == 1){
							uni.showToast({
								icon: 'none',
								title: res.info
							});
						}else{
							uni.showToast({
								icon: 'none',
								title: res.info,
								duration:2000
							});
						}
					}
				});
				
			},
			jump(desc){
				uni.navigateTo({
					url:'./user_rule?desc='+desc
				})
			}
		},
		onShow() {
			service.auth(this , service.api.service.exchange , 'POST' , {} , function(self,res){
				console.log(res);
				self.funlist = res.data.data
			})
		}
	}
</script>

<style>
	.content{
		padding-left:24upx ;
		padding-right: 24upx;
	}
	.fun_box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 20upx;
		/* justify-content: space-around; */
	}
	.all_box{
		border-radius: 10upx;
		width: 50%;
		
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center; 
			margin-bottom: 20upx;
	}
	.fun_it{
		/* border-radius: 10upx;
		width: 50%; */
	/* 	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		
	}
	.cent_con{
		width: 308upx;
		height: 192upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.cent_bot{
		background: url(../../static/background/conversback.png) no-repeat;
		background-size: cover;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 0 2upx; */
	}
	.bot_left,.bot_right{
		color: #FFFFFF;
		font-size: 16upx;
		transform:scale(0.8);
	}
	.bot_right{
		margin-top: 10upx;
		margin-right: -10upx;
	}
	.leto_text{
		color: #2189FF;
		font-size: 28upx;
		background-color: #FFFFFF;
		width: 40%;
		padding: 5upx 10upx;
		border-radius: 10upx 0 40upx 0;
		text-align: center;
	}
	.fun_botbtn{
		display: flex;
		font-size: 22upx;
		width: 100%;
	}
	.btn_left{
		color: #2189FF;
		background-color: #FFFFFF;
		text-align: center;
		width: 154upx;
		padding: 10upx 0;
		border-radius: 0 0 0 10upx;
	}
	.btn_right{
		color: #FFFFFF;
		background-color:#2189FF;
		text-align: center;
		width: 154upx;
		padding: 10upx 0;
		border-radius: 0 0 10upx 0;
	}
</style>
