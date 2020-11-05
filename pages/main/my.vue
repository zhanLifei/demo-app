<template>
	<view class="content">
		<headers :Hricon="Hricon"  :url_ri="url_ri"></headers>
		<view class="top_back"></view>
		<view class="top_back2"></view>
		<view class="top_box">
			<view class="top1">
				<view class="top1_header" @click="jump('/pages/set/personal')">
					<image :src="avatar" mode=""></image>
				</view>
				<view class="top1_text">
					<view class="paddssss">
						<text style="color: #333333;font-size: 42upx;font-weight: bold;">{{nickname}}</text>
					</view>
					<view class="paddssss">
						<text style="color: #666666;font-size: 26upx;" v-if="type=='mobile'">账号:{{account}}</text>
						<!-- <text>686564435</text> -->
						<text style="color: #666666;font-size: 26upx;" v-else>邮箱:{{email}}</text>
					</view>
					
					<view class="paddssss">
						<text class="yixlevelss" @click="jump('/pages/service/star_level')">{{teamlevelname}}</text>
						<text class="levelss" @click="jump('/pages/index/level')">{{levelname}}</text>
					</view>
				</view>
			</view>
			<view class="top2">
				<view class="top2_info" @click="jump('/pages/record/chebeidetail')">
					<text style="color: #000000; font-size: 32upx;">{{wti}}</text>
					<text style="color: #666666;font-size: 24upx;">车贝</text>
				</view>
				<view class="top2_info" @click="jump('/pages/record/malidefail')">
					<text style="color: #000000; font-size: 32upx;">{{activity}}</text>
					<text style="color: #666666;font-size: 24upx;">马力</text>
				</view>
				<view class="top2_info" @click="jump('/pages/record/integral')">
					<text style="color: #000000; font-size: 32upx;">{{integral}}</text>
					<text style="color: #666666;font-size: 24upx;">积分</text>
				</view>
			</view>
			<view class="top3">
				<view class="honorauth" @click="jump('/pages/record/honordefail')">
					<image src="../../static/icon/honor.png" mode=""></image>
					<text class="honorsss">荣誉值</text>
					<text class="honornum">{{glory}}</text>
				</view>
				<view class="honorauth  hhhxx" @click="jump('/pages/index/level')">
					<image src="../../static/icon/authorcon.png" mode=""></image>
					<text class="honorsss">贡献值</text>
					<text class="honornum">{{contribution}}</text>
				</view>
			</view>
		</view>

		<view class="back_box">
			<view class="itile">
				<text style="color: #191919;font-size: 32upx;">捐资助学榜</text>
				<text style="color: #191919;font-size: 28upx;margin-left: 160upx;">入英雄榜做有爱之人</text>
			</view>
			<view class="btn_back" @click="jump('/pages/index/everyoneg')">
				<text>去参加</text>
			</view>
		</view>
		<!-- - -->
		<view class="box1">
			<view class="box1_it" @click="jump('/pages/realName/real_name?type=0')">
				<view class="it_imgss">
					<image src="../../static/icon/realnameor.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>实名认证</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/index/cardauth')">
				<view class="it_imgss">
					<image src="../../static/icon/carauth.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>车主认证</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/index/myteam')"><!--  -->
				<view class="it_imgss">
					<image src="../../static/icon/tema_icon.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>我的团队</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/center/invitefrient')">
				<view class="it_imgss">
					<image src="../../static/icon/inter_frient.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>邀请好友</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/record/hall')">
				<view class="it_imgss">
					<image src="../../static/icon/citycons.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>城市大厅</text>
				</view>
			</view>
		</view>

		<!-- - -->
		<view class="box1">
			<view class="box1_it" @click="jump('/pages/index/conequity')">
				<view class="it_imgss">
					<image src="../../static/icon/stock_markey.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>兑换股权</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/index/loansrecord')">
				<view class="it_imgss">
					<image src="../../static/icon/moneyser.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>融资贷款</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/center/my_deal')">
				<view class="it_imgss">
					<image src="../../static/icon/deal.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>我的置换</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/index/notice?page='+1)">
				<view class="it_imgss">
					<image src="../../static/icon/userinfo.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>消息</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/center/voucher')">
				<view class="it_imgss">
					<image src="../../static/icon/finservice.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>车险凭证</text>
				</view>
			</view>
		</view>

		<!-- - -->
		<view class="box1">
			<view class="box1_it" @click="jump('/pages/service/credit_card')">
				<view class="it_imgss">
					<image src="../../static/icon/credit_card.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>信用卡</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/service/post')">
				<view class="it_imgss">
					<image src="../../static/icon/POS.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>POS机</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/service/myfun')">
				<view class="it_imgss">
					<image src="../../static/icon/strive.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>我的劵</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/record/auditcom2')">
				<view class="it_imgss">
					<image src="../../static/icon/tema_add.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>救济申请</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/center/merchant')">
				<view class="it_imgss">
					<image src="../../static/icon/shopmall.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>申请商家</text>
				</view>
			</view>
			<view class="box1_it" @click="jump('/pages/service/businesscenter')">
				<view class="it_imgss">
					<image src="../../static/icon/shopmallsss.png" mode=""></image>
				</view>
				<view class="it_text">
					<text>商家中心</text>
				</view>
			</view>
		</view>
		<!-- - -->
		<view class=" box_bot">
			<view class="box_bottitle">
				<text>帮助中心</text>
			</view>
			<view class="box_bot111">
				<view class="box1_it" @click="jump('/pages/service/feedback')">
					<view class="it_imgss">
						<image src="../../static/icon/manservice.png" mode=""></image>
					</view>
					<view class="it_text">
						<text>反馈客服</text>
					</view>
				</view>
				<view class="box1_it" @click="platService('')">
					<view class="it_imgss">
						<image src="../../static/icon/serviceh.png" mode=""></image>
					</view>
					<view class="it_text">
						<text>车聚利服务平台</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="mask" v-if="showDis" @click="mask"></view> <!-- 遮罩层 -->
		<view class="liability" v-if="showDis">
			<image :src="servicess" mode=""></image>
			<!-- <image src="../../static/icon/shut.png" mode=""></image> -->
		</view>
		
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue";
	export default {
		components: {
			headers
		},
		data() {
			return {
				email:'',
				// Htitle: "人人公益",
				// Hlicon: "../../static/icon/left_whitch.png",
				Hricon: "../../static/icon/setting_white.png",
				url_ri: "/pages/set/security",
				topinfo: [{
						id: 1,
						nem: "1.02",
						name: "车贝"
					},
					{
						id: 2,
						nem: "1.02",
						name: "车贝"
					},
					{
						id: 3,
						nem: "1.02",
						name: "车贝"
					}

				],
				account: "", //会员账号
				nickname: "", //用户名
				avatar: "", //头像
				levelname: "", //会员等级名称
				wti: "", // 用户车贝
				activity: "", // 马力
				glory: "", // 荣耀值
				integral: "" ,// 积分
				contribution:'',
				teamlevelname:'',
				showDis:false,
				servicess:'',
				type:uni.getStorageSync('type')
			}
		},
		methods: {
			mask(){
				this.showDis = !this.showDis;
			},
			jump(url) {
				uni.navigateTo({
					url: url
				});
			},
			jumpdd(){
				uni.showToast({
					title:"功能开发中",
					icon:'none'
				});
			},
			platService(){
				this.showDis = !this.showDis;
			},
			
			// 实名步骤接口
			status(){
				uni.request({
					url:service.api.realName.getVerificationStep,
					header:{
						Authorization: 'Bearer '+uni.getStorageSync('token'),
					},
					method:"GET",
					success(res) {
						var res = res.data
						uni.setStorageSync('step',res.data.step)
					}
				})
			},
		},
		onShow() {

			service.auth(this, service.api.home.info, 'GET', '', function(self, res) {
				console.log(res)
				var member = res.data.member;
				uni.setStorageSync("member",member);
				self.account = member.account;
				self.email = member.email;
				self.nickname = member.nickname;
				self.avatar = member.avatar;
				self.levelname = member.levelname;
				self.teamlevelname = member.teamlevelname;
				self.servicess = res.data.service;
			});

			service.auth(this, service.api.main.asset, 'GET', '', function(self, res) {
				console.log(res)
				var member = res.data.list;
				uni.setStorageSync("memberss",member);
				self.wti = member.wti; 
				self.activity = member.activity; 
				self.glory = member.glory; 
				self.integral = member.integral;
				 self.contribution = member.contribution
			});
			
			/*---店铺类型---*/
			uni.request({
				url:service.api.home.category,
				method:'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					console.log(res);
					uni.setStorageSync('category' , res.data.data);
				}
			});
			/*---店铺类型---*/
			
			// 实名步骤接口
			this.status();
		}
	}
</script>

<style>
	.content {
		padding-left: 24upx;
		padding-right: 24upx;
		background-color: transparent;
	}

	.top_back {
		width: 100%;
		height: 400upx;
		background-color: #2189FF;
		border-radius: 0 0 20upx 20upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.top_back2 {
		width: 100%;
		height: 100%;
		background-color: #f4f4f4;
		position: fixed;
		top: 350upx;
		left: 0;
		z-index: -2;
	}

	.top_box {
		background-color: #FFFFFF;
		/* padding: 0 30upx; */
		border-radius: 20upx;
	}

	.top1 {
		display: flex;
		padding: 40upx 30upx;
		align-items: center;
	}

	.top1_header {
		width: 30%;
	}

	.top1_header image {
		width: 127upx;
		height: 127upx;
		border-radius: 50%;
	}

	.top1_text {
		width: 70%;
	}

	.yixlevelss {
		color: #EF8A12;
		font-size: 22upx;
		padding: 10upx 20upx;
		background-color: #FFEECA;
		border-radius: 22upx;
		margin-right: 10upx;
	}

	.levelss {
		color: #EF8A12;
		font-size: 22upx;
		padding: 10upx 50upx;
		background-color: #FFEECA;
		border-radius: 22upx;
	}

	.paddssss {
		padding: 10upx 0;
	}

	.honorsss {
		color: #666666;
		font-size: 24upx;
		margin: 0 10upx;
	}

	.honornum {
		color: #333333;
		font-size: 30upx;
		font-weight: bold;
	}

	.top2 {
		display: flex;
		justify-content: space-around;
		padding: 50upx 30upx;
		border-bottom: 2upx solid #F4F4F4;
	}

	.top2_info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.top3 {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0upx 30upx;
	}

	.honorauth {
		display: flex;
		align-items: center;
		padding: 50upx 0;
		width: 50%;
		justify-content: center;
	}

	.honorauth image {
		width: 26upx;
		height: 26upx;
	}

	.hhhxx {
		border-left: 2upx solid #F4F4F4;
	}

	.back_box {
		background: url(../../static/background/student_back.png) no-repeat;
		background-size: cover;
		display: flex;
		padding: 40upx;
		align-items: center;
		margin-top: 10upx;
	}

	.itile {
		display: flex;
		flex-direction: column;
		width: 70%;
		justify-content: center;
		align-items: center;
	}

	.btn_back {
		width: 30%;
		text-align: center;
		color: #FFFFFF;
		font-size: 28upx;
		background-image: radial-gradient(ellipse, #04C2FF, #25ACF7);
		padding: 10upx;
		border-radius: 26upx;
	}

	.box1 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 22upx;
		margin-top: 20upx;
		padding: 20upx 0;
	}

	.box1_it {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 33.3%;
		padding: 30upx 0;
	}

	.it_imgss {}

	.it_imgss image {
		width: 60upx;
		height: 60upx;
	}

	.it_text {
		color: #666666;
		font-size: 28upx;
	}

	.box_bot {
		/* display: flex;
		flex-wrap: wrap;
		align-items: center; */
		background-color: #FFFFFF;
		border-radius: 22upx;
		margin: 20upx 0 50upx;
		padding: 20upx 0;
	}

	.box_bot111 {
		display: flex;
		flex-wrap: wrap;

	}

	.box_bottitle {
		color: #030303;
		font-size: 32upx;
		margin-left: 50upx;
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
		/* width: 70%; */
		/* height: 70%; */
		/* background-color: #FFFFFF; */
		/* border-radius: 30upx; */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50% , -50%);
		z-index: 3;
	}
	.liability image:nth-child(1){
		width: 400upx;
		height: 400upx;
	}
	
</style>
