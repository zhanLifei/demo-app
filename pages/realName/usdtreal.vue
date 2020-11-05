<template>
	<view class="content">
		
		<headers :Htitle="title" :Hlicon="icon" :url_le="url_left"></headers>
		<view class="write">
			<view class="line"><text>钱包地址:</text><input type="text"  v-model="add"  placeholder="请输入USDT-ERC20钱包地址"></view>
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
				title: '邮箱实名认证',
				icon: '/static/icon/left_whitch.png',
				url_left:'/pages/realName/real_name',
				name:'',
				idnum:'',
				VerifyToken:'',//识别码
				add:''
			}
		},
		onLoad() {
				//初始化、
				sdkwx.initialize();
		},
		methods:{
			obtain(){
				// if(this.add.length == )
			},
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
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
				width: 400upx;
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
