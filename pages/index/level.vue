<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :hstyle="hstyle"></headers>
		<view class="top_background">
			<image src="../../static/background/leveltop.png" mode="widthFix"></image>
		</view>
		<view class="back111"></view>
			<view class="nlevel_block">
				<view class="nlevel1">
					<text style="color: #333333; font-size: 26upx;margin-right: 10upx;">当前贡献值等级</text>
					<text style="color: #F9B84E;font-size: 50upx;">{{user.levelname}} </text>
				</view>
				<view class="nlevel2" @click="jump('/pages/record/levelDateile')">
					<text>当前贡献值:</text>
					<text>{{user.growth}}</text>
				</view>
			</view>
			<view class="level_box" v-for="(it , t) in levelss" :key="t">
				<view class="level_left">
					<view class="level_icon">
						<!-- <image src="../../static/icon/level0_icon.png" mode=""></image> -->
					</view>
					<view class="level_text">
						<text style="color: #333333;font-size: 34upx;font-weight: bold;">{{it.levelname}}</text>
					</view>
				</view>
				<view class="level_right">
					<view class="level_top">
						<text >贡献值：</text>
						<text >{{it.growth}}</text>
					</view>
					<view class="level_bot">
						<text style="color: #708384;font-size: 22upx;margin-right: 10upx;">手续费:</text>
						<text style="color: #F02704;font-size: 22upx;">{{it.service_charge}}</text>
					</view>
				</view>
			</view>
		
	</view>
</template>

<script>
	import headers from "@/components/header_nav.vue"
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "贡献值等级",
				Hlicon: "../../static/icon/left_whitch.png",
				hstyle: "background: transparent;",
				user:'',
				levelname:uni.getStorageSync('member').levelname,
				growth:uni.getStorageSync('member').growth,
				levelss:[
					// {
					// 	id:1,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// },
					// {
					// 	id:2,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// },
					// {
					// 	id:3,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// },
					// {
					// 	id:4,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// },
					// {
					// 	id:5,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// },
					// {
					// 	id:6,
					// 	level:"LV1",
					// 	cons:"注册未实名认证通过的用户",
					// 	psss:"50%",
						
					// }
				]
			}
		},
		methods:{
			jump(url){
				uni.navigateTo({
					url
				})
			}
		},
		onShow() {
			this.$service.auth(this , this.$service.api.index.growthList , 'GET' , {
				page:1,
				limit:15
			},function(self , res){
				console.log(res);
				self.levelss = res.data.list
				self.user = res.data.user
			});
		}
		
	}
</script>

<style>
	.content {
		padding: 450upx 30upx 0;
		/* padding-left: 30upx;
		padding-right: 30upx; */
		background: transparent;
	}
.back111{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color:#f1f3f4 ;
	z-index: -5;
}
	.top_background {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1; 
	}

	
	.nlevel_block{
		display: flex;
		position: fixed;
		top: 250upx;
		width: 92%;
		align-items: center;
		justify-content: space-between;
		z-index: 2;
		background-color: #FFFFFF;
		padding: 50upx 30upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.nlevel1{
		width: 50%;
	}
	.nlevel2{
		width: 50%;
		color: #666666;
		font-size: 24upx;
		text-align: center;
	}
	.nlevel2 text:nth-child(1){
		margin-right: 10upx;
	}
	.level_box{
		display: flex;
		background-color: #FFFFFF;
		padding: 50upx  20upx;
		margin-top: 20upx;
		border-radius: 10upx;
		justify-content: space-between;
	}
	.level_top{
		color: #333333;
		font-size: 24upx;
	}
	.level_icon{
		display: flex;
		align-items: center;
		margin-right: 10upx;
		
	}
	.level_icon image{
		width: 76upx;
		height: 68upx;
	}
	.level_left{
		display: flex;
		width: 40%;
		align-items: center;
	}
	.level_right{
		width: 60%;
		
	}
</style>
