<template>
	<view class="rf-index">
		<!--搜索导航栏-->
		<rf-search-bar
			@search="navToSearch"
			title="扫一扫"
			icon="iconsaomiao"
			@tab="tabClick"
			:categoryList="categoryList"
			:merchantData="merchantData"
			:placeholder="hotSearchDefault"
		/>
		<!-- <view class="swiper">
			<swiper class="swiperss" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item , index) in swipers" :key="index">
					<view class="swiper-item">
						<image @click="tiaoz(item.url)" :src="item.img" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
	</view>
</template>

<script>
	import { indexList, productList } from '@/api/product';
	import rfSearchBar from '@/components/rf-search-bar';
	import service from "../../service.js";
	export default {
		components:{rfSearchBar},
		data() {
			return {
				categoryList: [], // 分类列表
				hotSearchDefault: '请输入关键字',
				swipers: [{src: '../../static/index/banner.png'}],
				merchantData: {}
			}
		},
		
		methods: {
			tabClick:function(){},
		},
		onLoad(e){
			console.log(this.$mStore)
			var self = this;
			if(uni.getStorageSync('tan') == 1){
				// 公告接口		
				service.auth(this , service.api.service.notice , 'GET' , '' , function(self , res){
					console.log(res,"66666");
					uni.getStorageSync('tan', 0);
					if(res.code == 1){
						self.detail = res.data.detail
						self.title = res.data.title
						if(res.data == null ){
							self.str = false
						}else{
								self.str = true;
							}
					}
				});
			}
		},
		onShow() {
			var self = this;
			/*----首页轮播图----*/
			service.auth(this, service.api.index.getSlide, 'GET', '', function(self, res) {
				self.swipers = res.data;
			})
			
			uni.request({
				url: `http://h5.tinyshop.rageframe.com${productList}`, 
				method: 'GET',
				success: res => {
					console.log(res)
				}
			});
		}

	}
</script>

<style>
	page {
		background-color: #f1f7fc;
	}

	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 0;
		overflow: auto;
		
	}
	.swiperss {
		width: 100%;
		height: 440upx;
	}
	.swiper {
		position: relative;
	}

	.swiper-item image {
		width: 100%;
		/* height: 659upx; */
	}
</style>
