<template>
	<view class="rf-category">
		<!--顶部搜索导航栏-->
		<view class="input-box">
			<view class="iconfont iconzhuyedefuben"  :class="'text-'+$mStore.getters.themeColor.name" @tap.stop="toHome"></view>
			<input
				@tap.stop="toSearch"
				disabled
				:value="hotSearchDefault || '请输入关键字'"
				style="color:#888;"
				placeholder-style="color:#ccc;"
			/>
			<view class="iconfont iconsousuo2" @tap.stop="toSearch"></view>
		</view>
		
		<view class="category-list" @touchmove.stop.prevent="moveHandle">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view
					class="row"
					v-for="(fItem, fIndex) in categoryList"
					:key="fItem.id"
					:class="[fIndex === showCategoryIndex ? 'on' : '']"
					@tap="showCategory(fIndex)"
				>
					<view class="text">
						<view class="block" :class="'bg-'+$mStore.getters.themeColor.name"></view>
						{{ fItem.title }}
					</view>
				</view>
			</scroll-view>
			<!--右侧子导航-->
			<scroll-view scroll-y="true" class="right">
				<view
					v-for="(fItem, fIndex) in categoryList"
					:key="fItem.id"
				>
					<view
						v-if="fIndex === showCategoryIndex"
						class="category">
						<view
							v-if="cateTop && cateTop.cover"
							class="banner"
							@tap="indexTopToDetailPage(cateTop)"
						>
							<image :src="cateTop && cateTop.cover" mode="aspectFill" />
						</view>
						<view
							class="box"
							v-for="sItem in fItem.child"
							:key="sItem.id"
						>
							<view class="second-category-text" @tap="navTo(`/pages/product/list?cate_id=${sItem.id}`)">
								{{ sItem.title }}
								<text class="iconfont iconyou"></text>
							</view>
							<view class="list" v-if="sItem.child && sItem.child.length > 0">
								<view
									class="box"
									v-for="tItem in sItem.child"
									:key="tItem.id"
									@tap.stop="navTo(`/pages/product/list?cate_id=${tItem.id}`)"
								>
									<block v-if="styleCateType === 'one_two_three_cover'">
										<image :src="tItem.cover || errorImage"></image>
										<view class="text">{{ tItem.title }}</view>
									</block>
									<text class="category-tag in1line" v-if="styleCateType === 'one_two_three_text'">
										{{ tItem.title }}
									</text>
								</view>
							</view>
							<view v-else class="no-data">
								<i class="iconfont icon404"></i>
								暂无子分类
							</view>
					</view>
						<view class="no-data" v-if="fItem.child.length === 0">
							<i class="iconfont icon404"></i>
							暂无分类
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				hotSearchDefault:'请输入关键字',
				errorImage: this.$mAssetsPath.errorImage,
				categoryList:[
					{
						id:1,
						title:'西瓜',
						child:[
							{
								id:11,
								title:'西瓜',
								child:[
									{
										id:111,
										title:'西瓜',
										cover:'../../static/kj.png'
									},
									{
										id:112,
										title:'西瓜',
										cover:'../../static/kj.png'
									},
									{
										id:113,
										title:'西瓜',
										cover:'../../static/kj.png'
									},
									{
										id:114,
										title:'西瓜',
										cover:'../../static/kj.png'
									},
									{
										id:115,
										title:'西瓜',
										cover:'../../static/kj.png'
									}
								]
							}
						]
					},
					{
						id:2,
						title:'苹果',
						child:[]
					},
					{
						id:3,
						title:'雪梨',
						child:[]
					}
				],
				showCategoryIndex: 0, // 一级菜单高亮显示序号
				styleCateType: this.$mSettingConfig.styleCateType,
				cateTop: {}, // 分类通用广告图
			}
		},
		methods:{
			moveHandle() {},
			// 跳转至搜索详情页
			toSearch() {
				this.$mRouter.push({
					route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`
				});
			},
			// 分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(item) {
				this.$mHelper.handleBannerNavTo(item.jump_type, item.jump_link, item.id);
			},
		}
	}
</script>

<style lang="scss">
page {
	background-color: $color-white;
}
.rf-category {
	background-color: $color-white;
	/*  #ifdef  APP-PLUS  */
	margin-top: calc(20upx + var(--status-bar-height));
	/*  #endif  */
	// 搜索框
	.input-box {
		height: 60upx;
		position: relative;
		display: flex;
		align-items: center;
		margin: 10upx 20upx;
		.iconfont {
			width: 60upx;
			font-size: 48upx;
			font-weight: 500;
		}
		.iconsousuo2 {
			z-index: 999;
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			flex: 1;
			height: 60upx;
			background-color: #f5f5f5;
			padding-left: 28upx;
			border-radius: 30upx;
			color: #888;
			font-size: 28upx;
		}
	}
	/*模块分类*/
	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,
		.right {
			position: absolute;
			top: 80upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(80upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: $page-color-base;
			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;
					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block {
							width: 6upx;
							height: 120%;
							left: 10upx;
						}
					}
				}
			}
		}
		.right {
			width: 76%;
			left: 24%;
			background-color: #fff;
			.second-category {
				z-index: 10;
				white-space: nowrap;
				width: 100%;
				margin: $spacing-sm $spacing-sm $spacing-base;
				.second-category-tag {
					margin-right: $spacing-base;
					padding: 5upx $spacing-lg;
					display: inline-block;
					border-radius: 8upx;
					font-size: $font-sm + 2upx;
				}
				.second-category-normal {
					color: $font-color-dark;
					border: none;
					background-color: $page-color-light;
				}
			}
			.category {
				width: 100%;
				padding: 0 15upx $spacing-base;
				.banner {
					width: 96%;
					margin: 10upx auto 30upx;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);
					image {
						width: 100%;
						height: 24.262vw;
					}
				}
				.order-by-wrapper {
					height: 48upx;
					line-height: 48upx;
					display: flex;
					justify-content: space-between;
					margin: $spacing-sm 0;
					font-size: $font-sm + 2upx;
					.order-by {
						display: flex;
						justify-content: center;
						align-items: center;
						.order-by-item {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: $font-sm + 2upx;
							margin: 0 $spacing-base 0 $spacing-sm;
							color: $font-color-light;
							.iconfont-group {
								margin-top: -2upx;
							}
							.iconfont {
								height: 16upx;
								line-height: 16upx;
								display: block;
								margin-left: 6upx;
								font-weight: 550;
								font-size: $font-sm - 4upx;
							}
						}
					}
				}
				.list {
					margin-top: $spacing-base;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box {
						width: calc(71.44vw / 3);
						margin-bottom: $spacing-lg;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image {
							width: 64%;
							height: calc(71.44vw / 3 * 0.64);
						}
						.text {
							margin-top: 8upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
						.category-tag {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: $spacing-sm;
							font-size: $font-sm + 2upx;
							margin-right: $spacing-base;
							color: $font-color-dark;
							background-color: $page-color-base;
							border-radius: 6upx;
						}
					}
				}
				.second-category-text {
					display: flex;
					justify-content: space-between;
				}
				.no-data {
					margin: 48upx 0;
					color: $font-color-light;
					display: flex;
					justify-content: center;
					align-items: center;

					.iconfont {
						margin-right: 20upx;
						font-size: $font-lg + 16upx;
					}
				}
			}
		}
	}
}
</style>
