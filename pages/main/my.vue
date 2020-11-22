<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + $mStore.getters.themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view
					class="portrait-box"
					@tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')"
				>
					<image
						class="portrait"
						src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1872962476,134048922&fm=26&gp=0.jpg"
					></image>
					<text class="username">登录/注册</text> 
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<view class="b-btn" @tap="navTo('/pages/user/account/level')">
					普通用户
				</view>
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					尊享会员
				</view>
				<text class="e-m">FLY 版权所有</text>
			</view>
		</view>
			<view class="cover-container"
				:style="[
					{
						transform: coverTransform,
						transition: coverTransition
					}
				]">
				<!-- <image class="arc" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1872962476,134048922&fm=26&gp=0.jpg"></image> -->
				<!--余额 优惠券 积分信息-->
				<view class="promotion-center">
					<list-cell
						icon="iconqianbao"
						:iconColor="$mStore.getters.themeColor.color"
						@eventClick="navTo('/pages/user/account/account')"
						title="我的账户"
					></list-cell>
					<view class="tj-sction">
						<view
							class="tj-item"
							v-for="item in amountList"
							:key="item.title"
							@tap="navTo(item.url)"
						>
							<text class="num" :class="item.value > 0 ? 'text-'+$mStore.getters.themeColor.name : ''">
								{{ item.value }}
							</text>
							<text>{{ item.title }}</text>
						</view>
					</view>
				</view>
				
				<!-- 我的订单 -->
				<view class="promotion-center">
					<list-cell
						icon="iconicon1"
						:iconColor="$mStore.getters.themeColor.color"
						@eventClick="
							navTo(`/pages/order/order?state=-1`)
						"
						title="全部订单"
					></list-cell>
					<view class="order-section">
						<view
							class="order-item"
							v-for="item in orderSectionList"
							:key="item.title"
							@tap="navTo(item.url)"
							hover-class="common-hover"
							:hover-stay-time="50"
						>
							<i class="iconfont" :class="[item.icon, 'text-'+$mStore.getters.themeColor.name]" />
							<text>{{ item.title }}</text>
							<rf-badge
								v-if="item.num > 0"
								type="error"
								size="small"
								class="badge"
								:text="item.num"
							></rf-badge>
						</view>
					</view>
				</view>
				<!-- 浏览历史 -->
				<view class="history-section">
					<list-cell
						icon="iconzuji"
						:iconColor="$mStore.getters.themeColor.color"
						@eventClick="navTo('/pages/user/footprint/footprint')"
						title="我的足迹"
					></list-cell>
					<view v-if="hasLogin">
						<scroll-view scroll-x class="h-list-history" v-if="footPrintList.length > 0">
							<view class="h-item-history" v-for="item in footPrintList" :key="item.id" @tap.stop="navToProduct(item.marketing_type, item.product.id)">
								<image
									:src="item.product.picture"
									class="h-item-img"
									:preview="false"
									mode="aspectFill"
								></image>
								<image
									v-if="item.marketing_type"
									class="tag"
									:src="item.marketing_type | marketingTypeTag"
									mode="aspectFill"
								></image>
								<view class="h-item-text">
									<text class="in2line">{{ item.product.name }}</text>
								</view>
							</view>
						</scroll-view>
						<view
							class="no-foot-print"
							v-else-if="footPrintList.length === 0"
							@tap="navTo('/pages/product/list')"
						>
							<i class="iconfont iconshare no-foot-print-icon" :class="'text-'+$mStore.getters.themeColor.name" />
							先去浏览一些吧~
						</view>
					</view>
					<view
						class="no-foot-print"
						v-else
						@tap="navTo('/pages/user/footprint/footprint')"
					>
						<i class="iconfont iconmima no-foot-print-icon" :class="'text-'+$mStore.getters.themeColor.name" />
						登录后查看
					</view>
				</view>
				<!--我的服务-->
				<view class="promotion-center">
					<list-cell
						icon="iconfuwu"
						:iconColor="$mStore.getters.themeColor.color"
						@eventClick="navTo('/pages/set/set')"
						title="我的服务"
					></list-cell>
					<view class="tj-sction">
						<!-- 分类列表 -->
						<view class="category-list">
							<view
								class="category"
								v-for="(item, index) in settingList"
								:key="index"
								:style="{display: settingItemShowFilter(item.title)}"
								@tap.stop="navTo(item.url)"
							>
								<view v-if="item.title !== '分享'">
									<view class="img">
										<text
											class="iconfont"
											:class="[item.icon, 'text-'+$mStore.getters.themeColor.name]"
										></text>
									</view>
									<view class="text">{{ item.title }}</view>
								</view>
								<button
									class="share-btn"
									open-type="share"
									@tap="share"
									v-else
								>
									<view class="img">
										<text
											class="iconfont"
											:class="[item.icon, 'text-'+$mStore.getters.themeColor.name]"
										></text>
									</view>
									<view class="text">{{ item.title }}</view>
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import listCell from '@/components/rf-list-cell';
	export default {
		components:{listCell},
		data(){
			return{
				settingList: this.$mConstDataConfig.settingList,
				userBg: this.$mAssetsPath.userBg,
				amountList: this.$mConstDataConfig.amountList,
				isOpenLiveStreaming: this.$mSettingConfig.isOpenLiveStreaming,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				orderSectionList: this.$mConstDataConfig.orderSectionList,
				hasLogin: false,
				footPrintList: [], // 足迹列表
			}
		},
		computed: {
		    // 判断推广中心是否显示 当有分销商信息的时候显示
		    settingItemShowFilter() {
		      return function (val) {
		        let type = 'block';
		        if (val === '推广中心' && this.userInfo.promoter) {
		          type = 'none';
		        } else if (val === '直播' && !this.isOpenLiveStreaming) {
		          type = 'none';
		        }
		        return type;
		      };
		    }
		  },
	}
</script>

<style lang="scss" scoped>
page {
	background-color: $page-color-base;
	// font-family: 'PingFang SC';
}
.user {
	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

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

			.portrait-box {
				display: flex;
				align-items: center;

				.portrait {
					width: 130upx;
					height: 130upx;
					border: 5upx solid #fff;
					border-radius: 50%;
				}

				.username {
					font-size: $font-lg + 6upx;
					color: $color-white;
					margin-left: 20upx;
				}

				button {
					background-color: transparent;
					font-size: $font-lg + 6upx;
					color: $font-color-dark;
					border: none;
				}

				button::after {
					border: none;
				}
			}
		}

		.vip-card-box {
			display: flex;
			flex-direction: column;
			color: #f7d680;
			height: 240upx;
			background: url('../../static/vip-card.png');
			background-size: 100% 100%;
			border-radius: 16upx 16upx 0 0;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;
			.b-btn{
				position: absolute;
				right: 24upx;
				top: 24upx;
				width: 132upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(to left, #f9e6af, #ffd465);
				z-index: 1;
			}
			.tit {
				font-size: $font-base + 2upx;
				color: #f7d680;
				margin-bottom: 28upx;
				.iconfont {
					color: #f6e5a3;
					display: inline-block;
					margin-right: 16upx;
				}
			}
		}
	}

	.cover-container {
		margin-top: -150upx;
		padding: 0 30upx 20upx;
		position: relative;
		background-color: $page-color-base;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;
			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;
				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}
					.share-btn {
						height: 113upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.tj-sction {
			@extend %section;
			display: flex;

			.tj-item {
				@extend %flex-center;
				flex: 1;
				flex-direction: column;
				margin: 30upx 0;
				font-size: $font-sm;
				color: #75787d;
				/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
			}

			/*.tj-item:last-child {*/
			/*border-right: none;*/
			/*}*/
			.num {
				font-size: $font-base;
			}

			.red {
				color: $base-color;
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.history-section {
			background: #fff;
			margin-bottom: $spacing-sm;
			.h-list-history {
				margin: 0;
				border-radius: 10upx;
				white-space: nowrap;
				background-color: $page-color-base;
				.h-item-history {
					background-color: $color-white;
					display: inline-block;
					font-size: $font-sm;
					color: $font-color-base;
					width: 180upx;
					margin: $spacing-sm $spacing-sm 0 0;
					border-radius: 10upx;
					position: relative;
					top: 0;
					overflow: hidden;
					.h-item-img {
						width: 180%;
						height: 200upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
					}
					.tag {
						position: absolute;
						border-top-left-radius: 12upx;
						left: 0;
						right: 0;
						width: 60upx;
						height: 60upx;
					}
					.h-item-text {
						font-size: $font-sm;
						margin: $spacing-sm 4upx;
					}
				}
			}
			.no-foot-print {
				text-align: center;
				padding: 48upx 0;
				color:#666;
				.no-foot-print-icon {
					font-size: $font-lg + 2upx;
					margin-right: 10upx;
					vertical-align: middle;
				}
			}
			.share-btn {
				height: 102upx;
				text-align: left;
				background: none;
				padding: 0;
				margin: 0;
			}

			.share-btn:after {
				border: none;
				border-radius: none;
			}
		}
	}
}
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	justify-content: space-around;
	display: flex;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
</style>
