<template>
	<view class="user">
		<!--头部-->
		<view class="user-section bg-rf">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view
					class="portrait-box"
					@tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')"
				>
					<image
						class="portrait"
						src="../../nativeplugins/RealIdentity-SdkWX/ios/RPSDK.bundle/images/face_result_icon_ok.png"
					></image>
					<text class="username">登录/注册</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<view class="b-btn" @tap="navTo('/pages/user/account/level')">
					000
				</view>
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					FLY尊享会员
				</view>
				<text class="e-m">FLY 版权所有</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style >
	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;
	}
	.bg {
		position: absolute;
		left: 0;
		top: 0; 
		width: 100vw;
		height: 60vw;
		opacity: 0.84;
	}
	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;
		justify-content: space-between;
	}
	.portrait-box {
		display: flex;
		align-items: center;
	}
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: 36upx;
		color: #666;
		margin-left: 20upx;
	}

	button {
		background-color: transparent;
		font-size: 36upx;
		color: #666;
		border: none;
	}
	button::after {
		border: none;
	}

</style>
