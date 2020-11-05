<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jum('/pages/index/storeinfo')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>发布评价</text>
			</view>
		</view>
		<swiper class="swiper">
			<swiper-item>
				<view class="swiper-it uni-bg-red">
					<image src="../../static/img/Snipaste_2020-04-01_09-37-01.png" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="detail_info">

			<view :class="['conway' , 'item1']">

				<view class="coninfo_text">
					<text style="color: #000000; font-size: 32upx;">{{sercon.merchname}}</text>
				</view>
			</view>
			<textarea class="textas" v-model="conts" placeholder="请输入您的评价" />
			<view class="add_img">
				<view class="add_img_it" v-for="(it , i) in ImgList" :key="i" >
					<image :src="it" mode=""></image>
					<view class="close_icon" @click="close(i)">
						<image src="../../static/icon/closeimg.png" mode=""></image>
					</view>
				</view>
				<view class="add_icon" @click="addImg" v-if="ImgList.length <= 3">
					<image src="../../static/icon/add_icon.png" mode=""></image>
				</view>
			</view>
			<view class="store_eval">
				<view class="store_eval_header">
					<view class="eval_header_tilte">
						<text style="color: #333333; font-size: 26upx;">服务评价:</text>
					</view>
					<view class="eval_star">
						<view class="stars" v-for="(it , i) in starlist" :key="it.id" @click="stars(i)">
							<image :src="it.opartion?'../../static/icon/star.png':'../../static/icon/nolightstar.png'" mode="widthFix"></image>
						</view>
						<!-- <view class="eval_star_text">
							<text>{{starnum}}星</text>
						</view> -->
					</view>
				</view>
			</view>
			
		</view>


<view class="bottom_btn" @click="submit">
				<text>发布</text>
			</view>

		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deinfos: [{
						id: 1,
						title: "广州市牛哄哄修车旗舰店",
						src: "",
						text: ""
					},
					{
						id: 2,
						title: "联系方式",
						src: "../../static/icon/colorphone.png",
						text: "202-88888888888"
					},
					{
						id: 3,
						title: "店铺地址",
						src: "../../static/icon/addrs.png",
						text: "广州市天河区中山大道中66号某某路左侧对面"
					},
					{
						id: 4,
						title: "服务期限",
						src: "../../static/icon/sertime.png",
						text: "2020-01-03 至 2022-01-04"
					}
				],
				starlist: [{
						id: 1,
						opartion: false
					},
					{
						id: 2,
						opartion: false
					},
					{
						id: 3,
						opartion: false
					},
					{
						id: 4,
						opartion: false
					},
					{
						id: 5,
						opartion: false
					}
				],
				starnum: 3 ,//店铺的评价星星数
				id:'',
				sercon:'',
				starss:'',//传给后台的星星数
				ImgList:[],
				conts:'',//传给后台的评价内容
				subDuo:true
				
			}
		},
		methods:{
			jum(e){
				uni.navigateTo({
					url:e
				})
			},
			
			addImg(){
				var self = this;
				// if(self.ImgList.length >= 3){
				// 	uni.showToast({
				// 		title:'萨瓦迪卡,最多可以上传三张照片哈!',
				// 		icon:'none'
				// 	});
				// 	return
				// }
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: self.$service.api.user.updateIdImage, //仅为示例，非真实的接口地址
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
					            filePath: tempFilePaths[0],
					            name: 'file',
					            success: (res) => {
					                console.log(JSON.parse(res.data),"res");
									const path = JSON.parse(res.data);//打印出来就知道为什么要用JSON.parse
									const urls = path.data.url;
									self.ImgList.push(urls);
									console.log(self.ImgList,"ImgList");
									uni.showToast({
										title:path.info,
										icon:'none'
									});
					            }
					        });
					    }
					});
			},
			
			close(i){
				this.ImgList.splice(i , 1);
				console.log("success" , this.ImgList)
			},
			
			stars(e){
				// var nums = this.starnum;
				this.starss = e+1;
				console.log(this.starss);
				for (let i = 0; i <= e; i++) { //前面opartion的属性改成true店铺的评价星星数
					this.$set(this.starlist[i], "opartion", true);
					// this.starlist[i].opartion = !this.starlist[i].opartion;
				}
				for (let i = e+1; i <= 4; i++) { //后面opartion的属性改成店铺的评价星星数
					this.$set(this.starlist[i], "opartion", false);
					// this.starlist[i].opartion = !this.starlist[i].opartion;
				}
			},
			submit(){
				if(this.conts == ''){
					uni.showToast({
						title:'请输入评价内容',
						icon:'none'
					});
					return
				}
				if(this.starss == ''){
					uni.showToast({
						title:'请选择星星数',
						icon:'none'
					});
					return
				}
				if(this.subDuo){
				this.$service.auth(this , this.$service.api.index.comment , 'POST' , {
					merch_id:this.id,
					star:this.starss,
					content:this.conts,
					images:this.ImgList
				},function(self , res){
					self.subDuo = false;
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/index/storeinfo"
						})
					},1500);
				});
				}else{
					uni.showToast({
						title:"请勿多次提交!",
						icon:"none"
					});
				}
			}
			
		},
		onLoad(op) {
			this.id = op.id;
		},
		onShow() {
			// var self = this;
			this.$service.auth(this , this.$service.api.main.merch_list ,'POST' , {
				// page:1,
				// limit:15,
				id:this.id
				// type:1,
				// lat:this.longitude,
				// lng:this.latitude,
				// rate:2,
				// distance:2
			},function(self , res){
				console.log(res);
				self.sercon = res.data.data[0];
			});


		}
	}
</script>

<style>
	.header {
		background-color: #2575FE;
	}

	.left_ {
		width: 36upx;
		height: 36upx;
	}

	.center_title {
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}

	page {
		background-color: #EFF3F6;
	}

	.swiper-it {
		width: 100%;
		height: 100%;
	}

	.coninfo_icon {
		width: 24upx;
		/* height: 24upx; */
		margin-right: 30upx;
	}

	.detail_info {
		background-color: #FFFFFF;
		padding: 0 30upx;
	}

	.conway {
		display: flex;
		align-items: center;
		padding: 30upx 20upx;
		border-bottom: 2upx solid #F4F4F4;
	}

	.coninfo_text {
		display: flex;
		flex-direction: column;
	}

	.coninfo_text text {
		color: #666666;
		font-size: 22upx;
	}

	.item1 .coninfo_text text {
		color: #000000;
		font-size: 32upx !important;
		font-weight: bold;
	}

	.store_eval {
		/* display: flex; */
		margin-top: 40upx;
		/* padding: 0upx 40upx; */
		background-color: #FFFFFF;
	}

	.store_eval_header {
		padding: 20upx 0;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		/* border-bottom: 2upx solid #F4F4F4; */
	}

	.eval_star {
		display: flex;
		align-items: center;
		margin-left: 20upx;
	}

	.eval_star .stars {
		width: 24upx;
		margin-right: 10upx;
	}

	/* .eval_star_text {
		color: #666666;
		font-size: 26upx;
	} */
	
	
	
	
	
	
	.eval_butom_conts{
		margin-top: 20upx;
		overflow: hidden;   /* 文字超出显示点点 */
		text-overflow:ellipsis;
		white-space: 2;
	}
	
	
	
	.textas{
		width: 100%;
		color: #999999;
		font-size: 26upx;
		padding: 30upx 0;
		text-indent: 20upx;
	}
	.add_img{
		display: flex;
	}
	.add_img_it{
		width: 194upx;
		height: 194upx;
		margin-right: 10upx;
		position: relative;
	}
	.close_icon{
		width: 35upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 0;
	}
	.add_icon{
		width: 194upx;
		height: 194upx;
	}
	.bottom_btn{
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 50%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 50upx auto 70upx;
	}
</style>
