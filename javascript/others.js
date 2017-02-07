$(function(){
	//搜索
	var searchA = $('.search-a');
	var search = searchA.siblings('.search');
	searchA.on('click',function(){
		$(this).css('display','none');
		search.css('display','inline-block');
		return false;
	});
	search.on('click',function(){
		return false;
	});
	$(document).on('click',function(){
		searchA.css('display','inline-block');
		search.css('display','none');
	});
	
	//默认背景选择
	var $instalImg = $('.instal-img').find('li input[type=radio]');
	var $img = '../images/banner-bg.jpg';
	$instalImg.click(function(){
		$img = $($(this).next().find('img'))[0].src;
		defaultLayout();
	});
	
	//默认颜色选择
	var $instalLi = $('.instal-color').find('li');
	var $instal = $('.instal-color').find('li input[type=radio]');
	var $span = "";
	$instalLi.mouseover(function(){
		$span = $(this).find("input[type=radio]").next().find('span');
		changed($span);
	}).mouseout(function(){
		$span = "";
		if($('[name="default-color"]:checked').length <= 0){
			defaultLayout();
		}else{
			$span = $('[name="default-color"]:checked').next().find('span');
			changed($span);
		}
	});
	$instal.click(function(){
		$span = $(this).next().find('span');
		changed($span);
	});
	
	function changed(arr){
		less.modifyVars({
			'background-color':$(arr[0]).css('backgroundColor'),
			'primary-color':$(arr[1]).css('backgroundColor'),
			'panel-color':$(arr[2]).css('backgroundColor'),
			'base-font-color':$(arr[3]).css('backgroundColor'),
			'banner-bg-img':"url(" + $img + ")"
		});
	}
	function defaultLayout(){
		if($span == ""){
			less.modifyVars({
				'background-color':"#f4f4f4",
				'primary-color':"#5acdb3",
				'panel-color':"#fafafa",
				'base-font-color':"#333",
				'banner-bg-img':"url(" + $img + ")"
			});
		}else{
			changed($span);
		}
	}
	
	
	//模板风格切换
	var $changeStyle = $("#change-style"),$post = $("#post");
	var index = 1;
	var astyle = new Array("large-block-grid-2 medium-block-grid-1","large-block-grid-3 medium-block-grid-2","large-block-grid-4 medium-block-grid-3","list-style");
	var	atext = new Array("布局A","布局B","布局C","布局D");
	$changeStyle.text(atext[0]);
	$post.addClass(astyle[0]);
	$('#post').masonry({
		itemSelector: '.postitem',
		resize: true
	});
	$changeStyle.on("click",function(){
		$(this).text(atext[index]);
		$(this).parent().siblings().find(".post").attr("class","post").toggleClass(astyle[index]);
		index++;
		if(index >= astyle.length){
			index = 0;
		}
		$('#post').masonry({
			itemSelector: '.postitem',
			resize: true
		});
	});
});