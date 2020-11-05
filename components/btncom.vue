<template>
	<view class="bottom_btn " :style="bitstyle" @click="$emit('btns')">
					<text>{{title}}</text>
				</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String
			},
			bitstyle:{
				type:String
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.bottom_btn{
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 30upx auto 0;
	}
</style>
