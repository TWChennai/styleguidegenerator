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
		container.append("<div class='" + dataVal["childclass"] + " configDetails'>" + colorTemplate + "</div>");
		saveColor();
		removeColor();
		updateOptionsWithVar();
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
			 	"coltype" : parent.attr("class").substr(0,parent.attr("class").indexOf("configDetails") -1)
			 });

			 renderSAAS(); 
			 renderPreview();
		});
	};
	var removeColor = function(){
		$(".btnRemoveColor").off("click").on("click", function(evt){
			var parent = $(this).parent();
			colorList = _.without(colorList, _.findWhere(colorList,{'bgclassname' : parent.find(".txtbgColorClass").val()}))
			parent.remove();
			renderSAAS();
			renderPreview();
		});
	};
	var textTemplate = $(".text-template").html();
	$(".textAddLink").off('click').on('click', function(){
		var dataVal = $(this).data();
		var container = $(dataVal["target"]);
		container.append("<div class='" + dataVal["childclass"] + " configDetails'>" + textTemplate + "</div>");
		saveText(dataVal["element"]);
		removeText();
		updateOptionsWithVar();
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
				"lineHeight" : parent.find(".sltLineHeight").val(),
				"isBadge" : parent.hasClass("badgesText"),
	 		 	"txttype" : parent.attr("class").substr(0,parent.attr("class").indexOf("configDetails") -1),
	 		 	"classname" : parent.find(".txtFontClass").val()
			 });
			 renderSAAS(); 
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
			renderSAAS();
			renderPreview();

		});
	};

	
	var renderPreview = function(){
		colorList = _.sortBy(colorList, 'coltype');
		textList = _.sortBy(textList, 'txttype');

		var cssColorList = [];
		var cssTextList = [];

		for(i=0;i<colorList.length;i++){
			cssColorList.push({
			 	"bgclassname" : colorList[i]["bgclassname"],
			 	"txtclassname" : colorList[i]["txtclassname"],
			 	"colorCode" : _.findWhere(variableList,{'varName' : colorList[i]["colorCode"]})["varValue"],
			 	"coltype" : colorList[i]["coltype"]
			 });
		}

		for(i=0;i<textList.length;i++){
			cssTextList.push({});
			cssTextList[cssTextList.length-1]["element"] = textList[i]["element"];
			cssTextList[cssTextList.length-1]["hover"] = textList[i]["hover"];
			cssTextList[cssTextList.length-1]["bgcolor"] = (textList[i]["bgColor"])?_.findWhere(variableList,{'varName' : textList[i]["bgColor"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["fontColor"] = (textList[i]["fontColor"])?_.findWhere(variableList,{'varName' : textList[i]["fontColor"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["fontFamily"] = (textList[i]["fontFamily"])?_.findWhere(variableList,{'varName' : textList[i]["fontFamily"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["fontSize"] = (textList[i]["fontSize"])?_.findWhere(variableList,{'varName' : textList[i]["fontSize"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["fontSize"] = (textList[i]["fontWeight"])?_.findWhere(variableList,{'varName' : textList[i]["fontWeight"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["fontSize"] = (textList[i]["fontStyle"])?_.findWhere(variableList,{'varName' : textList[i]["fontStyle"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["textDecoration"] = (textList[i]["textDecoration"])?_.findWhere(variableList,{'varName' : textList[i]["textDecoration"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["textAlignment"] = (textList[i]["textAlignment"])?_.findWhere(variableList,{'varName' : textList[i]["textAlignment"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["textTransform"] = (textList[i]["textTransform"])?_.findWhere(variableList,{'varName' : textList[i]["textTransform"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["border"] = (textList[i]["border"])?_.findWhere(variableList,{'varName' : textList[i]["border"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["borderRadius"] = (textList[i]["borderRadius"])?_.findWhere(variableList,{'varName' : textList[i]["borderRadius"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["lineHeight"] = (textList[i]["lineHeight"])?_.findWhere(variableList,{'varName' : textList[i]["lineHeight"]})["varValue"]:"";
			cssTextList[cssTextList.length-1]["padding"] = (textList[i]["padding"])
			cssTextList[cssTextList.length-1]["isBadge"] = (textList[i]["isBadge"]);
			cssTextList[cssTextList.length-1]["txttype"] = textList[i]["txttype"];
			cssTextList[cssTextList.length-1]["classname"] = textList[i]["classname"];

		}

		var csscontainer = $(".csscontainer");
		csscontainer.html("/* Compiled CSS */")

		var colorTemplate = _.template(
	        $( "#colorcss-template" ).html()
	   	);
		csscontainer.append(colorTemplate(cssColorList));
		var textTemplate = _.template(
	        $( "#fontcss-template" ).html()
	   	);
	   	csscontainer.append(textTemplate(cssTextList));

		var currentType = "";
		var previewcss = "<style id='generatedcss'>.previewblock {width: 20%; border:1px solid #CCC; display: inline-block;margin-right:5px;}"
		previewcss +=  $(".csscontainer").html().replace("<br>" , "")  + "</style>";
		var previewHTML = "";
		var i;
		for(i=0;i<colorList.length;i++){
			if (currentType != colorList[i]["coltype"]){
				previewHTML += "<h2>" + cssColorList[i]["coltype"] + "</h2> <br/>";
			}

			previewHTML += "<div class='previewblock'>";
			previewHTML += "<div style='height:20px;background-color:" + cssColorList[i]["colorCode"] +"'> </div><br/>";
			previewHTML += "BG Color Class : " + cssColorList[i]["bgclassname"] + "<br/>";
			previewHTML += (colorList[i]["txtclassname"])? "Text Color Class : " + cssColorList[i]["txtclassname"] + "<br/>": "Text Color Class : -" + "<br/>";
			previewHTML += "<div>" + cssColorList[i]["colorCode"] + "</div><br/>" +"</div>";
			currentType = cssColorList[i]["coltype"] ;
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
			previewHTML += "<h3>Usage</h3>"
			previewHTML += "<div>" + "&lt;" + tagname + " class='" + textList[i]["classname"] +  "'&gt;";
			previewHTML += "Lorem Ipsum";
			previewHTML += "&lt;/" + tagname + "&gt;</div>";
			currentType = textList[i]["txttype"] ;
		}		
		$("#generatedcss").remove();
		$(previewcss).appendTo("head");
		$(".previewcontainer").html(previewHTML);
	};

	var variableList = [];
	var variableTemplate = $(".variable-template").html();
	var cntr = 0;
	$(".btnVariableAdd").off('click').on('click',function(){
		var dataVal = $(this).data();
		var container = $(dataVal["target"]);
		var updatedContainer =  $("<div class='" + dataVal["childclass"]  + cntr + "'>" + variableTemplate + "</div>").appendTo(container);
		updatedContainer.find(".value").hide();
		variableElementEvents();
		cntr++;
	});
	var variableElementEvents = function(){
		$(".sltVariableType").off("change").on("change", function(){
			var parent = $(this).parent();
			$(".value").show();
			if ($(this).val() == "color"){
				parent.find(".colorValue").show();
				parent.find(".txtValue").hide();
				parent.find(".txtValue").val("#000000");
			}else{
				parent.find(".colorValue").hide();
				parent.find(".txtValue").show();
				parent.find(".txtValue").val("");
			}
		});
		$(".colorValue").off("change").on("change", function(){
			$(".txtValue").val($(this).val());
		});
		$(".btnSaveVar").off("click").on('click', function(){
			var parent = $(this).parent();
			$(this).attr("disabled", "true");
			parent.find("input").attr("disabled", "true");
			variableList.push({
				'varType' : parent.find(".sltVariableType").val(),
				'varName' : parent.find(".txtVarName").val(),
				'varValue' : parent.find(".txtValue").val()
			});
			renderSAAS();
		});

		$(".btnRemoveVar").off("click").on("click", function(evt){
			var parent = $(this).parent();
			variableList = _.without(variableList, _.findWhere(variableList,
				{'varName' : parent.find(".txtVarName").val()}))
			parent.remove();
			renderSAAS();
		});
	};

	var renderSAAS = function(){
		var variableTemplate = _.template(
			$("#variablecss-template").html()
		);
		var saascontainer = $(".saascontainer");
		saascontainer.html("/* Variables */<br/>")
		saascontainer.append(variableTemplate(variableList));

		var colorTemplate = _.template(
	        $( "#colorcss-template" ).html()
	   	);
		saascontainer.append("/* Variables  End */<br/>");
		saascontainer.append(colorTemplate(colorList));
		var textTemplate = _.template(
	        $( "#fontcss-template" ).html()
	   	);
	   	saascontainer.append(textTemplate(textList));
	};

	var updateOptionsWithVar = function(){
		//Colors 
		var filteredVar = _.filter(variableList,
				{'varType' : "color"});
		$('.colorSwatch').html("<option></option>");
		$('.bgcolorSwatch').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.colorSwatch').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		     $('.bgcolorSwatch').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Border Radius
		filteredVar = _.filter(variableList,
				{'varType' : "Border Radius"});
		$('.txtBorderRadius').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtBorderRadius').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Border Style
		filteredVar = _.filter(variableList,
				{'varType' : "Border Style"});
		$('.txtBorderStyle').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtBorderStyle').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Border Size
		filteredVar = _.filter(variableList,
				{'varType' : "Border Size"});
		$('.txtBorderSize').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtBorderSize').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};
		//Font Family
		filteredVar = _.filter(variableList,
				{'varType' : "Font Family"});
		$('.txtFontFamily').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtFontFamily').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Font Size
		filteredVar = _.filter(variableList,
				{'varType' : "Font Size"});
		$('.txtFontSize').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtFontSize').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Font Weight
		filteredVar = _.filter(variableList,
				{'varType' : "Font Weight"});
		$('.txtFontWeight').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.txtFontWeight').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Font Style
		filteredVar = _.filter(variableList,
				{'varType' : "Font Weight"});
		$('.sltFontStyle').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.sltFontStyle').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Text Alignment
		filteredVar = _.filter(variableList,
				{'varType' : "Text Alignment"});
		$('.sltTextAlignment').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.sltTextAlignment').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Text Decoration
		filteredVar = _.filter(variableList,
				{'varType' : "Text Decoration"});
		$('.sltTextDecoration').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.sltTextDecoration').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Text Transformation
		filteredVar = _.filter(variableList,
				{'varType' : "Text Transformation"});
		$('.sltTextTransformation').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.sltTextTransformation').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

		//Line Height
		filteredVar = _.filter(variableList,
				{'varType' : "Line Height"});
		$('.sltLineHeight').html("<option></option>");
		for(i=0;i<filteredVar.length;i++) {   
		     $('.sltLineHeight').append($("<option>" + filteredVar[i]["varName"] +" </option>"));
		};

	};
})();