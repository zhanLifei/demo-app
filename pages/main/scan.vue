<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="funtion_box" v-for="(it , i) in funlist" :key = "it.id" @click="submit(it.id,it.coupon.money)">
				<view class="fun_top">
					<view class="top_text1">
						<text>{{it.coupon.couponname}}</text>
					</view>
					<view class="top_text2">
						<text>
							{{it.coupon.money}}
							<block v-if="it.coupon.type == 1">车贝</block>
							<block v-else>积分</block>
						</text>
					</view>
				</view>
				<view class="radi_box">
					<view class="rad1">
						
					</view>
					<view class="bord">
						
					</view>
					<view class="rad2">
						
					</view>
				</view>
					<view class="fun_bott">
						<text>核销日期：</text>
						<text>{{it.time}}</text>
					</view>
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			headers
		},
		data() {
			return {
				Htitle: "选择兑换券",
				Hlicon: "../../static/icon/left_whitch.png",
				funlist:[],
				money:0,
				merchid:0,
				type:0,
			}
		},
		onShow:function(){
			var item = uni.getStorageSync('item');
			this.money = item[1];
			this.merchid = item[0];
			service.auth(this , service.api.main.merch_list , 'POST' , {
				id:this.merchid
			} , function(self,res){
				res = res.data.data[0];
				var type = res.type;
				self.type = res.type;
				
				service.auth(self , service.api.service.exchange_log , 'POST' , {
					status:1
				} , function(self,res){
					var list = res.data.data;
					//self.funlist = list;
					for(var i = 0;i < list.length;i++){
						if(list[i].coupon.catid == type){
							self.funlist.push(list[i]);
						}
					}
					if(self.funlist.length == 0){
						uni.showModal({
							title: '温馨提示',
							content: '您的账户暂无兑换券',
							confirmText: '确认',
							confirmColor: '#FFAE00',
							cancelColor: '#D2D2D2',
							showCancel: false,
							success: function(res) {
								uni.switchTab({
									url: '/pages/main/index',
								});
							}
						});
					}
				});
			});
			
		},
        methods: {
			submit(id,money){
				var self = this;
				uni.showModal({
					content: '确认使用此兑换券吗？',
					cancelText: '取消',
					confirmText: '确认',
					confirmColor: '#FFAE00',
					cancelColor: '#D2D2D2',
					success: function(res) {
						if (res.confirm) {
							service.downLoad(self, service.api.main.exchange, {
								'merchid': self.merchid,
								'money':self.money,
								'c_money':money,
								'cid':id,
							},'POST', function(self, res) {
								console.log(res)
								uni.showToast({
									icon: 'none',
									title: res.info
								});
								if(res.code == 1){
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										});
									},1500);
									
								}
							});
						}
					}
				});
				
			}
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.funtion_box{
		background-color: #FFFFFF;
		margin: 30upx 0;
		border-radius: 6upx;
	}
	.fun_top{
		display: flex;
		padding: 20upx;
	}
	.top_text1{
		color: #0F82F8;
		font-size: 100upx;
		width: 50%;
		text-align: center;
		font-weight: bold;
	}
	.top_text2{
		width: 50%;
		color: #F99727;
		font-size: 32upx;
		text-align: end;
		vertical-align:bottom
	}
	.top_text2 text{
		display: block;
		margin-top: 100upx;
	}
	.fun_bott{
		color: #999999;
		font-size: 24upx;
	}
	.radi_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
	}
	.rad1{
		width: 10upx;
		height: 20upx;
		background-color: #f4f4f4;
		border-radius: 0 10upx 10upx 0;
	}
	.bord{
		border: 2upx solid #f4f4f4;
		width: 92%;
	}
	.rad2{
		background-color: #f4f4f4;
		width: 10upx;
		height: 20upx;
		border-radius: 10upx 0 0 10upx;
	}
	.fun_bott{
		padding: 20upx 20upx;
	}
</style>
