<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :subtitle="subtitle"></headers>
		<view class="fun_box">
			<view class="all_box" v-for="(it , i) in funlist" :key="it.id">
				
		<view class="fun_it" >
			<view class="cent_con"  :style="'background:url(' + it.back + ') no-repeat' + '; background-size: cover;'">
				<view class="leto_text">
					<text>洗车劵</text>
				</view>
				<view class="cent_bot">
					<view class="bot_left">
						<text style="font-size: 36upx; font-weight: bold;">{{it.nem}}</text>
						<text>车贝</text>
					</view>
					<view class="bot_right">
						<text>•使用有效期:</text>
						<text>{{it.time}}</text>
					</view>
				</view>
			</view>
			<view class="fun_botbtn">
				<view class="btn_left">
					<text>使用规则</text>
				</view>
				<view class="btn_right">
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
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "兑换劵",
				Hlicon: "../../static/icon/left_whitch.png",
				subtitle:"我的劵",
				funlist:[
					{
						id:1,
						nem:7,
						time:"30天",
						back:"../../static/img/conversimg.png"
					},
					{
						id:2,
						nem:7,
						time:"30天",
						back:"../../static/img/conversimg2.png"
					},
					{
						id:3,
						nem:7,
						time:"30天",
						back:"../../static/img/conversimg3.png"
					},
					{
						id:4,
						nem:7,
						time:"30天",
						back:"../../static/img/conversimg4.png"
					},
					{
						id:5,
						nem:7,
						time:"30天",
						back:"../../static/img/conversimg5.png"
					},
					
				]
			}
		},
		methods:{
			
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
		padding: 0 10upx;
	}
	.bot_left,.bot_right{
		color: #FFFFFF;
		font-size: 22upx;
	}
	.bot_right{
		margin-top: 10upx;
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
