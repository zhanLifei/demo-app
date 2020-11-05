<template>
	<view class="content">
		<header-nav :Htitle='title' :url_le='url_le' :Hlicon='icon'></header-nav>
		<view class="tab">
			<view :class="['inn',current==0? 'active':'']" @click="changeTabs(0)">
				未提交
			</view>
			<view :class="['inn',current==1? 'active':'']" @click="changeTabs(1)">
				审核中
			</view>
			<view :class="['inn',current==2? 'active':'']" @click="changeTabs(2)">
				已通过
			</view>
			<view :class="['inn',current==3? 'active':'']" @click="changeTabs(3)">
				驳回
			</view>
		</view>
		
		<view class="list">
			<view class=""  v-for="(item,index) in list" :key="index">
				<view class="item" v-if="item.status !== 0">
					<view class="img_box">
						<image :src="items" mode="" v-for="(items,indexs) in list[index].apply_fields"  :key="indexs"></image>
					</view>
					<view class="item_sta">
						<view class="sta">
							<view class="status bg1" v-if="item.status ==1">
								审核中
							</view>
							<view class="status bg2"  v-if="item.status ==2">
								已通过
							</view>
							<view class="status bg3"  v-if="item.status ==3">
								驳回
							</view>
							<view class="tim">
								{{item.createtime}}
							</view>
						</view>
					</view>
				</view>
				<view class="" v-else>
					<view class="item">
						<view class="tip_" v-for="(items,indexs) in list[index].apply_fields"  :key="indexs">
							<text class="tip_title">{{items.set_name}}:</text>
							<text class="tip_word">{{items.data}}{{items.data}}</text>
						</view>
						<view class="item_sta">
							<view class="sta">
								<view class="status bg1" @click="jump(`/pages/service/up_post?id=${item.id}`)">
									上传凭证
								</view>
								<view class="tim">
									{{item.createtime}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	import headerNav from '@/components/header_nav.vue'
	export default {
		data() {
			return {
				title: 'POS机首刷',
				icon:'../../static/icon/left_whitch.png',
				url_le:'/pages/main/my',
				current:0,
				loadshow:true,
				page:0,
				pages:1,
				list:[]
				
			}
		},
		methods:{
			
			async loadings(){
				if(this.loadshow){
					var list =await this.$service.loadthepage({
						that:this,
						direct:false,
						url:this.$service.api.service.posLog,
						method:'GET',
						data:{
							status:this.current
						}
					})
					if(list.data.data.data.length == 0){
						uni.showToast({
							title:'暂无数据',
							icon:'none'
						})
						this.loadshow = false;
						return
					}
					this.pages = list.data.data.last_page;
					this.page = list.data.data.current_page;
					this.list = [...this.list,...list.data.data.data]
				}
				
			},
			changeTabs(i){
				this.page = 0;
				this.pages = 1;
				this.loadshow　= true
				this.list = []
				this.current = i;
				this.loadings()
			},
			jump(url){
				uni.navigateTo({
					url
				})
			}
		},
		components:{
			headerNav
		},
		 onShow() {
			this.loadings()
		},
		onReachBottom() {
			// console.log('hfasduighfaseuih');
			if(this.loadshow){
				this.loadings()
			}
		}
	}
</script>

<style lang="scss">

	page {
		background-color: #EFF3F6;
		height: auto;
	}
	.tab{
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		position: fixed;
		.inn{
			flex: 1;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
			
			&.active{
				color: #2189FF;
				border-bottom: 4rpx solid #2189FF;
			}
		}
	}
	
	.list{
		
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		padding-top:100rpx;
		.item{
			margin-top: 20rpx;
			width: 100%;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			.tip_{
				font-size: 30rpx;
				color: #333333;
			}
			.img_box{
				width: 100%;
				display: flex;
				// justify-content: space-around;
				image{
					width: 210rpx;
					height: 210rpx;
					border-radius: 10rpx;
				}
				image:nth-child(2){
					margin: 0 18rpx;
				}
			}
			.item_sta{
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;
				.sta{
					display: flex;
					align-items: center;
				}
				.status{
					margin-right: 22rpx;
					padding: 4rpx 20rpx;
					border-radius: 20rpx;
					font-size: 28rpx;
					color: #FFFFFF;
				}
				.bg1{
					background-color: #FBB35A;
				}
				.bg2{
					background-color: #2189FF;
				}
				.bg3{
					background-color: #999999;
				}
				.tim{
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>
