<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="funtion_box" v-for="(it , i) in funlist" :key = "it.id">
				<view class="fun_top">
					<view class="top_text1">
						<text>{{it.name}}</text>
					</view>
					<view class="top_text2">
						<text>{{it.chebei}}</text>
					</view>
				</view>
				<view class="radi_box">
					<view class="rad1">
						
					</view>
					<view class="bord">
						
					</view>
					<view class="rad2">
						
					</view>
				</view>
					<view class="fun_bott">
						<text>核销日期：</text>
						<text>{{it.time}}</text>
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
				Htitle: "核销记录",
				Hlicon: "../../static/icon/left_whitch.png",
				funlist:[
					{
						id:1,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:2,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:3,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:4,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:5,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:6,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					}
				]
			}
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.funtion_box{
		background-color: #FFFFFF;
		margin: 30upx 0;
		border-radius: 6upx;
	}
	.fun_top{
		display: flex;
		padding: 20upx;
	}
	.top_text1{
		color: #0F82F8;
		font-size: 100upx;
		width: 50%;
		text-align: center;
		font-weight: bold;
	}
	.top_text2{
		width: 50%;
		color: #F99727;
		font-size: 32upx;
		text-align: end;
		vertical-align:bottom
	}
	.top_text2 text{
		display: block;
		margin-top: 100upx;
	}
	.fun_bott{
		color: #999999;
		font-size: 24upx;
	}
	.radi_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
	}
	.rad1{
		width: 10upx;
		height: 20upx;
		background-color: #f4f4f4;
		border-radius: 0 10upx 10upx 0;
	}
	.bord{
		border: 2upx solid #f4f4f4;
		width: 92%;
	}
	.rad2{
		background-color: #f4f4f4;
		width: 10upx;
		height: 20upx;
		border-radius: 10upx 0 0 10upx;
	}
	.fun_bott{
		padding: 20upx 20upx;
	}
</style>
