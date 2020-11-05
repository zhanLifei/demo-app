<!-- 
展示屏幕文字滚动效果
 
使用方法：

 -->
<!-- 
展示屏幕文字滚动效果

usage:
 list:数组数据
 @getCurrentIndex  获取当前swiper的下标
 <textscroll :list="list" @getCurrentIndex="getIndex"/>

 -->

<template>
	<view class="_notice">
		<swiper class="_swiper tc" @change="slideChange" indicator-dots="false" autoplay="true" :interval="interval" circular="true" display-multiple-items="2" :duration="duration" disable-touch="false">
			<!-- <swiper-item>
				<view class="swiper-item uni-bg-red"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-red"></view>
			</swiper-item> -->
			<swiper-item class="widthsw" v-for="(item,index) in list" :key="index" @click="lookDeail(item)">
				<view class="swiper-item uni-bg-red xx" >{{item.content}}</view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	export default {
		props: {
			//显示数据
			list: {
				type: Array,
				defual:function(){
					return [];
				}
			},
		},
		data() {
			return {
				interval:3000,
				duration:12000,
			};
		},
		methods:{
			slideChange(e){
				this.$emit('getCurrentIndex',e.detail.current); 
			},
			lookDeail(e){
				this.$emit('lookDeail' , e);
			}
			
		}

	};
</script>

<style lang="scss">
	._notice {
		/* position: fixed;
		left: 0;
		top: 0; */
		/* #ifdef H5 */
		/* top: 88upx; */
		/* #endif */
		// z-index: 9;
		// width: 100%;
		// background: rgba(72, 1, 1, 0.3);
		font-size: 20upx;
		height: 38upx;
		color: #333333;
		border-radius: 6upx;
		overflow: hidden;
		box-sizing: border-box;
		// width: 10000upx !important;
	}
	.xx{
		// margin-right: 90upx;
		// width: 200%;
	}
	._swiper {
		line-height: 40upx;
		width: 1000upx !important;
	}
	.widthsw{
		// width: 200%;
		width: auto!important;
		padding-right: 90upx;
	}
</style>
