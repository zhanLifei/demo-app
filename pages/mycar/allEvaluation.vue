<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump()">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>全部评价</text>
			</view>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
			<view>
				<view class="eval_box" v-for="(it , i) in evallis" :key="i">

					<view class="eval_header">
						<view class="eval_headimg">
							<image :src="it.avatar" mode="widthFix"></image>
						</view>
						<view class="eval_name">
							<view class="name_top">
								<view class="name_left">
									<text style="color: #333333; font-size: 30upx; font-weight: bold;">{{it.nickname}}</text>
								</view>
								<!-- <view class="eval_star">
									<view class="star_it" v-for="(its , i) in it.stars" :key="i">
										<image :src="i < it.star?'../../static/icon/star.png':'../../static/icon/nolightstar.png'" mode="widthFix"></image>
									</view>
								</view> -->
							</view>
							<view class="time_bottom">
								<text style="color: #999999; font-size: 24upx;">{{it.createtime}}</text>
							</view>
						</view>
					</view>

					 <view class="eval_text">
						<text>{{it.content}}</text>
						<!-- <view class="eval_imglis">
							<view class="eval_img" v-for="(iti , i) in it.images" :key="i">
								<image :src="iti" mode="widthFix"></image>
							</view>
						</view> -->
					</view> 
				</view>
				<view class="loadclass" v-if="loadshow">
					<text>正在加载</text>
				</view>
				<view class="loadclass" v-else>
					<text>数据已加载完毕</text>
				</view>
			</view>
		</scroll-view>


	</view>
</template>

<script>
	import service from "../../service.js";
	export default {
		data() {
			return {
				evallis: [],
				page: 0,
				pages: 1,
				loadshow:true,
				op:''
			}
		},
		methods: {
			jump(){
				uni.navigateBack({
					delta:1
				})
			},
			lower(){
				console.log('123')
				this.Loadthepage(this.op);
			},
			
			Loadthepage(e) {
				console.log(this.loadshow,22222)
				var self = this;
				if(!self.loadshow){
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self , self.$service.api.index.cararticleDetail , "GET" , {
						page:page,
						limit:15,
						id:e.id,
						type:e.type
					}, function(self, res) {
						console.log(res.data,6666)
						self.pages = res.data.comment.total;
						self.page = page;
						var list = res.data.comment.data;
						list.forEach((v, i) => {
							self.evallis.push(v);
							// self.$set(self.evallis[i] , 'stars' , self.stars);
						});
						console.log(self.evallis , 'evallis');
						if (self.pages == self.page) {
							self.loadshow = false
							uni.showToast({
								title: '数据已加载完毕',
								icon: 'none'
							});
						} else {
							self.loadshow = true
						}
					});
				} else {
					self.loadshow = false
					uni.showToast({
						title: '数据已加载完毕',
						icon: 'none'
					});
				}
			},

		},
		onLoad(op){
			this.id = op.id;
			this.type = op.type;
			this.op = op
				/* this.$service.auth(this , this.$service.api.index.articleDetail , 'GET' , {
					id:op.id,
					limit:15,
					type:op.type
				} , function(self , res){
					console.log(res); */
					
					/* self.textconts = res.data.article.content;
					self.thumb = res.data.article.thumb;
					self.avatar = res.data.comment.data[0].avatar;
					self.createtime = res.data.comment.data[0].createtime;
					self.content = res.data.comment.data[0].content;
					self.nickname = res.data.comment.data[0].nickname; */
				/* }) */
			this.Loadthepage(op);
			
		},
		onShow() {
			/* this.$service.auth(this , this.$service.api.index.articleDetail , 'GET' , {
				id:'',
				limit:15,
				type:''
			} , function(self , res){
				console.log(res); */
				
				/* self.textconts = res.data.article.content;
				self.thumb = res.data.article.thumb;
				self.avatar = res.data.comment.data[0].avatar;
				self.createtime = res.data.comment.data[0].createtime;
				self.content = res.data.comment.data[0].content;
				self.nickname = res.data.comment.data[0].nickname; */
			/* }) */
		/* 	this.evallis.forEach((v , i)=>{ 
				var lights = v.star;
				console.log(lights,"afasdfdas")
				for(let i = 0 ; i<lights ; i++ ){
					this.$set(v.stars[i] , "opartion" , true);
				}
				
			}); */
			// for(let i = 0 ; i < this.evallis.length ; i++){
			// 	var lights = this.evallis[i].lightstar;
			// 	var stars = this.evallis[i].stars;
			// 	for(let j = 0 ; j < lights ; j++){
			// 		this.$set(stars[j] , "opartion" , true);
			// 	}
			// }
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

	.eval_box {
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}

	.eval_header {
		display: flex;
		align-items: center;
	}

	.eval_headimg {
		width: 10%;
	}

	.eval_name {
		width: 90%;
		/* display: flex;
		align-items: center; */
		margin-left: 20upx;
	}
.name_top{
	display: flex;
	justify-content: space-between;
}
	.eval_star {
		display: flex;
	}

	.star_it {
		width: 24upx;
		margin-right: 10upx;
	}

	.eval_imglis {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20upx;
	}

	.eval_img {
		width: 33%;
		text-align: center;
		/* margin: 0 10upx ; */
	}
	.eval_text text{
		color: #333333;
		font-size: 28upx;
		
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
	}
	.scroll_list{
		height: 99%;
	}
</style>
