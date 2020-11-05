<template>
	<view class="content">
		<!--<headers :hstyle="hstyle" :Hlicon="Hlicon"  :Htitle="Htitle" ></headers> :Hricon="Hricon" -->
		<view class="user_data">
		<view class="user">
			<view class="user_pic">
				<image :src="CityData.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_name">
				{{CityData.user.nickname}}
			</view>
			<view class="user_city">
				{{CityData.city.city}}城主
			</view>
			<view class="user_time">
				有效期：{{CityData.city.create_time}}至{{CityData.city.expire_time}}
			</view>
		</view>
		<view class="dividend">
			<view class="dividend_li">
				<text>{{CityData.city.bonus}}%</text>
				<text>车贝回报率</text>
			</view>
			<view class="dividend_li">
				<text>{{CityData.city.deal_bonus}}%</text>
				<text>积分回报率</text>
			</view>
		</view>
	</view>
	<view class="balance">
		<view class="balance_li">
			<text>{{CityData.yesterday_wti}}</text>
			<text>昨日车贝分红</text>
		</view>
		<view class="balance_li">
			<text>{{CityData.yesterday_integral}}</text>
			<text>昨日积分分红</text>
		</view>
		<view class="balance_li">
			<text>{{CityData.city_member}}</text>
			<text>城市注册人数</text>
		</view>
		<view class="balance_li">
			<text>{{CityData.city_real_member}}</text>
			<text>城市实名人数</text>
		</view>
	</view>
	</view>
	
</template>

<script>
	import headers from "../components/header_nav.vue";
	export default{
		components:{
			headers
		},
		props:{
			CityData:{
				
			}
		},
		data(){
			return{
				//Htitle: "城市大厅",
				//Hlicon: "../../static/icon/left_whitch.png",
				// hstyle:"background:transparent;",
				star:'',
				end:'',
			}
		},
		methods:{
			
		},
		onShow() {
			console.log(this.CityData , "citydata")
			var create_time = this.CityData.city.create_time;
			var expire_time = this.CityData.city.expire_time;
			this.star = create_time.substr(0,11);
			this.end = expire_time.substr(0,11);
		}
	}
</script>

<style>
	page{
		background: #F4F4F4 !important;
	}
	.content{
		width: 100%;
		min-height: 440rpx;
		background: url(../static/background/bg_top.png) no-repeat;
		background-size: 100% 440rpx;
		background-position: top;
		background-color: #FFFFFF;
		overflow: auto;
		/* padding-top: 0; */
	}
	.bg{
		width: 100%;
		
	}
	.bg image{
		width: 100%;
		height: 440rpx;
	}
	.user_data{
		width: 100%;
	}
	.user{
		width: 100%;
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		/* border-bottom: 20rpx solid #F4F4F4; */
	}
	.user_pic{
		width: 140rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		overflow: hidden;
		border: 20rpx solid rgba(255,255,255,.1);
	}.user_pic image{
		width: 100%;
		height: 100%;
	}
	.user_name{
		font-size: 32rpx;
		color: #000000;
		font-weight: bold;
	}
	.user_city{
		font-size: 26rpx;
		color: #666666;
	}
	.user_time{
		font-size: 24rpx;
		color: #666666;
	}
	.user view{
		margin: 10rpx 0;
	}
	.dividend{
		width: 100%;
		box-sizing: border-box;
		padding: 18rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dividend_li{
		width: calc(50% - 4rpx);
		height: 150rpx;
		color: #2189FF;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}.dividend_li:first-of-type{
		border-right: 4rpx solid #F2F2F2;
	}
	.dividend_li text:first-of-type{
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.balance{
		width: 100%;
		/* margin-top: 20rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		border-top: 20rpx solid #F4F4F4;
		background: #FFFFFF;
	}
	.balance_li{
		width: calc(50% - 4rpx);
		height: 180rpx;
		color: #666666;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-bottom: 4rpx solid #F4F4F4;
	}
	.balance_li:nth-of-type(odd){
		border-right: 4rpx solid #F4F4F4;
	}
	.balance_li text:first-of-type{
		font-size: 36rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
</style>
