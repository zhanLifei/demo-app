<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :hstyle="hstyle" :url_le="url_left"></headers>
		<view class="back_img">
			<image :src="poster" mode=""></image>  <!-- ../../static/background/invitefriend2.png -->
		</view>
		<!-- <view class="heaercode">
			<view class="heimag">
				<image :src="avatar" mode=""></image>
			</view>
			<view class="invite_text">
				<view class="" style="color: #FFFFFF;font-size:36upx;">
					{{nickname}}
				</view>
				<view class="" style="color: #FFFFFF;font-size: 28upx;">
					{{share_title}}
				</view>
				<view class="" style="color: #FFFFFF;font-size: 28upx;">
					<text>邀请码：</text>
					<text>{{invite_code}}</text>
				</view>
			</view>
			<view class="qcode_img">
				<image :src="share_icon" mode=""></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import service from "../../service.js";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "邀请好友",
				Hlicon: "../../static/icon/left_whitch.png",
				hstyle:"background:transparent",
				invite_code:'',//邀请码
				share_title:'',////分享标题
				share_icon:'',//分享图标
				share_desc:'',//分享描述
				poster:'',//分享海报
				link:'',//分享链接
				nickname:'',
				avatar:'',
				url_left:"/pages/main/index"
			}
		},
		methods:{
			
		},
		onShow() {
			var member = uni.getStorageSync('member');
			this.invite_code = member.invite_code;
			this.nickname = member.nickname;
			this.avatar = member.avatar;
			service.auth(this, service.api.center.friends , 'GET' , '' , function(self, res){
				console.log(res);
				self.share_title = res.data.share_title;
				self.share_icon = res.data.share_icon;
				self.share_desc = res.data.share_desc;
				self.poster = res.data.poster;
				self.link = res.data.link;
			});
		}
	}
</script>

<style>
	page{
		background-color: transparent;
	}
	.content{
		background-color: transparent;
	}
	.back_img{
		width:100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.heaercode{
		display: flex;
		background-color: transparent;
		padding: 30upx;
		margin-top: 950upx;
		align-items: center;
	}
	.heimag{
		width: 28%;
	}
	.heimag image{
		width: 164upx;
		height: 158upx;
	}
	.invite_text{
		width: 52%;
	}
	.qcode_img{
		width: 157upx;
		height: 162upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
