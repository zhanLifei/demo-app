<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/index')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>当家做主</text>
			</view>
		</view>
		<view class="navs">
			<view class="navs_it" v-for="(it , i ) in navs" :key="it.id" :class="[indexs == i?'selavtive':'']" @click="seclnav(i)">
				<text>{{it.name}}</text>
			</view>
		</view>
	
	<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
		<view class="scroll_it" v-for="(it , i) in scrolllist" :key = "it.id" >
			<view class="scroll_title">
				<view class="scroll_title_name">
				<text>{{it.catename}}</text>
				</view>
				<view class="scroll_title_time">
					<text>{{it.createtime}}-{{it.effectivetime}}</text>
				</view>
			</view>
			<view class="scroll_info">
				<view class="scroll_info_left">
					<view class="info_left_day">
						<text>任务周期：</text>
						<text>{{it.cycle}}</text>
					</view>
					<view class="info_left_num">
						<text>每日奖励数量：</text>
						<text>{{it.daily_yield}}</text>
					</view>
					<view class="info_left_mali">
						<text>马力：</text>
						<text>{{it.active}}</text>
					</view>
					<view class="info_left_umit">
						<text>可兑换上限：</text>
						<text v-if="indexs == 0">{{it.present}}/</text>
						<text>{{it.quantity_held}}</text>
					</view>
					<view class="info_left_need">
						<text>兑换所需：</text>
						<block v-if="indexs == 1 || indexs == 2"><text>{{it.wti}}</text></block>
						<block v-else><text>{{it.need_wti}}</text></block>
					</view>
				</view>
				<view class="scroll_info_right">
					<view class="info_right_num">
						<text>{{it.yield}}</text>
					</view>
					<view class="info_right_allnum">
						<text>总车贝奖励</text>
					</view>
					<block v-if="indexs == 0">
						<view class="info_right_exchange" @click="exchange(it.id)">
							<text>兑换</text>
						</view>
					</block>
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
				navs:[//tab的数组
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
				indexs:0,//tab栏的显示下标---0任务列表（列表），1我的,2历史
				scrolllist:[],//总数据
				page:1,//当前页数
				limit:15,//条数
				// status:0,//0任务列表（列表），1我的,2历史
			}
		},
		methods:{
			jump(e){
				uni.switchTab({
					url:e
				})
			},
			lower(){// 触碰底部加载
				if(this.last_page != this.page){
					if (this.last_page > 1) {
						this.page = Number(this.page) + 1
					} else {
						this.page = 1
					}
					this.load()
				}else{
					
				}
			},
			seclnav(i){//切换tab栏
				this.indexs = i;
				this.scrolllist = []
				this.page = 1
				this.load()
				uni.setStorageSync('tab_index',this.indexs)
			},
			exchange(i){//兑换任务
			uni.showModal({
				content:'确认兑换？',
				success:(res)=>{
					if(res.confirm){//确定按钮
						/* this.$service.auth(this,this.$service.api.index.byMiningMachine,'GET',{
							cate_id:this.scrolllist[i].id
						},(self,res)=>{
							console.log(res)
							uni.showToast({
								icon:'none',
								title:res.info
							})
						}); */
						uni.request({
							url:this.$service.api.index.byMiningMachine,
							method:"GET",
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							data:{
								cate_id:i
							},
							success: (res) => {
								var res = res.data;
								if(res.code == 1){
									uni.showToast({
										icon:'none',
										title:res.info
									});
									// uni.navigateBack()
									uni.redirectTo({
									    url: '/pages/index/masters'
									});
								}else{
									uni.showToast({
										icon:'none',
										title:res.info
									});
									
								}
								
							},
							fail: (res) => {
								uni.showToast({
									icon:'none',
									title:res.info
								});
							}
						});
						
					}else{//取消按钮
						
					}
				}
			})
			
			},
			load(){//数据的加载
				if(this.indexs == 1 || this.indexs == 2){
					this.$service.auth(this,this.$service.api.index.myMiningMachine,'GET',{
						page:this.page,
						limit:this.limit,
						status:this.indexs
					},(self,res)=>{
						// console.log(res)
						if (res.code == 1 && res.data.machine_list.data.length > 0) {
							for (let i = 0; i < res.data.machine_list.data.length; i++) {
								self.scrolllist.push(res.data.machine_list.data[i])
								var str = self.scrolllist[i].createtime
								var strN = str.substr(0,10)
								var str1 = self.scrolllist[i].effectivetime
								var strN1 = str1.substr(0,10)
								this.$set(self.scrolllist[i] , "createtime" , strN);
								this.$set(self.scrolllist[i] , "effectivetime" , strN1);
							}
						}
						self.page = res.data.machine_list.current_page
						self.last_page = res.data.machine_list.last_page
						console.log(res.data.machine_list.data)
					})
				}else{
					this.$service.auth(this,this.$service.api.index.machineCates,'GET',{},(self,res)=>{
						console.log(res.data.cate_list)
						self.scrolllist = res.data.cate_list
					})
				}
				
			}
		},
		onShow() {
			// console.log(this.indexs)
			this.scrolllist = []
			this.load()
			// console.log(this.$service)
			
		},
		onLoad() {
			this.indexs = uni.getStorageSync('tab_index')
			
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
