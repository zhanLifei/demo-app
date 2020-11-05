<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jum('/pages/main/index')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>新手指南</text>
			</view>
		</view>

		<view class="navs">
			<view class="navs_item">
				<view v-for="( it , i ) in navs" :key="i" :class="['itemss' , {'it_active':it.id === id}]" @click="select(it.id)">
					<text>{{it.name}}</text>
				</view>
			</view>
		</view>

		<block class="" v-if="id == 1">
			<!-- 百问百答 -->
			<view class="question" v-for="(it , i) in prolist" :key="i" @click="jump('/pages/service/fam_quest?id='+it.id)">
				<view class="ques_text">
					<text>{{it.title}}</text>
				</view>
				<view class="ques_icon">
					<image src="../../static/icon/icon_right.png" mode=""></image>
				</view>
			</view>
			<!-- <view class="question">
				<view class="ques_text">
					<text>置换问题</text>
				</view>
				<view class="ques_icon">
					<image src="../../static/icon/icon_right.png" mode=""></image>
				</view>
			</view> -->
		</block>
		
			<!-- 视频专区 -->
		<block v-else>
			<view class="viedozooe">
				<view class="viedozooe_it" v-for="(it , i ) in prolist" :key="i" @click="PlayVideo(it.id)">
					<view class="viedozooe_video" v-if="curentId == it.id && scroll">
						<video :src="it.video_url" autoplay="true" id="myVideo" controls></video>
					</view>
					<view class="viedozooe_video" v-else>
						<image src="../../static/background/video_bg.png" mode=""></image>
					</view>
					<view class="viedozooe_conts">
						<view class="viedozooe_title">
							<text>{{it.title}}</text>
						</view>
						<view class="viedozooe_text">
							<text>{{it.content}}</text>
						</view>
						<view class="viedozooe_time">
							<text>{{it.createtime}}</text>
						</view>
					</view>
				</view>
			</view>
		</block>


	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				navs: [{
						id: 1,
						name: "百问百答"
					},
					{
						id: 2,
						name: "视频专区"
					}
				],
				id: 1,
				viedos: [],
				prolist:'',
				curentId:'',
				scroll:false
			}
		},
		methods: {
			select(e) {
				this.id = e;
				this.prolist = '';
				console.log(e, "sajfksadjfka")
				service.auth(this , service.api.index.articleCate , 'GET' , {
					page:1,
					limit:15,
					type:e
				} , function(self , res){
					console.log(res)
					self.prolist = res.data;
					console.log(self.prolist)
				});
				this.$forceUpdate();
			},
			jump(e){
				uni.navigateTo({
					url:e
				});
			},
			jum(e){
				uni.switchTab({
					url:e
				});
			},
			PlayVideo(id){
				this.scroll = true
				this.curentId = id;
			}
			
		},
		onReady(res) {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		onPageScroll(e){
			
			this.scroll = false
		},
		onShow() {
			service.auth(this , service.api.index.articleCate , 'GET' , {
				page:1,
				limit:15,
				type:1
			} , function(self , res){
				console.log(res)
				self.prolist = res.data;
				console.log(self.prolist)
			})
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
		background-color: #F2F2F2;
		height: auto;
	}

	.navs {
		background-color: #FFFFFF;
		font-size: 32upx;
		color: #666666;
		padding: 0upx 30upx;
		/* position: fixed;
		width: 100%;
		top: 102upx;
		left: 0; */

	}

	.it_active {
		/* background-color: #2189FF; */
		color: #2189FF;
		border-bottom: 4upx solid #2189FF !important;
	}

	.navs_item {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.itemss {
		padding: 40upx 0;
		border-bottom: 4upx solid #FFFFFF;
	}

	.question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 40upx 30upx;
		margin-top: 20upx;
		font-size: 30upx;
		color: #333333;
	}

	.ques_icon {
		width: 58upx;
		height: 58upx;
	}

	.viedozooe_it {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx;
		margin-top: 20upx;
	}

	.viedozooe_video {
		/* width: 321upx; */
		height: 241upx;
		width: 100%;
	}

	.viedozooe_video video {
		width: 100%;
		height: 100%;
	}
	
	.viedozooe_video image{
		width: 100%;
		height: 100%;
	}

	.viedozooe_conts {
		/* display: flex;
		flex-direction: column;
		justify-content:center ;
		align-items: space-around; */
		margin-left: 20upx;
		width: 60%;
	}

	.viedozooe_title {
		font-size: 32upx;
		color: #333333;
		font-weight: bold;
		margin-top: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:1;
	}

	.viedozooe_text {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		color: #666666;
		font-size: 28upx;
		margin-top: 10upx;

	}

	.viedozooe_time {
		color: #999999;
		font-size: 24upx;
		margin-top: 10upx;
	}
</style>
