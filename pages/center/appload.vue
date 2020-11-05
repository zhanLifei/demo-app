<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="text_box" v-for="(item , i) in addList" :key = "i">
			<view class="text_name">
				<text>{{item.set_name}}</text>
			</view>
			<input type="text" v-model="item.default_str" :placeholder="item.tips" placeholder-class="inplss" @input="input" @click="blur(i)"  />
		</view>
		<view class="bottom_btn " @click="submit()">
			<text>提交</text>
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
				Htitle: "填写地址",
				Hlicon: "../../static/icon/left_whitch.png",
				pos_id:0,
				addList:[],
				index:0,
				// hstyle:"background:transparent"
			}
		},
		onLoad:function(e){
			this.pos_id = e.id;
			console.log(e)
			service.auth(this , service.api.pos.fields , 'GET' , {
				// status:status,
				type:3,
				token:uni.getStorageSync('token')
			} , function(self,res){
				console.log(res)
				self.addList = res.data
			})
		},
		methods:{
			input(e){
				this.addList[this.index].default_str = e.detail.value;
			},
			blur(index){
				this.index = index;
			},
			submit(){
				var self = this;
				var text = '';
				var arr = [];
				var list = this.addList;
				for(var i = 0;i < list.length;i++){
					if(list[i].must == 1){
						if(list[i].default_str == ''){
							uni.showToast({
								icon: 'none',
								title: list[i].tips + '不能为空'
							});
							return;
						}else{
							arr.push(list[i].default_str);
						}
					}
				}
				service.downLoad(this,service.api.pos.check,{
					'pos_id':this.pos_id,
					'pos_fields':arr
				},'POST', function(self, res) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					if(res.code == 1){
						setTimeout(function(){
							uni.navigateTo({
								url:"/pages/service/post"
							})
						},1500)
					}
				});
			}
		}
	}
</script>

<style>
	.text_box {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}

	.text_name {
		color: #333333;
		font-size: 30upx;
		width: 30%;
	}

	.inplss {
		color: #C3C3C3;
		font-size: 30upx;
	}

	.text_box input {
		width: 70%;
	}

	.bottom_btn {
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 30upx auto 0;
	}
</style>
