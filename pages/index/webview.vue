<template>
	<view class="content" @touchstart="hideDrawer"><!--  -->
		<headers  :Hlicon="Hlicon" ></headers>
		<!-- <web-view id="chat" :webview-styles="webviewStyles" :src="url"></web-view> -->
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import headers from '@/components/header_top.vue';
	// import tabbers from '@/components/tabbers.vue';
	export default {
		components: {
			headers,
			// tabbers
		},
		data() {
			return {
				Hlicon: "../../static/icon/left_whitch.png",
				token: uni.getStorageSync('token'),
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				url:uni.getStorageSync('webUrl')
			};
		},
		onShow: function() {
			/* this.url = uni.getStorageSync('config') */
			console.log(uni.getStorageSync('webUrl'))
			
		},
		methods: {
			back(url) {
				uni.reLaunch({
					url: '/pages/main/service',
				});
			},
			hideDrawer(){
				console.log('12321')
			}
		},
		onLoad(){
			
					 //#ifdef H5 
						window.location.href = uni.getStorageSync('webUrl');
					 // #endif 
					 
					// #ifdef APP-PLUS
					// console.log(uni.getSystemInfoSync().screenHeight)
					var webUrl = uni.getStorageSync('webUrl');
					var xx = uni.getSystemInfoSync().screenHeight - 60
					var wv;//计划创建的webview
					wv = plus.webview.create("","custom-webview",{
					       plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
					      'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
					       top:uni.getSystemInfoSync().statusBarHeight+38 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
					        });
							wv.loadURL(webUrl);
							var currentWebview = this.$mp.page.$getAppWebview(); //获取当前页面的webview对象
							currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
							setTimeout(function() {
							            wv = currentWebview.children()[0];
							            wv.setStyle({height:xx })
							        }, 1000); //如果是页面初始化调用时，需要延时一下
					// #endif
			

				}
	}
</script>

<style>
</style>
