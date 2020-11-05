<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="quest_box" v-for="(it , i) in questlist" :key="i" @click="showcont(i)">
			<view class="item">
				<view class="item_title">
					<text>{{it.title}}</text>
				</view>
				<view class="item_icon">
					<image  v-if="i == index && showc" src="../../static/icon/merchant_down.png" mode=""></image>
					<image v-else src="../../static/icon/icon_right.png" mode=""></image>
				</view>
			</view>
			<view class="quest_content" v-if="i == index && showc">
				<text>
					<rich-text :nodes="it.content"></rich-text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import headers from '../../components/header_nav.vue';
	import service from '../../service.js';
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "常见问题",
				Hlicon: "../../static/icon/left_whitch.png",
				questlist: [],
				index:'',
				timr:0,
				showc:false,
				id:'',
			}
		},
		methods: {
			showcont(index){
				this.index = index;
				this.showc = !this.showc;
				// this.timr = this.timr + 1;
				// this.$set(this.questlist[index] , "option" + index, true );
				
					
				
				// console.log(this.questlist)
			}

		},
		onLoad(op) {
			this.id = op.id;
		},
		onShow() {
		     var self = this;
			service.auth(self, service.api.index.articlContent, 'GET', {
				page: 1,
				limit: 15,
				id: this.id
			}, function(self, res) {
				self.questlist = res.data;
				// for(let i = 0 ; i <= self.questlist.length ; i++){
				// 	self.$set(self.questlist[i] , 'option'+ i , false );
				// }
				// var richtext = res.data.data.registration_agreement;
				// const regex = new RegExp('<img', 'gi');
				// const regexP = new RegExp('<p', 'gi');
				// const regexspan = new RegExp('<span', 'gi');
				// richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
				// richtext = richtext.replace(regexP, `<p style="word-wrap:break-word;word-break:normal;"`);
				// richtext = richtext.replace(regexspan,
				// 	`<span style="word-wrap:break-word;word-break:normal;white-space: pre-wrap;"`);
				// self.context = richtext;
				console.log(res)
			});
			
			
		}
	}
</script>

<style lang="less">
	.quest_box {
		.item {
			background-color: #FFFFFF;
			padding: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4upx solid #F4F4F4;
			.item_title {
				color: #333333;
				font-size: 30upx;
			}

			.item_icon {
				display: flex;
				align-items: center;

				image {
					width: 40upx;
					height: 50upx;
					text-align: center;
				}
			}
		}

		.quest_content {
			box-sizing: border-box;
			padding: 30upx;
			
		}
	}
</style>
