<template>
	<view class="content">
		<headers :Hlicon="Hlicon" :Htitle="Htitle" :url_le="url_left"></headers>
		<view class="pirnum">
			<text style="color: #666666; font-size: 28upx;">申请救济金额：</text>
			<input type="number" v-model="price" value="" />
			<!-- <text style="color: #333333; font-size: 32upx; font-weight: bold;">25690.00</text> -->
		</view>
		<view class="explain">
			<view class="explain_title">
				<text style="color: #666666; font-size: 28upx;">申请说明：</text>
			</view>
			<textarea v-model="content" style="color: #999999; font-size: 22upx;margin-top: 15upx;" value="" placeholder="请填写你此次申请的原因" />
			</view>
			
		<view class="uploadBox">
		<view class="uploadimg">
			<view class="imag_block" v-if="thumb != ''">
				<image :src="thumb" mode=""></image>
				<view class="close" @click="close(thumb , 1)">
					<image src="../../static/icon/closeimg.png" mode=""></image>
				</view>
			</view>
			<view class="add_block" @click="uploadimg(1)" v-else>
				<view class="add_icon">+</view>
				<view class="text_file" style="color: #999999; font-size: 22upx;">上传发票及交通判决书</view>
			</view>
		</view>
		<view class="uploadimg" v-if="thumb != ''">
			<view class="imag_block" v-if="thumb2 != ''">
				<image :src="thumb2" mode=""></image>
				<view class="close" @click="close(thumb2 , 2)">
					<image src="../../static/icon/closeimg.png" mode=""></image>
				</view>
			</view>
			<view class="add_block" @click="uploadimg(2)" v-else>
				<view class="add_icon">+</view>
				<view class="text_file" style="color: #999999; font-size: 22upx;">上传发票及交通判决书</view>
			</view>
		</view>
		<view class="uploadimg" v-if="thumb2 != '' || thumb3 != ''">
			<view class="imag_block" v-if="thumb3 != ''">
				<image :src="thumb3" mode=""></image>
				<view class="close" @click="close(thumb3 , 3)">
					<image src="../../static/icon/closeimg.png" mode=""></image>
				</view>
			</view>
			<view class="add_block" @click="uploadimg(3)" v-else>
				<view class="add_icon">+</view>
				<view class="text_file" style="color: #999999; font-size: 22upx;">上传发票及交通判决书</view>
			</view>
		</view>
		</view>
		
		
		
		
		<view class="notice">
			<text style="color: #333333;font-size: 22upx;">温馨提示：</text>
			<text >1. 交通医疗2万封顶</text>
			<text>2. 交通身故8万封顶</text>
			<text>3. 疾病医疗不给与救助</text>
		</view>
		
		<btncoms :title="btntitle"  @btns = 'issue'></btncoms>
		<view class="clause">
			<view class="clause_img" @click="selclause">
				<image :src="clause == 1?'../../static/icon/littlepitchon.png':'../../static/icon/littlenopitchon.png'" mode=""></image>
			</view>
			<view class="clause_cont" @click="disclaimer">
				<text>免责条款</text>
			</view>
		</view>
		<view class="mask" v-if="showDis" @click="mask"></view> <!-- 遮罩层 -->
		<view class="liability" v-if="showDis">
			<rich-text :nodes="context"></rich-text>
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue";
	import btncoms from "../../components/btncom.vue";
	export default{
		components:{
			headers , btncoms
		},
		data:function(){
			return{
				Htitle:"申请救济",
				Hlicon:"../../static/icon/left_whitch.png",
				btntitle:"发布",
				bitcolor:"",
				clause:1,
				urls:'',
				invoiceimg:'',
				type:'',
				price:'',
				thumb:'',
				thumb2:'',
				thumb3:'',
				content:'',
				liability:'',
				showDis:false,
				context:'',
				url_left:"/pages/index/everyoneg"
				
			}
		},
		methods:{
			disclaimer(){
				this.showDis = !this.showDis
			},
			mask(){
				this.showDis = !this.showDis
			},
			selclause(){
				// this.clause = !this.clause
				// this.liability = 1
				if(this.clause == 1){
					this.clause = 0
				}else{
					this.clause = 1
				}
			},
			issue(){
				service.auth(this , service.api.index.applyRelief , "POST" , {
			type:1,
			price:this.price,
			thumb:this.thumb,
			thumb2:this.thumb2,
			thumb3:this.thumb3,
			content:this.content,
			liability:this.clause
				} , function(self , res){
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/index/everyoneg'
						});
					},2000)
				});
			},
			close(e , num){
				
					var self = this;
						service.auth(self , service.api.user.deleteImg , "POST" , {
							path:e
						},function(_self , res){
							if(num == 1){
								_self.thumb = '';
							}else if(num == 2){
								_self.thumb2 = '';
							}else{
								_self.thumb3 = '';
							}
							// _self.invoiceimg = '';
							uni.showToast({
								title:res.info,
								icon:'none'
							})
						});
			},
			
			uploadimgss(){
				var self = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (res) => {
				                console.log(JSON.parse(res.data),"asfasdf");
								const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
								const e = path.data.url;
								console.log(e,"asdfasdfa");
								uni.showToast({
									title:path.info,
									icon:'none'
								});
				            }
				        });
				    }
				});
				
			},
			
			uploadimg(e){
				if(e == 1){
					var self = this;
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
					            filePath: tempFilePaths[0],
					            name: 'file',
					            success: (res) => {
					                console.log(JSON.parse(res.data),"asfasdf");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									self.thumb = path.data.url;
									console.log(self.thumb,"asdfasdfa");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
				}else if(e == 2){
					var self = this;
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
					            filePath: tempFilePaths[0],
					            name: 'file',
					            success: (res) => {
					                console.log(JSON.parse(res.data),"asfasdf");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									self.thumb2 = path.data.url;
									console.log(self.thumb2,"asdfasdfa");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
				}else{
					var self = this;
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
					            filePath: tempFilePaths[0],
					            name: 'file',
					            success: (res) => {
					                console.log(JSON.parse(res.data),"asfasdf");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									self.thumb3 = path.data.url;
									console.log(self.thumb3,"asdfasdfa");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
				}
			}
		},
		onShow() {
			this.liability = uni.getStorageSync('liability')
			console.log(this.liability);
			
			var richtext = this.liability[0].content;
			const regex = new RegExp('<img', 'gi');
			const regexP = new RegExp('<p', 'gi');
			const regexspan = new RegExp('<span', 'gi');
			richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
			richtext = richtext.replace(regexP, `<p style="word-wrap:break-word;word-break:normal;"`);
			richtext = richtext.replace(regexspan,`<span style="word-wrap:break-word;word-break:normal;white-space: pre-wrap;"`);
			this.context = richtext;
			
			
			
		}
	}
</script>

<style lang="less">
	.content{
		background-color: #FFFFFF;
		padding-left: 30upx;
		padding-right: 30upx;
		box-sizing: border-box;
		
	}
	.pirnum{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 50upx 0;
		input{
			width: 70%;
		}
		text{
			width: 30%;
		}
	}
	.explain{
		display: flex;
		padding: 30upx 0;
	}
	.explain_title{
		width: 25%;
	}
	.uploadimg{
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-around; */
	}
	.add_block{
		text-align: center;
		border: 2upx dashed #333333;
		width:202upx;
		height: 202upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.add_icon{
		color: #999999;
		font-size: 50upx;
		
	}
	.text_file{
		padding: 0 30upx;
	}
	.imag_block{
		width: 202upx;
		height: 202upx;
		margin-right:10upx ;
		position: relative;
	}
	.notice{
		display: flex;
		flex-direction: column;
		color: #666666;
		font-size: 22upx;
		padding: 50upx 0;
		line-height: 50upx;
	}
	.clause{
		display: flex;
		/* justify-content: center; */
		align-items: center;
		/* text-align: center; */
		/* vertical-align: middle; */
		box-sizing: border-box;
		padding: 10upx 90upx;
		justify-content: flex-end;
	}
	.clause_img{
		display: flex;
		text-align: center;
		vertical-align: middle;
		width: 30upx;
		height: 30upx;
	}
	.clause_cont{
		font-size: 24upx;
		padding: 10upx 0;
		color: #FA9C22;
	}
	.close{
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}	
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 2;
	}
	.liability{
		width: 70%;
		height: 70%;
		background-color: #FFFFFF;
		border-radius: 30upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50% , -50%);
		z-index: 3;
	}
	.uploadBox{
		display: flex;
		justify-content: space-around;
	}
</style>
