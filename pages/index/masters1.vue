<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>当家做主</text>
			</view>
		</view>
		<view class="navs">
			<view class="" v-for="(it , i ) in navs" :key="it.id" :class="['navs_it' , {'selavtive':it.id == index }]" @click="seclnav(it.id)">
				<text>{{it.name}}</text>
			</view>
		</view>
	
	<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
		<view class="scroll_it" v-for="(it , i) in scrolllist" :key = "it.id" >
			<view class="scroll_title">
				<view class="scroll_title_name">
				<text>{{it.title}}</text>
				</view>
				<view class="scroll_title_time">
					<text>{{it.time}}</text>
				</view>
			</view>
			<view class="scroll_info">
				<view class="scroll_info_left">
					<view class="info_left_day">
						<text>任务周期:</text>
						<text>{{it.day}}</text>
					</view>
					<view class="info_left_num">
						<text>每日奖励数量:</text>
						<text>{{it.num}}</text>
					</view>
					<view class="info_left_mali">
						<text>马力</text>
						<text>{{it.mali}}</text>
					</view>
					<view class="info_left_umit">
						<text>可兑换上限:</text>
						<text>{{it.umit}}</text>
					</view>
					<view class="info_left_need">
						<text>兑换所需:</text>
						<text>{{it.needs}}</text>
					</view>
				</view>
				<view class="scroll_info_right">
					<view class="info_right_num">
						<text>{{it.alls}}</text>
					</view>
					<view class="info_right_allnum">
						<text>总车贝奖励</text>
					</view>
					<view class="info_right_exchange">
						<text>兑换</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
	
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navs:[
					{
						id:1,
						name:"当家列表"
					},
					{
						id:2,
						name:"我的当家"
					},
					{
						id:3,
						name:"历史当家"
					}
				],
				index:1,
				scrolllist:[
					{
						id:1,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					},
					{
						id:2,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					},
					{
						id:3,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					},
					{
						id:4,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					},
					{
						id:5,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					},
					{
						id:6,
						title:"试用地主",
						day:30,
						num:0.2413412312,
						mali:21131,
						umit:2132,
						needs:"324个车贝",
						alls:12213,
						time:"2020/03/08 - 2020/04/09"
						
					}
				]
			}
		},
		methods:{
			seclnav(e){
				this.index = e;
			}
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
	
	.top_back {
		position: fixed;
		width: 100%;
		height: 288upx;
		top: 0;
		left: 0;
		/* z-index: -1; */
		/* background: url(../../static/img/myteamBack.png) no-repeat;
		background-size: 100% 288upx;
		background-position: left top; */
	}
	.navs{
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 32upx;
		background-color: #FFFFFF;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.navs_it{
		width: 33.3%;
		text-align: center;
		padding: 40upx 0;
		margin: 0 30upx;
		box-sizing: border-box;
	}
	.selavtive{
		color:#2189FF;
		border-bottom: 4upx solid #2189FF;
	}
	.scroll_list{
		width: 90%;
		height: 86%;
		/* padding: 0 20upx; */
		margin: 20upx auto 0;
		background-color: transparent;
		box-sizing: border-box; 
	}
	.scroll_it{
		background-color: #FFFFFF;
		width: 100%;
		box-sizing: border-box;
		padding: 30upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
	}
	.scroll_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20upx;
		border-bottom:2upx solid #F4F4F4;
	}
	.scroll_title_name{
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
	}
	.scroll_title_time{
		 color: #666666;
		 font-size: 28upx;
	}
	.scroll_info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20upx;
	}
	.scroll_info_left{
		color: #666666;
		font-size: 28upx;
		width: 60%;
		line-height: 60upx;
	}
	.scroll_info_right{
		/* width: 40%; */
		text-align: center;
		line-height: 60upx;
	}
	.info_right_num{
		color: #FA9C22;
		font-size: 58upx;
	}
	.info_right_allnum{
		color: #333333;
		font-size: 28upx;
	}
	.info_right_exchange{
		color: #FFFFFF;
		font-size: 34upx;
		background-color: #2189FF;
		/* padding: 20upx;
		border-radius: 20upx; */
		padding: 10upx;
		    border-radius: 42upx;
			margin-top:20upx ;
	}
</style>
