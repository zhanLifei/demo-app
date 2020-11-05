<template>
	<view class="content">
	<headers :Htitle="Htitle"></headers>
	
	<!-- <view class="address">
		<view class="city" @click="city">
			<text>{{typeName}}</text>
			<image src="../../static/reg/bottom.png" mode=""></image>
		</view>
		
		<view class="search">
			<view class="search-box">
				<image src="../../static/reg/sousuo.png" mode=""></image>
			</view>
			<view class="personal">
				<image src="../../static/reg/geren.png" mode=""></image>
			</view>
		
		</view>
		
	</view> -->
	
	
	
	
	
	</view>
</template>

<script>
		import headers from "../../components/header_nav.vue";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "我要买车",
				showType:false,
				typeName:'广州市'
			}
		},
		onShow:function(){
					uni.showModal({
						title: '温馨提示',
						content: '此功能正在开发中，敬请期待！',
						confirmText: '确认',
						confirmColor: '#FFAE00',
						cancelColor: '#D2D2D2',
						showCancel: false,
						success: function(res) {
							
						}
					});
			
			
		},
		methods: {
			city(){
				
			}
		}
	}
</script>

<style>
.content{
	height: 100%;
	width: 100%;
}
.address{
	height: 100upx;
	line-height: 100upx;
	/* width: 100%; */
	background: #ec8432;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.city{
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 32upx;
	margin-left: 40upx;
}
.city image{
	width:35upx;
	height:35upx;
	margin-left: 10upx;
}
.search{
	display: flex;
	height: 100upx;
	line-height: 100upx;
	margin-top: 25upx;
	/* align-items: center; */
}
.search-box,
.personal {
	width: 50upx;
	height: 50upx;
	margin-right:10upx;
}


	</style>
