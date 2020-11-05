<template>
	<view>
		<view class="content" @touchstart="hideDrawer"><!--  -->
			<web-view :webview-styles="webviewStyles" :src="url"></web-view>
		</view>
	</view>
</template>
<script>
	import copy from'@/components/ican-H5Api.js';
	export default {
		data() {
			return {
				webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url:'https://ffapp.nethhw.com/app.php/MTIy'
			};
		},
		onShow: function() {
			uni.setNavigationBarTitle({
				title: '车聚利APP下载'
			});
			
			var self = this;
			switch(uni.getSystemInfoSync().platform){
				case 'ios'://苹果系统
					uni.showModal({
						title: '温馨提示',
						content: '请复制地址去往 Safari 打开！',
						confirmText: '复制',
						cancelText: '取消',
						confirmColor: '#FFAE00',
						cancelColor: '#D2D2D2',
						success: function(res) {
							if (res.confirm) {
								uni.setClipboardData({
								    data: self.url,
								    success: function(res) {
										uni.showToast({
											icon: 'none',
											title: '复制成功'
										});
										setTimeout(function(){
											uni.reLaunch({
												url:"/pages/reg/reg"
											})
										},1500);
								    }
								});
							} else if (res.cancel) {
								uni.reLaunch({
									url:"/pages/reg/reg"
								})
							}
						}
					});
					break;
				default://其他系统
					
					break;
			}
		}
	}
</script>
