$(function(){
	var youtube_api_key = 'YOUR_API_KEY';

	var loading = {
		show: function() {
			$("body").append("<div class='main-loading'></div>");
		},
		hide: function() {
			$(".main-loading").remove();
		}
	}

	var backdrop = {
		show: function(el) {
			if(!el) el = 'body';
			$(el).prepend($("<div/>", {
				class: "backdrop"
			}));
			$(".backdrop").fadeIn();
		},
		hide: function() {
			$(".backdrop").fadeOut(function() {
				$(".backdrop").remove();
			});
		},
		click: function(clicked) {
			$(document).on("click", ".backdrop", function() {
				clicked.call(this);
				return false;
			});
		}
	}

	var sectionFirstPadding = function() {
		if($("header.primary").length) {
			$("section").eq(0).addClass("first");
			$("section.first").css({
				paddingTop: $("header.primary").outerHeight() + 15
			})
		}
		$(window).on("resize",function(){
			if($("header.primary").length) {
				$("section.first").css({
					paddingTop: $("header.primary").outerHeight() + 15
				})
			}
		});
	}

	var stickyHeader = function() {
		var didScroll;
		$(window).on("scroll", function(event){
			didScroll = true;
		});

		setInterval(function() {
			if(didScroll) {
				hasScrolled();
				didScroll = false;
			}
		},250);

		var hasScrolled = function() {
			var scrollTop = $(this).scrollTop();
			var toTop = 0;
			$("header.primary > :not(.menu)").each(function(){
				toTop += $(this).outerHeight();
			});

			if(scrollTop > 100) {
				$("header.primary").addClass("up").css({
					top: -toTop
				});
			}
			if(scrollTop < 300) {
				$("header.primary").removeClass("up").css({
					top: 0
				});
			}
		}
	}


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
                      <span class=\"date sub-text\"> \
                        abc \
                      </span> \
                  </div> \
              </li>");
						$(this).val("");
						$.ajax({
							url: "reviews/commentaction",
							type: "POST",
							data: { "content" : content, "review_id" : review_id },
							dataType: "json",
							success: function(data) {
								alert(review_id);
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
		$('.comment-li').each(function() {
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
						success: function(data) {
							alert("Succed");
						}
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
						success: function(data) {
							alert("Succed");
						}
					});
    		}
			})
		});
	}

	var comment_icon = function() {
		$('.comment-icon').each(function() {
			$(this).on('click', function() {
				$(this).parents(".article-list").find(".detailBox").toggle();
			});
		});
	}

	comment_icon();

	control_comment();

	comment_li_on_hover();

	commentnotsigin();

	review();

	// Run Function
	sectionFirstPadding();

	stickyHeader();

	love();

	dislike();

	comment();

	newsletter();

	featuredImage();

	headline();

	floatingLabel();

	bestOfTheWeek();

	youtubeAPI();

	verticalSlider();

	featured();

	magnificGallery();

	easeScrollFunc();

	toggleMobile();

	showPassword();

	sendContactForm();

	loadFile();

	loveNotSignin();


});
