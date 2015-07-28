(function(){
	var accordionHeader = $(".accordion-header");
	accordionHeader.off("click").on("click", function(){
		$(this).toggleClass("open")
		$(this).parent().find(".accordion-content").slideToggle();
	});
	_.templateSettings.variable = "arr";
	
	var colorTemplate = $(".color-template").html();
	$(".btnColorAdd").off("click").on("click",function(){
		var dataVal = $(this).data();
		var container = $(dataVal["target"]);
		container.append("<div class='" + dataVal["childclass"] + "'>" + colorTemplate + "</div>");
		saveColor();
		removeColor();
	});
	var colorList = [];
	var saveColor = function(){
		$(".btnSaveColor").off("click").on("click", function(evt){
			var parent = $(this).parent();
			parent.find("input").attr('disabled','true');
			$(this).attr('disabled','true')
			 
			 colorList.push({
			 	"bgclassname" : parent.find(".txtbgColorClass").val(),
			 	"txtclassname" : parent.find(".txtColorClass").val(),
			 	"colorCode" : parent.find(".colorSwatch").val(),
			 	"coltype" : parent.attr("class")
			 });

			 renderCss(); 
			 renderPreview();
		});
	};
	var removeColor = function(){
		$(".btnRemoveColor").off("click").on("click", function(evt){
			var parent = $(this).parent();
			colorList = _.without(colorList, _.findWhere(colorList,{'bgclassname' : parent.find(".txtbgColorClass").val()}))
			parent.remove();
			renderCss();
			renderPreview();
		});
	};
	var textTemplate = $(".text-template").html();
	$(".textAddLink").off('click').on('click', function(){
		var dataVal = $(this).data();
		var container = $(dataVal["target"]);
		container.append("<div class='" + dataVal["childclass"] + " textDetails'>" + textTemplate + "</div>");
		saveText(dataVal["element"]);
		removeText();
	})

	var textList = [];
	var saveText = function(element){
		$(".btnSaveText").off("click").on("click", function(evt){
			var parent = $(this).parent();
			parent.find("input").attr('disabled','true');
			$(this).attr('disabled','true');
			 parent.find(".hidElement").val(element);
			 textList.push({
			 	"element" : parent.find(".txtFontClass").val()?element + "." + parent.find(".txtFontClass").val():element,
				"hover" : parent.find(".chkFontHover:checked").length,
				"bgColor" : parent.find(".chkbgcolor:checked").length ? parent.find(".bgcolorSwatch").val() : '',
				"fontColor" :parent.find(".chkcolor:checked").length ? parent.find(".colorSwatch").val() : '',
				"fontFamily" : parent.find(".txtFontFamily").val(),
				"fontSize" : parent.find(".txtFontSize").val(),
				"fontWeight" : parent.find(".txtFontWeight").val(),
				"fontStyle" : parent.find(".sltFontStyle").val(),
				"textDecoration" : parent.find(".sltTextDecoration").val(),	
				"textAlignment" : parent.find(".sltTextAlignment").val(),	
				"textTransform" : parent.find(".sltTextTransformation").val(),
				"border" : parent.find(".txtBorder").val(),
				"borderRadius" : parent.find(".txtBorderRadius").val(),
				"padding" : parent.find(".txtPadding").val(),
				"isBadge" : parent.hasClass("badgesText"),
	 		 	"txttype" : parent.attr("class"),
	 		 	"classname" : parent.find(".txtFontClass").val()
			 });
			 renderCss(); 
			renderPreview();

		});
	};
	var removeText = function(){
		$(".btnRemoveText").off("click").on("click", function(evt){
			var parent = $(this).parent();
			textList = _.without(textList, _.findWhere(textList,
				{'element' : parent.find(".txtFontClass").val()?parent.find(".hidElement").val() + "." + parent.find(".txtFontClass").val():parent.find(".hidElement").val(),
				'hover' : parent.find(".chkFontHover:checked").length
				}))
			parent.remove();
			renderCss();
			renderPreview();

		});
	};
	var renderCss = function(){
		var colorTemplate = _.template(
            $( "#colorcss-template" ).html()
       	);
       	var csscontainer = $(".csscontainer");
		csscontainer.html(colorTemplate(colorList));
		var textTemplate = _.template(
            $( "#fontcss-template" ).html()
       	);
       	csscontainer.append(textTemplate(textList));
	};
	
	var renderPreview = function(){
		colorList = _.sortBy(colorList, 'coltype');
		textList = _.sortBy(textList, 'txttype');

		var currentType = "";
		var previewcss = "<style id='generatedcss'>.previewblock {width: 20%; border:1px solid #CCC; display: inline-block;margin-right:5px;}"
		previewcss +=  $(".csscontainer").html()  + "</style>";
		var previewHTML = "";
		var i;
		for(i=0;i<colorList.length;i++){
			if (currentType != colorList[i]["coltype"]){
				previewHTML += "<h2>" + colorList[i]["coltype"] + "</h2> <br/>";
			}

			previewHTML += "<div class='previewblock'>";
			previewHTML += "<div style='height:20px;background-color:" + colorList[i]["colorCode"] +"'> </div><br/>";
			previewHTML += "BG Color Class : " + colorList[i]["bgclassname"] + "<br/>";
			previewHTML += (colorList[i]["txtclassname"])? "Text Color Class : " + colorList[i]["txtclassname"] + "<br/>": "Text Color Class : -" + "<br/>";
			previewHTML += "<div>" + colorList[i]["colorCode"] + "</div><br/>" +"</div>";
			currentType = colorList[i]["coltype"] ;
		}

		for(i=0;i<textList.length;i++){
			if (currentType != textList[i]["txttype"]){
				previewHTML += "<h2>" + textList[i]["txttype"] + "</h2> <br/>";
			}
			var tagname = "";
			switch(textList[i]["txttype"]){
				case "Links" :
					tagname = "a";
					break;
				case "buttons" :
					tagname = "button";
					break;
				case "H1" :
					tagname = "h1";
					break;
				case "H2" :
					tagname = "h2";
					break;
				case "H3" :
					tagname = "h3";
					break;
				case "H4" :
					tagname = "h4";
					break;
				case "H5" :
					tagname = "h5";
					break;
				case "H6" :
					tagname = "h6";
					break;
				case "p" :
					tagname = "p";
					break;
				case "OtherText" :
					tagname = "div";
					break;
				case "Badges" :
					tagname = "span";
					break;
			}
			previewHTML += "<" + tagname + " class='" + textList[i]["classname"] +  "'>";
			previewHTML += "Lorem Ipsum";
			previewHTML += "</" + tagname + "><br/>";
			currentType = textList[i]["coltype"] ;
		}		

		$("#generatedcss").remove();
		$(previewcss).appendTo("head");
		$(".previewcontainer").html(previewHTML);
	};
})();