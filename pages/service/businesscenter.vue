<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<!-- - -->
		<block v-if="storeType == 1">
			<view class="title_box">
				<text>{{storeName}}</text>
			</view>
			
			<view class="defail_box">
				<view class="defail_block">
					<view class="block_left">
						<image src="../../static/icon/category.png" mode=""></image>
					</view>
					<view class="block_right">
						<view class="right1">
							<text>店铺类别</text>
						</view>
						<view class="right2">
							<text>{{category}}</text>
						</view>
					</view>
				</view>
				
				<view class="defail_block">
					<view class="block_left">
						<image src="../../static/icon/addressred.png" mode=""></image>
					</view>
					<view class="block_right">
						<view class="right1">
							<text>店铺地址</text>
						</view>
						<view class="right2">
							<text>{{address}}</text>
						</view>
					</view>
				</view>
				
				<view class="defail_block">
					<view class="block_left">
						<image src="../../static/icon/colorphone.png" mode=""></image>
					</view>
					<view class="block_right">
						<view class="right1">
							<text>联系方式</text>
						</view>
						<view class="right2">
							<text>{{contact}}</text>
						</view>
					</view>
				</view>
				
				<view class="defail_block">
					<view class="block_left">
						<image src="../../static/icon/sertime.png" mode=""></image>
					</view>
					<view class="block_right">
						<view class="right1">
							<text>服务期限</text>
						</view>
						<view class="right2">
							<text>{{period}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- - -->
			<view class="bott_box">
				<view class="bott_block" @click="jumpurl('/pages/service/putcode','')">
					<view class="bott_img">
						<image src="../../static/icon/erweima.png" mode=""></image>
					</view>
					<view class="bott_title">
						<text>收券码</text>
					</view>
				</view>
				
				<view class="bott_block" @click="jumpurl('/pages/record/canalrecord','')">
					<view class="bott_img">
						<image src="../../static/icon/youhuiquan.png" mode=""></image>
					</view>
					<view class="bott_title">
						<text>核销记录</text>
					</view>
				</view>
				
				<view class="bott_block" @click="jumpurl('/pages/service/settlement','')">
					<view class="bott_img">
						<image src="../../static/icon/licai.png" mode=""></image>
					</view>
					<view class="bott_title">
						<text>佣金结算</text>
					</view>
				</view>
				
				<view class="bott_block" @click="jumpurl('/pages/service/auditcom','')">
					<view class="bott_img">
						<image src="../../static/icon/lishidingdan.png" mode=""></image>
					</view>
					<view class="bott_title">
						<text>佣金审核</text>
					</view>
				</view>
				
				<view class="bott_block" @click="jumpurl('/pages/service/appointment','')">
					<view class="bott_img">
						<image src="../../static/icon/huoqi.png" mode=""></image>
					</view>
					<view class="bott_title">
						<text>预约列表</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue"
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "商家中心",
				Hlicon: "../../static/icon/left_whitch.png",
				storeName:'',
				storeType:0,
				category:'',
				address:'',
				contact:'',
				period:'',
				merchid:0,
			}
		},
		onShow:function(){
			//获取核销记录
			//#ifdef H5
			service.auth(this, service.api.service.businesscenter, 'GET', '', function(self, res) {
				res = res.data;
				self.storeType = 1;
				self.merchid = res.id;
				self.storeName = res.merchname;
				self.category = res.m_type;
				self.address = res.merch_address;
				self.contact = res.merch_mobile;
				uni.setStorageSync("merchid", res.id);
				self.period = res.time.slice(0,10) + ' 至 ' + res.expired_time.slice(0,10);
			});
			//#endif
			
			//#ifdef APP-PLUS
			service.auth(this, service.api.service.businesscenter, 'GET', '', function(self, res) {
				res = res.data;
				self.storeType = 1;
				self.merchid = res.id;
				self.storeName = res.merchname;
				self.category = res.m_type;
				self.address = res.merch_address;
				self.contact = res.merch_mobile;
				uni.setStorageSync("merchid", res.id);
				self.period = res.time.slice(0,10) + ' 至 ' + res.expired_time.slice(0,10);
			});
				//#endif
		},
		methods:{
			jumpurl(url,type){
				uni.navigateTo({
					url:url
				})
			}
		}
		
	}
</script>

<style>
	.title_box{
		color:#000000;
		font-size: 32upx;
		font-weight: bold;
		height: 100upx;
		line-height: 100upx;
		background-color: #FFFFFF;
		padding: 0 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	.defail_box{
		background-color: #FFFFFF;
	}
	.defail_block{
		display: flex;
		padding: 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	.block_left{
		width: 15%;
		text-align: center;
	}
	.block_left image{
		width: 36upx;
		height: 36upx;
	}
	.block_right{
		width: 85%;
	}
	.right1{
		color: #333333;
		font-size: 26upx;
	}
	.right2{
		color: #666666;
		font-size: 26upx;
	}
	.bott_box{
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 30upx 50upx;
		margin-top: 20upx;
	}
	.bott_block{
		padding: 50upx 0 0;
		width: 25%;
		text-align: center;
	}
	.bott_img image{
		width: 54upx;
		height: 54upx;
	}
	.bott_title{
		font-size: 26upx;
		color: #333333;
		margin-top: 10upx;
	}
</style>
