<template>
	<view class="notify">
		<view class="notify-list" v-if="notifyList.length > 0">
			<view class="read" :class="'text-'+$mStore.getters.themeColor.name">
				<text>全部清空</text>
				<text>全部已读</text>
			</view>
			<view v-for="(item, index) in notifyList" :key="index" class="row" @tap="navTo(item)">
				<!-- 删除按钮 -->
				<view class="menu" :class="'bg-'+$mStore.getters.themeColor.name" @tap.stop="handleClearNotify(item.notify_id)">
					<i class="iconfont iconiconfontshanchu1"></i>
				</view>
				<!-- 商品 -->
				<view
					class="carrier"
					:class="[
						theIndex === index ? 'open' : oldIndex === index ? 'close' : ''
					]"
					@touchstart="touchStart(index, $event)"
					@touchmove="touchMove(index, $event)"
					@touchend="touchEnd(index, $event)"
				>
					<view class="notify-wrapper">
						<view class="title in1line">{{item.notify.title}}</view>
						<view class="content in2line">{{item.notify.content}}</view>
						<view class="time">{{item.created_at | time}}</view>
						<uni-tag
								class="type"
								type="error"
								:text="item.type | notifyTypeFilter"
								size="small"
								/>
						<view class="un-read" :class="'bg-'+$mStore.getters.themeColor.name" v-if="item.is_read.toString() === '0'"></view>
					</view>
				</view>
				<!-- <rf-load-more v-if="notifyList.length > 0" :status="loadingType" /> -->
			</view>
		</view>
		<!--消息为空-->
		<rf-empty
			:bottom="bottom"
			info="您还没有推送消息"
			v-if="notifyList.length === 0 && hasLogin"
		></rf-empty>
		<view v-if="!hasLogin" class="notify-empty">
			<text class="iconfont iconxiaoxi-" :class="'text-'+$mStore.getters.themeColor.name"></text>
			<view class="empty-tips">
				暂未登录
				<view class="navigator" :class="'text-'+$mStore.getters.themeColor.name" @tap="navToLogin('/pages/public/logintype')"
					>登录/注册 ></view
				>
			</view>
		</view>
	</view>
</template>

<script>
import moment from '@/common/moment';
import mConstDataConfig from '@/config/constData.config';
import uniTag from	'@/components/uni-tag/uni-tag.vue'
export default {
  components: { uniTag },
	data() {
		return {
			notifyList: [
				// {
				// 	notify_id:'1',
				// 	type:'1',
				// 	is_read:'3',
				// 	created_at:'1606001553',
				// 	notify:{
				// 		title:'飞飞，你是不是不认真写代码了！'
				// 	}
				// },
				// {
				// 	notify_id:'1',
				// 	type:'2',
				// 	is_read:'3',
				// 	created_at:'1606001553',
				// 	notify:{
				// 		title:'慧慧，你是不是不认真跳舞了！'
				// 	}
				// },
				// {
				// 	notify_id:'1',
				// 	type:'3',
				// 	is_read:'3',
				// 	created_at:'1606001553',
				// 	notify:{
				// 		title:'慧慧，你是不是又不减肥了！'
				// 	}
				// }
			],
			logo: this.$mSettingConfig.appLogo,
			loadingType: 'more',
			page: 1,
			hasLogin: true,
			list: [
				{ title: '评论', logo: this.$mSettingConfig.appLogo },
				{ title: '粉丝', logo: this.$mSettingConfig.appLogo },
				{ title: '点赞', logo: this.$mSettingConfig.appLogo }
			],
			// 控制滑动效果
			theIndex: null,
			oldIndex: null
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		notifyTypeFilter(val) {
			console.log(val)
			return mConstDataConfig.notifyTypeList[val].content;
		}
	},
	computed: {
		bottom () {
			let bottom = 0;
			/*  #ifdef H5  */
		bottom = 90;
			/*  #endif */
			return bottom;
		}
	},
}
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}
.notify {
	.header {
		width: 100%;
		padding-left: $font-lg;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title {
			font-size: 36upx;
		}
	}
	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.notify-list {
		.read {
			text-align: right;
			margin-right: $spacing-base;
			margin-top: $spacing-base;
			margin-bottom: $spacing-sm;
			text {
				margin-left: $spacing-base;
			}
		}
		.row {
			width: calc(94%);
			height: calc(22vw + 40upx);
			margin: 0 auto $spacing-base;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu {
				.iconfont {
					color: #fff;
					font-size: 60upx;
				}
				position: absolute;
				width: 29%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				z-index: 2;
			}
			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-30%);
					}
				}
				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}
					100% {
						transform: translateX(0);
					}
				}
				&.open {
					animation: showMenu 0.25s linear both;
				}
				&.close {
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;
			}
		}
		.notify-wrapper {
			background-color: $color-white;
			width: 100%;
			padding: $spacing-base $spacing-lg $spacing-base 80upx;
			margin: $spacing-base 0 0;
			border-radius: 15upx;
			position: relative;
			.title {
				font-size: $font-lg;
				color: $font-color-dark;
				font-weight: 500;
				margin: 0 0 $spacing-sm;
			}
			.content {
				font-size: $font-sm;
				color: $font-color-base;
				height: 75upx;
				line-height: 36upx;
			}
			.time {
				font-size: $font-base;
				color: $font-color-light;
			}
			.type {
				position: absolute;
				top: 26upx;
				left: -10upx;
				border: none;
				font-size: $font-sm;
				opacity: 0.8;
			}
			.un-read {
				display: inline-block;
				width: 12upx;
				height: 12upx;
				border-radius: 50%;
				position: absolute;
				top: 32upx;
				right: 30upx;
			}
		}
	}
	.notify-empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;
		.iconfont {
			font-size: $font-lg + 100upx;
		}

		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;

			.navigator {
				margin-left: 16upx;
			}
		}
	}
}
</style>
