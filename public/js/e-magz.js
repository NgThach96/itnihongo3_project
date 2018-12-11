$(function(){

	var loveNotSignin = function() {
		$(".love-not-signin").each(function() {
			$(this).click(function() {
				alert("Please, Sign In");
			})
		})
	}

	// love
	var love = function() {
		$(".love").each(function(){
			$(this).find("div").html($.number($(this).find("div").html()));
			$(this).click(function(){
				var countNow = $(this).find("div").html().replace(',', '');
				if(!$(this).hasClass("active")) {
		      var review_id = $(this).find(".review_id").html();
					$(this).find(".animated").remove();
					$(this).addClass("active");
					$(this).find("i").removeClass("ion-android-favorite-outline");
					$(this).find("i").addClass("ion-android-favorite");
					$(this).find("div").html(parseInt(countNow) + 1);
					$(this).find("div").html($.number($(this).find("div").html()));
					$(this).append($(this).find("i").clone().addClass("animated"));
					$(this).find("i.animated").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){
						$(this).remove();
					  $(this).off(e);
					});
					// add some code ("love")
					$(".dislike").each(function() {
						if ($(this).find(".review_id").html() == review_id) {
							if($(this).hasClass("active")) {
								var countNow = $(this).find("div").html().replace(',', '');
								$(this).removeClass("active");
								$(this).find("i").removeClass("fas fa-thumbs-down");
								$(this).find("i").addClass("far");
								$(this).find("i").addClass("fa-thumbs-down");
								$(this).find("div").html(parseInt(countNow) - 1);
								$(this).find("div").html($.number($(this).find("div").html()));
							}
						}
					});

					$.ajax({
						url: "reviews/likeaction",
						type: "POST",
						data: { "emotion_type" : 1, "type" : 1, "review_id" : review_id },
						dataType: "json",
						success: function(data) {

						}
					});

				}else{
		      var review_id = $(this).find(".review_id").html();
					$(this).find(".animated").remove();
					$(this).removeClass("active");
					$(this).find("i").addClass("ion-android-favorite-outline");
					$(this).find("i").removeClass("ion-android-favorite");
					$(this).find("div").html(parseInt(countNow) - 1);
					$(this).find("div").html($.number($(this).find("div").html()));

					// add some code ("love")
					$.ajax({
						url: "reviews/likeaction",
						type: "POST",
						data: { "emotion_type" : 1, "type" : 0, "review_id" : review_id },
						dataType: "json",
						success: function(data) {

						}
					});

				}
				return false;
			});
		});
	}

	// love
	var dislike = function() {
		$(".dislike").each(function(){
			$(this).find("div").html($.number($(this).find("div").html()));
			$(this).click(function(){
				var countNow = $(this).find("div").html().replace(',', '');
				if(!$(this).hasClass("active")) {
		      var review_id = $(this).find(".review_id").html();
					$(this).find(".animated").remove();
					$(this).addClass("active");
					$(this).find("i").removeClass("far");
					$(this).find("i").removeClass("fa-thumbs-down");
					$(this).find("i").addClass("fas fa-thumbs-down");
					$(this).find("div").html(parseInt(countNow) + 1);
					$(this).find("div").html($.number($(this).find("div").html()));
					$(".love").each(function() {
						if( $(this).find(".review_id").html() == review_id) {
							if( $(this).hasClass("active")) {
								var countNow = $(this).find("div").html().replace(',', '');
								$(this).find(".animated").remove();
								$(this).removeClass("active");
								$(this).find("i").addClass("ion-android-favorite-outline");
								$(this).find("i").removeClass("ion-android-favorite");
								$(this).find("div").html(parseInt(countNow) - 1);
								$(this).find("div").html($.number($(this).find("div").html()));
							}
						}
					});
					// add some code ("love")
					$.ajax({
						url: "reviews/likeaction",
						type: "POST",
						data: { "emotion_type" : 0, "type" : 1, "review_id" : review_id },
						dataType: "json",
						success: function(data) {

						}
					});
				}else{
		      var review_id = $(this).find(".review_id").html();
					$(this).removeClass("active");
					$(this).find("i").removeClass("fas fa-thumbs-down");
					$(this).find("i").addClass("far");
					$(this).find("i").addClass("fa-thumbs-down");
					$(this).find("div").html(parseInt(countNow) - 1);
					$(this).find("div").html($.number($(this).find("div").html()));

					// add some code ("unlove")
					$.ajax({
						url: "reviews/likeaction",
						type: "POST",
						data: { "emotion_type" : 0, "type" : 0, "review_id" : review_id },
						dataType: "json",
						success: function(data) {

						}
					});
				}
				return false;
			});
		});
	}




	// newsletter
	var newsletter = function() {
		$(".newsletter").submit(function(){
			var $this = $(this),
			newsletter = {
				start: function() {
					$this.find(".icon").addClass("spin");
					$this.find(".icon i").removeClass("ion-ios-email-outline");
					$this.find(".icon i").addClass("ion-load-b");
					$this.find(".icon h1").html("Please wait ...");
					$this.find(".btn").attr("disabled", true);
					$this.find(".email").attr("disabled", true);
				},
				end: function() {
					$this.find(".icon").removeClass("spin");
					$this.find(".icon").addClass("success");
					$this.find(".icon i").addClass("ion-checkmark");
					$this.find(".icon i").removeClass("ion-load-b");
					$this.find(".icon h1").html("Thank you!");
					$this.find(".email").val("");
					$this.find(".btn").attr("disabled", false);
					$this.find(".email").attr("disabled", false);
					$.toast({
						text: "Thanks for subscribing!",
						position: 'bottom-right',
						bgcolor: '#E01A31',
						icon: 'success',
						heading: 'Newsletter',
						loader: false
					});
				},
				error: function() {
					$this.find(".icon").removeClass("spin");
					$this.find(".icon").addClass("error");
					$this.find(".icon i").addClass("ion-ios-close-outline");
					$this.find(".icon i").removeClass("ion-load-b");
					$this.find(".icon h1").html("Failed, try again!");
					$this.find(".btn").attr("disabled", false);
					$this.find(".email").attr("disabled", false);
					$.toast({
						text: "Failed, network error. Please try again!",
						position: 'bottom-right',
						icon: 'error',
						heading: 'Newsletter',
						loader: false
					});
				}
			}

			if($this.find(".email").val().trim().length < 1) {
				$this.find(".email").focus();
			}else{
				/*
				 * Add your ajax code
				 * ------------------
				 * For example:
				 * $.ajax({
				 * 		url: "subscribe_url",
				 * 		type: "post",
				 *  	data: $this.serialize(),
				 * 		error: function() {
				 * 			newsletter.error();
				 * 		},
				 * 		beforeSend: function() {
				 * 			newsletter.start();
				 * 		},
				 * 		success: function() {
				 * 			newsletter.end();
				 * 		}
				 * });
				 });
				*/

				newsletter.start();

				setTimeout(function(){
					newsletter.end();
				}, 2000);
			}

			return false;
		});
	}

	var featuredImage = function() {
	  $("#featured figure img").each(function(){
	  	$(this).parent().css({
	  		backgroundImage: 'url('+$(this).attr('src')+')',
	  		backgroundSize: 'cover',
	  		backgroundRepeat: 'no-repeat',
	  		backgroundPosition: 'center'
	  	});
	  	$(this).remove();
	  });
	}

	var headline = function() {
	  var headlineCarousel = $("#headline").owlCarousel({
	  	items: 1,
	  	dots: false,
	  	// autoplay: true,
	  	autoplayTimeout: 3000,
	  	loop: true
	  });

		$("#headline-nav [data-slide=next]").click(function(){
			headlineCarousel.trigger('next.owl.carousel');
		});

		$("#headline-nav [data-slide=prev]").click(function(){
			headlineCarousel.trigger('prev.owl.carousel');
		});
	}

  // floating label
  var floatingLabel = function() {
	  $(".floating.focus").each(function(){
	  	$(this).find(".form-control").focus(function(){
	  		$(this).parent().addClass("focused");
	  	}).on("blur", function(){
	  		if($(this).val().trim().length < 1) {
		  		$(this).parent().removeClass("focused");
	  		}
	  	});
	  });
  }

  // browser
	if($.browser.safari) {
		$("head").append($("<link/>", {
			rel: "stylesheet",
			href: "css/safari.css"
		}));
	}else if($.browser.mozilla) {
		$(".social li").each(function() {
			$(this).find("rect").attr("width", "100%");
			$(this).find("rect").attr("height", "100%");
		});
	}

	var featured = function() {
		$("#featured").owlCarousel({
			items: 1,
			dots: false,
			// autoplay: true,
			loop: true
		});
	}

	var magnificGallery = function() {
		$('[data-magnific="gallery"]').each(function(){
			var $this = $(this);

			$this.magnificPopup({
				type: 'image',
				delegate: 'a',
				gallery: {
					enabled: true
				},
				preloader: true,
	  		})
		});
	}

	// ease scroll
	var easeScrollFunc = function() {
		$("html").easeScroll();
	}

	var toggleMobile = function() {
		$(document).on("click", "[data-toggle=menu]", function() {
			var $this = $(this),
					$target = $($this.data("target"));

			backdrop.click(function() {
				$(".nav-list").removeClass("active");
				$(".nav-list .dropdown-menu").removeClass("active");
				$(".nav-title a").text("Menu");
				$(".nav-title .back").remove();
				$("body").css({
					overflow: "auto"
				});
				backdrop.hide();
			});

			$("body").css({
				overflow: "hidden"
			});
			backdrop.show('#menu-list');
			setTimeout(function() {
				$target.find('.nav-list').addClass("active");
			},50);
			return false;
		});

		$(document).on("click", ".nav-list li.magz-dropdown > a", function() {
			var $this = $(this),
					$parent = $this.parent(),
					$titleBefore = $this.text(),
					$back = '<div class="back"><i class="ion-ios-arrow-left"></i></div>';

			if($(".nav-title .back").length) {
				var titleNow = $(".nav-title .back").attr('data-title');
				titleNow += ("," + $this.text());
				$(".nav-title .back").attr('data-title', titleNow);
			}else{
				$(".nav-title").prepend($($back).attr('data-title', $(".nav-title a").text() + "," + $this.text()));
			}
			$(".nav-title a").html($this.text());
			$parent.find("> .dropdown-menu").fadeIn(100).addClass("active");
			return false;
		});

		var titleLen = 0;
		$(document).on("click", ".nav-title .back", function() {
			var $dd = $(".dropdown-menu.active"),
					$len = $dd.length,
					title;

			$dd.eq($len-1).removeClass("active");
			setTimeout(function() {
				$dd.eq($len-1).hide();
			},500);
			title = $(this).attr('data-title').split(",");
			titleLen = title.length-1;
			title = title.splice(0, titleLen);
			$(".nav-title a").text(title[title.length-1]);
			$(".nav-title .back").attr('data-title', title);
			if((title.length-1) == 0) {
				$(".nav-title .back").remove();
			}
			return false;
		});

		if(!$("#sidebar").length) {
			$("[data-toggle=sidebar]").hide();
		}
		$(document).on("click", "[data-toggle=sidebar]", function() {
			var $this = $(this),
					$target = $($this.data("target"));

			backdrop.click(function() {
				backdrop.hide();
				$target.removeClass("active");
				$("body").css({
					overflow: "auto"
				});
			});

			$("body").css({
				overflow: "hidden"
			});
			backdrop.show();
			setTimeout(function() {
				$target.addClass("active");
			},50);
			return false;
		});
	}

	var showPassword = function() {
		$("input[type='password']").each(function(i) {
			var $this = $(this);

			$this.wrap($("<div/>", {
				style: 'position:relative'
			}));
			$this.css({
				paddingRight: 60
			});
			$this.after($("<div/>", {
				html: 'Show',
				class: 'btn btn-primary btn-sm',
				id: 'passeye-toggle-'+i,
				style: 'position:absolute;right:10px;top:50%;transform:translate(0,-50%);-webkit-transform:translate(0,-50%);-o-transform:translate(0,-50%);padding: 2px 7px;font-size:12px;cursor:pointer;'
			}));
			$this.after($("<input/>", {
				type: 'hidden',
				id: 'passeye-' + i
			}));
			$this.on("keyup paste", function() {
				$("#passeye-"+i).val($(this).val());
			});
			$("#passeye-toggle-"+i).on("click", function() {
				if($this.hasClass("show")) {
					$this.attr('type', 'password');
					$this.removeClass("show");
					$(this).removeClass("btn-magz");
					$(this).addClass("btn-primary");
				}else{
					$this.attr('type', 'text');
					$this.val($("#passeye-"+i).val());
					$this.addClass("show");
					$(this).removeClass("btn-primary");
					$(this).addClass("btn-magz");
				}
			});
		});
	}

	var sendContactForm = function() {
		$("#contact-form").submit(function() {
			var $this = $(this);
			$.ajax({
				url: 'server/send.php',
				type: "post",
				data: $this.serialize(),
				dataType: 'json',
				beforeSend: function() {
					loading.show();
				},
				complete: function() {
					loading.hide();
				},
				success: function(data) {
					if(data.status == true) {
						swal("Success", data.data, "success");
						$this[0].reset();
					}else{
						swal("Failed", data.data, "error");
					}
				}
			});
			return false;
		});
	}

	var loadFile = function() {
		$("[data-load]").each(function() {
			var $this = $(this);

			$.ajax({
				url: $this.attr('data-load'),
				beforeSend: function() {
					$this.html('Loading data ...');
				},
				error: function(xhr) {
					$this.html("[ERROR] Status: " + xhr.status + "\nResponse Text:\n " + xhr.responseText);
				},
				success: function(data) {
					$this.html(data);
				}
			})
		});
	}

	var comment = function() {
		$(".comment-text-box").each(function() {
			$(this).keyup(function(e) {
					if(e.keyCode == 13) {
						var content = $(this).val();
						var user_name = $(document).find('#user_name').text().slice(3);
						var user_img = $(document).find('#user_image_img').prop("src");
						var review_id = $(this).parents(".article-list").find(".review_id").html();
						var date = new Date().toLocaleString();
						$(this).parents(".actionBox").find(".commentList").append(
							"<li> \
                  <div class=\"commenterImage\"> \
                    <img src=\""+ user_img + "\"> \
                  </div> \
                  <div class=\"commentText\"> \
                      <p class=\"abc\"> \
                        <span class=\"user-comment\" style=\"color: red;margin-right: 5px; font-weight: bold;\">" +
                        user_name + "</span>"
                        + content +
                      "</p> \
                      <p class=\"date sub-text\"> "
                        + date + "\
                      </p> \
											<span><a class=\"reply\" style=\"font-size: 10px\">Reply</a></span> \
                  </div> \
              </li>");
						$(this).val("");
						$.ajax({
							url: "reviews/commentaction",
							type: "POST",
							data: { "content" : content, "review_id" : review_id },
							dataType: "json",
							success: function(data) {
							}
						});
					}
			})
		});
	}

	var review = function() {

		$('#li_review').on("click", function() {
			$('#myModal').css('display', 'block');
		});

		$('#close').on("click", function() {
			$('#myModal').css('display', 'none');
		});

	}

	var commentnotsigin = function() {
		$('.comment-text-box-signin').each(function() {
			$(this).keyup(function (e) {
					if(e.keyCode == 13) {
					alert("Please, Sign in");
				}
			});
		});
	}

	var comment_li_on_hover = function() {
		$('.commentText').each(function() {
			$(this).mouseenter(function() {
				$(this).find(".control-comment").css("visibility", "visible");
			});

			$(this).mouseleave(function() {
				$(this).find(".control-comment").css("visibility", "hidden");
			});
		});
	}

	var control_comment = function() {
		$('.control-comment-delete').each(function() {
			$(this).on('click', function() {
				var commentId = $(this).parents(".control-comment").find('.comment-id').text();
				var r = confirm("Are you sure ?");
				if ( r == true ) {
					$(this).parents(".comment-li").html("");
					$.ajax({
						url: "reviews/deleteCommentAct",
						type: "POST",
						data: { "commentId" : commentId },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succeed");
						// }
					});
				} else {
					alert("Cancel");
				}
			});
		});

		$('.control-comment-edit').each(function() {
			$(this).on('click', function() {
				var commentId = $(this).parents(".control-comment").find('.comment-id').text();
				var comment = prompt("Please enter your comment:", "your comment");
    		if (comment == null || comment == "") {
        	alert("Canceled");
    		} else {
    			$(this).parents(".commentText").find(".comment-naiyou").text(comment);
    			$.ajax({
						url: "reviews/editCommentAct",
						type: "POST",
						data: { "commentId" : commentId, "comment" : comment },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succed");
						// }
					});
    		}
			});
		});
	}

	var comment_icon = function() {
		$('.comment-icon').each(function() {
			$(this).on('click', function() {
				$(this).parents(".article-list").find(".detailBox").fadeToggle();
			});
		});
	}

	var change_user = function() {

		$('#change_name_icon').each(function() {
			$(this).on('click', function() {
				$(this).parents(".article-list").find("#change_name").fadeToggle();
				$(this).parents(".article-list").find("#enter").fadeIn();
			});
		})

		$('#change_email_icon').each(function() {
			$(this).on('click', function() {
				$(this).parents(".article-list").find("#change_email").fadeToggle();
				$(this).parents(".article-list").find("#enter").fadeIn();
			});
		})

		$('#change_address_icon').each(function() {
			$(this).on('click', function() {
				$(this).parents(".article-list").find("#change_address").fadeToggle();
				$(this).parents(".article-list").find("#enter").fadeIn();
			});
		})

		$('#change_birthday_icon').each(function() {
			$(this).on('click',function() {
				$(this).parents(".article-list").find("#change_birthday").fadeToggle();
				$(this).parents(".article-list").find("#enter").fadeIn();
			});
		})

		$('#change_gender_icon').each(function() {
			$(this).on('click',function() {
				$(this).parents(".article-list").find("#change_gender").fadeToggle();
				$(this).parents(".article-list").find("#enter").fadeIn();
			});
		})
	}


	var delete_review = function() {
		$('.delete-reviews').each(function() {
			$(this).on('click', function() {
				var reviewId = $(this).parents(".article-mini").find(".review-id").text();
				var r = confirm("Are you sure ?");
				if (r == true)
				{
					$(this).parents(".article-mini").html("");
					$.ajax({
						type: "POST",
						url: "/reviews/deleteReview",
						data: {  "reviewId" : reviewId },
						dataType: "json",
						success: function(data) {
							alert("delete succeed");
						}
					});
				} else {
					alert("Cancel");
				}
			});
		});
	}

	var radio_on_click = function() {
		$('.radio-rate').each(function() {
			$(this).on('click', function() {
				value = $(this).find('input').val();
				$(this).find("i").removeClass("far fa-star");
				$(this).find("i").addClass("fas fa-star");
				for(i = 1; i < value; i++) {
					$(this).parents(".col-md-7").find(".rate" + i).removeClass("far fa-star");
					$(this).parents(".col-md-7").find(".rate" + i).addClass("fas fa-star");
				}
				for(i = parseInt(value) + 1; i <= 5; i++) {
					$(this).parents(".col-md-7").find(".rate" + i).removeClass("fas fa-star");
					$(this).parents(".col-md-7").find(".rate" + i).addClass("far fa-star");
				}
			});
		});
	}

	var preview_img = function() {
		$('.image_upload').each(function() {
				var preview = $(this).parents(".field").find("img");
					$(this).change(function(event) {
					var input = $(event.currentTarget);
		      var file = input[0].files[0];
		      var reader = new FileReader();
		      reader.onload = function(e){
		          image_base64 = e.target.result;
		          preview.attr("src", image_base64);
		      };
		      reader.readAsDataURL(file);
			});
		});
	}

	var create_comment = function() {
		$('#submit_signin').each(function() {
			$(this).on('click',function() {
				var content = $(this).parents(".comments").find(".content-comment").val();
				var user_name = $(document).find('#user_name').text().slice(3);
				var date = new Date().toLocaleString();
				var review_id = $(this).parents(".comments").find("#reviewID").val();
				// alert(review_id);
				$(this).parents(".comments").find(".comment-list").append(
					"<div class=\"item\"> \
					<div class=\"user\"> \
					<figure><img src=\"/assets/avatar.png\"></figure> \
					<div class=\"details\"> \
					<p style=\"font-size: 15px\" class=\"name\">" + user_name + "</p> \
					<div class=\"time\">" + date + "</div> \
					<div class=\"description\">" + content + "</div> \
					<a class=\"reply\" style=\"font-size: 12px\">Reply</a> \
					</div></div></div>");
				$(this).parents(".comments").find(".content-comment").val("");
				$.ajax({
					url: "/reviews/commentaction",
					type: "POST",
					data:  { "content" : content, "review_id" : review_id },
					dataType: "json",
					// success: function(data) {
					// 	alert("success");
					// }
				});
			});
		});
	}

	var create_comment_notsignin = function() {
		$("#submit_notsignin").each(function() {
			$(this).on('click',function() {
				alert("Please sign in cc");
			});
		});
	}

	var reply_single_page = function() {
		$(".reply").each(function() {
			$(this).on('click',function() {
				$(this).parents(".item").find(".reply-list").fadeToggle();
			});
		});
	}

	var reply_home_page = function() {
		$(".reply").each(function() {
			$(this).on('click',function() {
				$(this).parents(".comment-li").find(".reply-list").fadeToggle();
			});
		});
	}

  var create_reply_notsignin = function() {
  	$(".content-reply-not-signin").each(function() {
  		$(this).keyup(function(e) {
  			if (e.keyCode == 13) {
  				alert("Please sign in");
  			}
  		});
  	});
  }

	var create_reply = function() {
		$(".content-reply").each(function() {
			$(this).keyup(function(e) {
				if (e.keyCode == 13) {
					var content = $(this).val();
					var user_name = $(document).find('#user_name').text().slice(3);
					var comment_id = $(this).parents(".item").find(".comment_id").html();
					var count_reply = $(this).parents(".item").find(".count_reply").html();
					++count_reply;
					var date = new Date().toLocaleString();
					$(this).parents(".item").find(".reply-item2").append(
					"<div class=\"user\"> \
					<figure><img src=\"/assets/avatar.png\"></figure> \
					<div class=\"details\"> \
					<p style=\"font-size: 15px\" class=\"name\">" + user_name + "\
					<span style=\"font-size: 10px; margin-left: 10px;\" class=\"time\">" + date + "</span></p> \
					<div class=\"description\">" + content + "</div></div></div>");
					$(this).parents(".item").find(".count_reply").html(count_reply);
					$(this).val("");
					$.ajax({
						url: "/reviews/replyaction",
						type: "POST",
						data: { "content" : content, "comment_id" : comment_id },
						dataType: "json",
						// success: function(data) {
						// alert("reply success")}
					});
				}
			});
		});
	}

	var create_reply_homepage = function() {
		$(".content-reply-homepage").each(function() {
			$(this).keyup(function(e) {
				if (e.keyCode == 13) {
					var content = $(this).val();
					var user_name = $(document).find('#user_name').text().slice(3);
					var user_img = $(this).parents(".comment-li").find(".image_hp").prop("src");
					var comment_id = $(this).parents(".comment-li").find(".comment_id_hp").html();
					var count_reply = $(this).parents(".comment-li").find(".count_reply").html();
					++count_reply;
					var date = new Date().toLocaleString();
					$(this).parents(".reply-list").find(".reply-item1").append(
					"<div class=\"commenterImage\"><img src=\"/assets/avatar.png\"></div> \
					<div class=\"comment-text\" style=\"margin-left: 45px\"> \
						<p style=\"margin-bottom: 0px\"> \
							<span class=\"user-comment\" style=\"color: red; margin-right: 5px; font-weight: bold\">" + user_name + "</span> \
							<span class=\"comment-naiyou\">" + content + "</span> \
						</p> \
						<p style=\"display: inline-block\" class=\"date sub-text\">" + date + "</p></div>");
					$(this).parents(".comment-li").find(".count_reply").html(count_reply);
					$(this).val("");
					$.ajax({
						url: "/reviews/replyaction",
						type: "POST",
						data: { "content" : content, "comment_id" : comment_id },
						dataType: "json",
						// success: function(data) {
						// alert("reply homepage success")}
					});
				}
			});
		});
	}

	var show_edit_com = function() {
		$(".details").each(function() {
			$(this).mouseenter(function() {
				$(this).find(".control_comment_sp").css("visibility","visible");
			});
			$(this).mouseleave(function() {
				$(this).find(".control_comment_sp").css("visibility","hidden");
			});
		});
	}

	var show_edit_rep = function() {
		$(".reply-item").each(function() {
			$(this).mouseenter(function() {
				$(this).find(".control_reply_sp").css("visibility","visible");
			});
			$(this).mouseleave(function() {
				$(this).find(".control_reply_sp").css("visibility","hidden");
			});
		});
	}

	var show_edit_rep_hp = function() {
		$(".comment-text").each(function() {
			$(this).mouseenter(function() {
				$(this).find(".control_reply").css("visibility","visible");
			});
			$(this).mouseleave(function() {
				$(this).find(".control_reply").css("visibility","hidden");
			});
		});
	}




	var control_comment_sp = function() { /*chuan*/
		$('.control-comment-delete-sp').each(function() {
			$(this).on('click', function() {
				var commentId = $(this).parents(".control_comment_sp").find('.comment_id_sp').text();
				// alert(commentId);
				var r = confirm("Are you sure ?");
				if ( r == true ) {
					$(this).parents(".item").html("");
					// $(this).parents(".item").css("border-bottom","0px solid #ddd");
					$.ajax({
						url: "/reviews/deleteCommentAct",
						type: "POST",
						data: { "commentId" : commentId },
						dataType: "json",
						success: function(data) {
							alert("Succeed");
						}
					});
				} else {
					alert("Cancel");
				}
			});
		});

	$('.control-comment-edit-sp').each(function() {
			$(this).on('click', function() {
				var commentId = $(this).parents(".control_comment_sp").find('.comment_id_sp').text();
				var comment = prompt("Please enter your comment:", "your comment");
				if (comment == null || comment == "") {
					alert("Canceled");
				} else {
					$(this).parents(".details").find(".description").text(comment);
					$.ajax({
						url: "/reviews/editCommentAct",
						type: "POST",
						data: { "commentId" : commentId, "comment" : comment },
						dataType: "json",
						success: function(data) {
							alert("Succeed");
						}
					});
				}
			});
		});
	}

	var control_reply = function() {
		$('.control-reply-delete').each(function() {
			$(this).on('click', function() {
				var replyId = $(this).parents(".control_reply").find('.reply-id').text();
				var count_reply = $(this).parents(".comment-li").find(".count_reply_hp");
				--count_reply;
				// alert(count_reply);
				var r = confirm("Are you sure ?");
				if ( r == true ) {
					// $(this).parents(".comment-li").find(".count_reply_hp").html(count_reply);
					$(this).parents(".reply-item").html("");

					// $(this).parents(".item").css("border-bottom","0px solid #ddd");
					$.ajax({
						url: "/reviews/deleteReplyAct",
						type: "POST",
						data: { "replyId" : replyId },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succeed");
						// }
					});
				} else {
					alert("Cancel");
				}
			});
		});

	$('.control-reply-edit').each(function() {
			$(this).on('click', function() {
				var replyId = $(this).parents(".control_reply").find('.reply-id').text();
				var reply = prompt("Please enter your comment:", "your comment");
				if (reply == null || reply == "") {
					alert("Canceled");
				} else {
					$(this).parents(".reply-item").find(".comment-naiyou").text(reply);
					$.ajax({
						url: "/reviews/editReplyAct",
						type: "POST",
						data: { "replyId" : replyId, "reply" : reply },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succeed");
						// }
					});
				}
			});
		});
	}

	var control_reply_sp = function() {
		$('.control-reply-delete-sp').each(function() {
			$(this).on('click', function() {
				var replyId = $(this).parents(".control_reply_sp").find('.reply_id_sp').text();
				var count_reply = $(this).parents(".item").find(".count_reply").html();
				--count_reply;
				var r = confirm("Are you sure ?");
				if ( r == true ) {
					$(this).parents(".item").find(".count_reply").html(count_reply);
					$(this).parents(".reply-item").html("");

					// $(this).parents(".item").css("border-bottom","0px solid #ddd");
					$.ajax({
						url: "/reviews/deleteReplyAct",
						type: "POST",
						data: { "replyId" : replyId },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succeed");
						// }
					});
				} else {
					alert("Cancel");
				}
			});
		});

	$('.control-reply-edit-sp').each(function() {
			$(this).on('click', function() {
				var replyId = $(this).parents(".control_reply_sp").find('.reply_id_sp').text();
				var reply = prompt("Please enter your comment:", "your comment");
				if (reply == null || reply == "") {
					alert("Canceled");
				} else {
					$(this).parents(".reply-item").find(".description").text(reply);
					$.ajax({
						url: "/reviews/editReplyAct",
						type: "POST",
						data: { "replyId" : replyId, "reply" : reply },
						dataType: "json",
						// success: function(data) {
						// 	alert("Succeed");
						// }
					});
				}
			});
		});
	}

	var auto_search = function() {
	    $('#searchbar').autocomplete({
	      source: 'reviews/autocomplete_review_food_name',
	      create: function () {
	            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
	              var markup = [
	                '<span class="img">',
	                  '<img src="' + item.url.url + '" />',
	                '</span>',
	                '<span class="title">' + item.value + '</span>',
	                '<span class="author">' + item.title + '</span>',
	                '<span class="price">' + item.price + 'VND</span>'
	              ];
	              return $('<li>')
	                .append(markup.join(''))
	                .appendTo(ul);
	            };
	        }
	    });
	}

	$('#demo').text("1,000,000");
	var price_choose = function() {
		$('#myRange').on("input", function() {
			$('#demo').text($(this).val() + "0," + "000");
			$(this).attr("value", parseInt($(this).val()));
  		var search_text = $('#search_text').text();
			var value = $('#hidden_test_id').val();
			var price = $(this).val();
  		var sort = $('#sort').find(":selected").text();
  		var location = $('#location').val();

  		$('.search_content').html("");
  		$.ajax({
				url: "reviews/searchAction",
				type: "POST",
				data: { "value" : value, "type": "radio", "search_text": search_text, "price": price, "sort": sort, "location": location},
				dataType: "json",
				success: function(data) {
					var test = [];
					data.res.forEach(function(entry) {
						var date = entry.created_at.replace("T", " ").replace(".000Z", " UTC");
						var markup =[
						'<article class="col-md-12 article-list">',
              '<div class="inner">',
                '<figure>',
                  '<a href="reviews/show/' + entry.id +'">',
                    '<img src="' + entry.food_picture.url + '">',
                  '</a>',
                '</figure>',
                '<div class="details">',
                  '<div class="detail">',
                    '<time>' + date + '</time>',
                  '</div>',
                  '<h1><a href="reviews/show/' + entry.id + '">' + entry.title + '</a></h1>',
                  '<p style="font-weight: bold;">' + entry.store_address + '</p>',
                  '<p>' + entry.food_name +' - ' + entry.price + '</p>',
                  '<p>' + 'Donec consequat, arcu at ultrices sodales, quam erat aliquet diam, sit amet interdum libero nunc accumsan nisi.' + '</p>',
                  '<footer>',
                    '<a class="btn btn-primary more" href="reviews/show/' + entry.id +'">',
                      '<div>More</div>',
                      '<div><i class="ion-ios-arrow-thin-right"></i></div>',
                    '</a>',
                  '</footer>',
                '</div>',
              '</div>',
            '</article>'];
					 	test.push(markup.join(''));
					});
					$('.search_content').html(test);
				}
			});
		})
	}

  var search_tool = function() {
  	var search_text = $('#search_text').text();
  	$('input[type=checkbox]').on("ifChanged", function(event) {
  		var price = $("#myRange").attr("value");
  		var value = $(this).val();
  		var sort = $('#sort').find(":selected").text();
  		var location = $('#location').val();

  		$('.search_content').html("");
  		$.ajax({
				url: "reviews/searchAction",
				type: "POST",
				data: { "value" : value, "type": "checkbox", "search_text": search_text, "price": price, "sort": sort, "location": location},
				dataType: "json",
				success: function(data) {
					$('.search_content').html(data.post);
				}
			});
  	});

  	$('input[type=radio]').on("ifChecked", function(event) {
  		var sort = $('#sort').find(":selected").text();
  		var price = $("#myRange").attr("value");
  		var value = $(this).val();
  		var location = $('#location').val();

  		$('#hidden_test_id').val(value);
  		$('.search_content').html("");
  		$.ajax({
				url: "reviews/searchAction",
				type: "POST",
				data: { "value" : value, "type": "radio", "search_text": search_text, "price": price, "sort": sort, "location": location},
				dataType: "json",
				success: function(data) {
					var test = [];
					data.res.forEach(function(entry) {
						var date = entry.created_at.replace("T", " ").replace(".000Z", " UTC");
						var markup =[
						'<article class="col-md-12 article-list">',
              '<div class="inner">',
                '<figure>',
                  '<a href="reviews/show/' + entry.id +'">',
                    '<img src="' + entry.food_picture.url + '">',
                  '</a>',
                '</figure>',
                '<div class="details">',
                  '<div class="detail">',
                    '<time>' + date + '</time>',
                  '</div>',
                  '<h1><a href="reviews/show/' + entry.id + '">' + entry.title + '</a></h1>',
                  '<p style="font-weight: bold;">' + entry.store_address + '</p>',
                  '<p>' + entry.food_name +' - ' + entry.price + '</p>',
                  '<p>' + 'Donec consequat, arcu at ultrices sodales, quam erat aliquet diam, sit amet interdum libero nunc accumsan nisi.' + '</p>',
                  '<footer>',
                    '<a class="btn btn-primary more" href="reviews/show/' + entry.id +'">',
                      '<div>More</div>',
                      '<div><i class="ion-ios-arrow-thin-right"></i></div>',
                    '</a>',
                  '</footer>',
                '</div>',
              '</div>',
            '</article>'];
					 	test.push(markup.join(''));
					});
					$('.search_content').html(test);
				}
			});
  	});
  }

  var sort_by = function() {
  	$('#sort').on('change', function() {
  		var search_text = $('#search_text').text();
  		var sort = $(this).find(":selected").text();
  		var price = $("#myRange").attr("value");
  		var value = $('#hidden_test_id').val();
  		var location = $('#location').val();

  		$('.search_content').html("");
  		$.ajax({
				url: "reviews/searchAction",
				type: "POST",
				data: { "value" : value, "type": "radio", "search_text": search_text, "price": price, "sort": sort, "location": location},
				dataType: "json",
				success: function(data) {
					var test = [];
					data.res.forEach(function(entry) {
						var date = entry.created_at.replace("T", " ").replace(".000Z", " UTC");
						var markup =[
						'<article class="col-md-12 article-list">',
              '<div class="inner">',
                '<figure>',
                  '<a href="reviews/show/' + entry.id +'">',
                    '<img src="' + entry.food_picture.url + '">',
                  '</a>',
                '</figure>',
                '<div class="details">',
                  '<div class="detail">',
                    '<time>' + date + '</time>',
                  '</div>',
                  '<h1><a href="reviews/show/' + entry.id + '">' + entry.title + '</a></h1>',
                  '<p style="font-weight: bold;">' + entry.store_address + '</p>',
                  '<p>' + entry.food_name +' - ' + entry.price + '</p>',
                  '<p>' + 'Donec consequat, arcu at ultrices sodales, quam erat aliquet diam, sit amet interdum libero nunc accumsan nisi.' + '</p>',
                  '<footer>',
                    '<a class="btn btn-primary more" href="reviews/show/' + entry.id +'">',
                      '<div>More</div>',
                      '<div><i class="ion-ios-arrow-thin-right"></i></div>',
                    '</a>',
                  '</footer>',
                '</div>',
              '</div>',
            '</article>'];
					 	test.push(markup.join(''));
					});
					$('.search_content').html(test);
				}
			});
  	})

  }

  var search_location = function() {
  	$("#location").on("keypress", function(event) {
  		if(event.keyCode === 10 || event.keyCode === 13) {
  			event.preventDefault();
  		}
  		var search_text = $('#search_text').text();
  		var sort = $('#sort').find(":selected").text();
  		var price = $("#myRange").attr("value");
  		var value = $('#hidden_test_id').val();
  		var location = $(this).val();

  		$('.search_content').html("");
  		$.ajax({
				url: "reviews/searchAction",
				type: "POST",
				data: { "value" : value, "type": "radio", "search_text": search_text, "price": price, "sort": sort, "location": location},
				dataType: "json",
				success: function(data) {
					var test = [];
					data.res.forEach(function(entry) {
						var date = entry.created_at.replace("T", " ").replace(".000Z", " UTC");
						var markup =[
						'<article class="col-md-12 article-list">',
              '<div class="inner">',
                '<figure>',
                  '<a href="reviews/show/' + entry.id +'">',
                    '<img src="' + entry.food_picture.url + '">',
                  '</a>',
                '</figure>',
                '<div class="details">',
                  '<div class="detail">',
                    '<time>' + date + '</time>',
                  '</div>',
                  '<h1><a href="reviews/show/' + entry.id + '">' + entry.title + '</a></h1>',
                  '<p style="font-weight: bold;">' + entry.store_address + '</p>',
                  '<p>' + entry.food_name +' - ' + entry.price + '</p>',
                  '<p>' + 'Donec consequat, arcu at ultrices sodales, quam erat aliquet diam, sit amet interdum libero nunc accumsan nisi.' + '</p>',
                  '<footer>',
                    '<a class="btn btn-primary more" href="reviews/show/' + entry.id +'">',
                      '<div>More</div>',
                      '<div><i class="ion-ios-arrow-thin-right"></i></div>',
                    '</a>',
                  '</footer>',
                '</div>',
              '</div>',
            '</article>'];
					 	test.push(markup.join(''));
					});
					$('.search_content').html(test);
				}
			});
  	});
  }

  search_location();

  sort_by();

  search_tool();

	price_choose();

	auto_search();

	preview_img();

	radio_on_click();

	delete_review();

	change_user();

	comment_icon();

	control_comment();

	comment_li_on_hover();

	commentnotsigin();

	review();

	love();

	dislike();

	comment();

	featuredImage();

	headline();

	floatingLabel();

	featured();

	magnificGallery();

	easeScrollFunc();

	toggleMobile();

	showPassword();

	sendContactForm();

	loadFile();

	loveNotSignin();

	create_comment();

	create_comment_notsignin();

	reply_single_page();

	reply_home_page();

	create_reply();

	create_reply_homepage();

	create_reply_notsignin();

 	show_edit_com();

	show_edit_rep();

	show_edit_rep_hp();

	control_comment_sp();

	control_reply();

	control_reply_sp();


});
