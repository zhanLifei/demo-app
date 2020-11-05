<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="code_box">
			<view class="code-title">
				申请佣金结算
			</view>
			
			<view class="code-number">
				结算券张数：{{number}}
			</view>
			
			<view class="code-text">
				本次申请提交结算为上月佣金结算<br />
				申请，提交后在佣金审核关注进度。
			</view>
		</view>
		
		<view class="bottom">
			<view class="btn" @click="out">取消</view>
			<view class="btn2"v-if="type == 1" @click="submit">确认</view>
			<view class="btn2" v-else @click="mistake">确认</view>
		</view>
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
				Htitle: "申请结算",
				Hlicon: "../../static/icon/left_whitch.png",
				merchid:uni.getStorageSync("merchid"),
				number:0,
				status:1,
				type:0,
				error:'',
			}
		},
		onShow:function(){
			//可结算数据
			service.downLoad(this, service.api.service.settlement, {
				'merch_id': this.merchid
			},'GET', function(self, res) {
				if(res.code == 1){
					self.type = 1;
					self.number = res;
				}else{
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					self.error = res.info;
				}
				
			});
		},
		methods:{
			submit(){
				var self = this;
				if(self.number == 0){
					uni.showToast({
						icon: 'none',
						title: '结算券数量小于1，无法申请结算'
					});
					return;
				}
				service.downLoad(self, service.api.service.potcode, {
					'merch_id': self.merchid
				},'POST', function(self, res) {
					res = res.data;
					console.log(res)
					if(res.code == 1){
						self.qrcode = res.info;
						self.status = 0;
						self.out();
					}else{
						uni.showToast({
							icon: 'none',
							title: res.info
						});
					}
				});
			},
			out(){
				uni.navigateBack({
					delta:1
				})
			},
			mistake(){
				uni.showToast({
					icon: 'none',
					title: this.error
				});
			},
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.code_box{
		background-color: #FFFFFF;
		padding: 30upx;
		margin-top: 30upx;
	}
	.code-title{
		padding: 30upx 0;
		color: #333333;
		font-size: 32upx;
		text-align: center;
	}
	.code-number{
		padding: 20upx 0;
		color: #000000;
		font-size: 36upx;
		font-weight: bold;
		text-align: center;
	}
	.code-text{
		padding: 20upx 0;
		color: #808080;
		font-size: 28upx;
		text-align: center;
	}
	.bottom{
		color: #7f7f7f;
		display: flex;
		background: #d7d7d7;
		font-size: 36upx;
		width: 70%;
		text-align: center;
		/* padding: 20upx 70upx; */
		border-radius: 10upx;
		margin: 90upx auto 40upx;
	}
	.btn,.btn2{
		width: 50%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}
	.btn2{
		color: #FFFFFF;
		background: #2089ff;
		border-radius: 0 10upx 10upx 0;
	}
</style>
