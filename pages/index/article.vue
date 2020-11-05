<template>
	<view class="content">
		<headers :Hlicon="Hlicon" :Htitle="Htitle" :url_le="url_left"></headers>
		<view class="article_box">
			<view class="article_img">
				<image :src="thumb" mode=""></image>
			</view>
		<view class="arttext">
			<view v-html="textconts"></view><!-- <text>{{textconts}}</text> -->
		</view>
			
		</view>
		<view class="store_eval">
			<!-- <view class="store_eval_header">
				<view class="eval_header_tilte">
					<text style="color: #000000; font-size: 32upx;">店铺评价</text>
				</view>
				<view class="eval_star">
					<view class="stars" v-for="(it , i) in starlist" :key="it.id">
						<image :src="it.opartion?'../../static/icon/star.png':'../../static/icon/nolightstar.png'" mode="widthFix"></image>
					</view>
					<view class="eval_star_text">
						<text>{{starnum}}星</text>
					</view>
				</view>
			</view> -->
			<view class="store_eval_butom">
				<view class="eval_butom_img">
					<image :src="avatar" mode=""></image>
				</view>
				
				<view class="eval_butom_text">
					<view class="butom_name_time">
						<text style="color: #333333; font-size: 26upx; font-weight: bold;">{{nickname}}</text>
						<text style="color: #999999; font-size: 22upx;">{{createtime}}</text>
					</view>
					<view class="eval_butom_lookmore" @click="lookMore">
						<text style="color: #FA9C22; font-size: 26upx;">查看更多评价</text>
					</view>
					<view class="eval_butom_conts">
						<text style="color: #333333; font-size: 26upx;" v-html="content"></text>
					</view>
				</view>
			</view>
		</view>
		<view @click="mask" class="mask" v-if="showmask"></view>
		<view :class="['danswind' , showmask?'action':'']">
			<textarea v-model="importcont" focus="true" value="" placeholder="请文明用语，禁止评论时政车聚利~分享创造价值" />
			<btncoms  :title="btntitle" @btns='commit'></btncoms>
		</view>
		<btncoms  :title="btntitle" @btns='danswind'></btncoms>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import btncoms from "../../components/btncom.vue";
	import service from "../../service.js";
	export default{
		components:{
			headers , btncoms
		},
		data:function(){
			return{
				Htitle:"文章详情",
				Hlicon:"../../static/icon/left_whitch.png",
				btntitle:"发布评价",
				bitcolor:"",
				clause:true,
				id:'',
				type:'',
				textconts:'',
				thumb:'',
				avatar:'',
				createtime:'',
				content:'',
				nickname:'',
				showmask:false,
				importcont:'',
				url_left:"/pages/index/everyoneg"
			}
		},
		methods:{
			danswind(){
				this.showmask = !this.showmask;
			},
			mask(){
				this.showmask = !this.showmask;
			},
			lookMore(){
				uni.navigateTo({
					url:'/pages/index/allevaluArt?id='+this.id+'&type='+this.type 
				})
			},
			commit(){
				service.auth(this , service.api.index.commentSubmit , 'POST' , {
					article_id:this.id,
					content:this.importcont
				} , function(self , res){
					
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						self.showmask = false;
						},500)
				})
			}
		},
		 onShow(){
			
		},
		  onLoad(op){
					this.id = op.id;
					this.type = op.type;
			
					console.log(this.id,this.type);
					service.auth(this , service.api.index.articleDetail , 'GET' , {
						id:op.id,
						limit:2,
						type:op.type
					} , function(self , res){
						console.log(res);
						self.textconts = res.data.article.content;
						self.thumb = res.data.article.thumb;
						self.avatar = res.data.comment.data[0].avatar;
						self.createtime = res.data.comment.data[0].createtime;
						self.content = res.data.comment.data[0].content;
						self.nickname = res.data.comment.data[0].nickname;
					})
		      }
	}
</script>

<style>
	.content{
		background-color: #FFFFFF;
		
	}
	.article_img{
		/* width: 390upx; */
		width: 100%;
		height: 362upx;
	}
	.article_box{
		padding: 30upx 20upx;
		/* padding-left: 20upx; */
		/* padding-right: 20upx; */
	}
	.store_eval {
		/* display: flex; */
		/* margin-top: 20upx; */
		
		padding: 0upx 20upx;
		border-top: 20upx solid #F4F4F4;
		background-color: #FFFFFF;
	}
	.store_eval_butom{
		display: flex;
		padding: 30upx 0 50upx;
	}
	.eval_butom_text{
		padding: 0 20upx;
		width: 80%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.butom_name_time{
		width: 50%;
		display: flex;
		flex-direction: column;
		
	}
	.eval_butom_lookmore{
		width: 50%;
		text-align: end;
		
	}
	.eval_butom_img{
		width: 83upx;
		height: 83upx;
		/* height: 82upx; */
	}
	.eval_butom_conts{
		margin-top: 20upx;
		overflow: hidden;   /* 文字超出显示点点 */
		text-overflow:ellipsis;
		white-space: 2;
	}
	.arttext{
		text-align: center;
		/* background-color: #f4f4f4; */
	}
	.mask{
		width: 100%;
		height: 100%;
		background-color: rgba(0 , 0 , 0 , 0.4);
		position: fixed;
		top: 0;
		left: 0;
	}
	.danswind{
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		width: 100%;
		padding: 50upx;
		box-sizing: border-box;
		border-radius: 10upx 10upx 0 0;
		transition: 0.6s;
		transform: translateY(100%);
	}
	.danswind textarea{
		width:100%;
	}
	.action{
		transition: 0.6s;
		transform: translateY(0);
	}
</style>
