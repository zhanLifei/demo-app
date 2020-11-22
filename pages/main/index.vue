<template>
	<view class="content rf-index">
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
		
		<view :style="{paddingTop: merchantShow ? (isOpenIndexCate ? 134 + statusBar + 'px' : 85 + statusBar + 'px' )  : (isOpenIndexCate ? 98 + statusBar + 'px' : 55 + statusBar + 'px' )}">
			<!-- 轮播图 -->
			<view class="swiper">
				<view class="swiper-box">
					<rf-swipe-dot
						:info="swipers"
						mode="round"
						:current="current"
						field="title"
					>
						<swiper @change="handleDotChange" autoplay="true">
							<swiper-item
								v-for="(item, index) in swipers"
								@tap="indexTopToDetailPage(item)"
								:key="index"
							>
								<view class="swiper-item">
									<image :src="item.img" mode="aspectFill" />
								</view>
							</swiper-item>
						</swiper>
					</rf-swipe-dot>
					
				</view>
			</view>
			<!-- 分类列表 -->
			<swiper
				indicator-active-color="#ff10125"
				indicator-color="#666"
				:indicator-dots="productCateList.length > 10"
				:style="{height: productCateList.length <= 5 ? '200rpx' : '400rpx'}"
				class="category-list-wrapper"
				v-if="productCateList.length > 0">
				<swiper-item
					class="category-list"
					v-for="(fItem, fIndex) in swipeCateList"
					:key="fIndex"
				>
					<view
						class="category"
						v-for="(sItem, sIndex) in fItem" :key="sIndex" @tap.stop="navToCategory(sItem.id)">
						<view class="img">
							<image :src="sItem.cover || errorImage" mode="aspectFill"></image>
						</view>
						<view class="text in1line">{{ sItem.title}}</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- 爆款推荐 -->
			<view class="hot-recommend">
				<view class="left">
					<image class="hot-recommend-image" src="../../static/kj.png"></image>
				</view>
				<view class="right">
					<image class="hot-recommend-image" src="../../static/tg.png"></image>
					<image class="hot-recommend-image" src="../../static/zk.png"></image>
				</view>
			</view>
			<!--新品上市-->
			<rf-floor-index
				icon="iconxinpin2"
				:list="newProductList"
				:header="{ title: '新品上市', desc: 'New Products Listed' }"
				@detail="navToDetailPage"
				:banner="carouselList.index_new && carouselList.index_new[0]"
			/>
		</view>
	</view>
</template>

<script>
	import { indexList, productList } from '@/api/product';
	import rfSearchBar from '@/components/rf-search-bar';
	import rfSwipeDot from '@/components/rf-swipe-dot';
	import rfFloorIndex from '@/components/rf-floor-index';
	import service from "../../service.js";
	export default {
		components:{rfSearchBar,rfSwipeDot,rfFloorIndex},
		data() {
			return {
				current: 0, // 轮播图index 
				categoryList: [], // 分类列表
				hotSearchDefault: '请输入关键字',
				swipers: [{src: '../../static/index/banner.png'}],
				merchantData: {},
				merchantShow: false,
				isOpenIndexCate: this.$mSettingConfig.isOpenIndexCate,
				productCateList: [], // 商品栏目
				errorImage: this.$mAssetsPath.errorImage,
				newProductList: [], // 新品上市商品列表
				carouselList: {}, // 广告图
			}
		},
		computed:{
			statusBar () {
				const e = uni.getSystemInfoSync();
				return e.statusBarHeight;
			},
			swipeCateList() {
				const list = this.productCateList;
				let result = [];
				for (let i = 0, len = list.length; i < len; i += 10) {
					result.push(list.slice(i, i + 10));
				}
				return result;
			}
		},
		methods: {
			tabClick:function(){},
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current;
			},
			// 跳转至商品详情页
			navToDetailPage(data) {},
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
				url: `http://demo.rageframe.com/api${indexList}`, 
				method: 'GET',
				success: res => {
					console.log(res)
					this.categoryList = res.data.data.cate
					this.productCateList = res.data.data.cate;
					this.categoryList = [{ id: 0, title: '首页' }, ...this.productCateList];
					this.newProductList = res.data.data.product_new;
					this.carouselList = res.data.data.adv;
				}
			});
		}

	}
</script>

<style lang="scss">
page {
	background-color: #f1f7fc;
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 0;
		overflow: auto;
		/*轮播图*/
		.swiper {
			width: 100%;
			margin-bottom: 20upx;
			display: flex;
			justify-content: center;
			.swiper-box {
				width: 92%;
				height: 40vw;
				overflow: hidden;
				border-radius: 15upx;
				box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
				//兼容ios，微信小程序
				position: relative;
				z-index: 1;
				swiper {
					width: 100%;
					height: 40vw;
					swiper-item {
						image {
							width: 100%;
							height: 40vw;
						}
					}
				}
			}
		}
		/*分类列表*/
		.category-list-wrapper {
			.category-list {
				width: 100%;
				padding: $spacing-base;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.category {
					margin-top: 10upx;
					width: calc(20% - 20upx);
					height: 132upx;
					display: flex;
					text-align: center;
					flex-wrap: wrap;
					.img {
						width: 100%;
						display: flex;
						justify-content: center;
						image {
							width: 12vw;
							height: 12vw;
							border-radius: 50%;
						}
					}
					.text {
						margin-top: 16upx;
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}
				}
			}
		}
		/* 爆款推荐 */
		.hot-recommend {
			background-color: $color-white;
			display: flex;
			padding: $spacing-base $spacing-lg 0;
			.hot-recommend-image {
				width: 100%;
				height: 100%;
			}
			.left {
				flex: 3;
				height: 350upx;
				margin-right: 15upx;
			}
			.right {
				flex: 4;
				.hot-recommend-image {
					height: 170upx;
				}
			}
		}
	}
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
