var thisNav;
(function() {
  var thisNavPat = /\[navigation[:a-zA-Z1-9_-]*\]/;
  var navRemove = /\[navigation|:|]/g;
  $('p').each(function() {
    if ($(this).text().match(thisNavPat)) {
      var tempString = $(this).html();
      thisNav = tempString.replace(navRemove, '');
    }
  });
})();

$('#currentNav').html(thisNav);








			var colorScheme = localStorage.mpcColorScheme;
      (function() {
        if (colorScheme === undefined) {
          $('body').attr('class', 'dark');
          $('#dark').addClass('chosen');
        }
        else {
          $('body').attr('class', colorScheme);
          var myId = '#' + colorScheme;
          $(myId).addClass('chosen');
        }
      })();

      var navigation;
      var fullNavigation = localStorage.mpcNavigation;
      (function() {
        if (fullNavigation === undefined) {
          fullNavigation = {};
          navigation = [];
        }
        else {
          fullNavigation = JSON.parse(fullNavigation);
          if (fullNavigation[thisNav] === undefined) {
            fullNavigation[thisNav] = [{'name':'Sample','url':'sample.html'}];
            console.log("Manually declaring navigation.");
          }
          navigation = fullNavigation[thisNav];
        }
        console.log("Currently, navigation is: " + navigation);
      })();

      function storeNav() {
        // if no navigation exists for this collection, create it!
        if (fullNavigation[thisNav] === undefined) {
          fullNavigation[thisNav] = navigation;
        }
        else {
          fullNavigation[thisNav] = navigation;
        }
        localStorage.mpcNavigation = JSON.stringify(fullNavigation);
      }













      function confirmOk() {
        $('#confirmMessage').addClass('active');
      }

      function confirmRemove() {
        $('#confirmMessage').removeClass('active');
      }

      // Animate anchor clicks
            $(function() {
  $('a[title="anchor"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 250);
        return false;
      }
    }
  });
});

			$('#container').delegate('.toggle', 'click', function() {
				var targetItem = $(this).data('target');
				$(targetItem).toggleClass('active');
			});
			// Behavior for clicking outside to close objects
			$(document).on('click', function(e) {

				var clickObject = e.target;

				//===== Main Menu
				if (!$(clickObject).parents('.item-click-default').length && !$(clickObject).hasClass('item-click-default')) {
					$('#settings').removeClass('active');
				}
			});
			function changeScheme(mySelection) {
				localStorage.mpcColorScheme = mySelection;
				colorScheme = mySelection;
			}
			$('button.btn-selection').click(function() {
				$('.btn-selection').removeClass('chosen');
				$(this).addClass('chosen');
				var qualifier = $(this).attr('id');
				$('body').attr('class', qualifier);
				changeScheme(qualifier);
        var myItem = document.getElementsByTagName('body')[0];
        myItem.style.display='none';
        myItem.offsetHeight; // no need to store this anywhere, the reference is enough
        myItem.style.display='block';
			});





      function loadNav() {
        var thisNavPat = /\[navigation[:a-zA-Z1-9_-]*\]/;
        $('p').each(function() {
          if ($(this).text().match(thisNavPat)) {
            var navString = "";
            var navList = "";
            for (var i = 0; i < navigation.length; i++) {
              // Navigation String
              var navItem = '<a data-item="' + i + '" href="' + navigation[i].url + '">' + navigation[i].name + '</a>';
              navString = navString + navItem;
              //Navigation List String
              var navListItem = '<li class="item-click-default" data-item="' + i + '">' + navigation[i].name + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span></li>';
              navList = navList + navListItem;
            }
            $(this).replaceWith('<nav id="main">' + navString + '</nav>');
            $('.navlist').html('<ol>' + navList + '</ol>');
          }
        });
      }

      function addToNav() {
        var navString = "";
        var navList = "";
        for (var i = 0; i < navigation.length; i++) {
          var navItem = '<a data-item="' + i + '" href="' + navigation[i].url + '">' + navigation[i].name + '</a>';
          navString = navString + navItem;
          //Navigation List String
          var navListItem = '<li class="item-click-default" data-item="' + i + '">' + navigation[i].name + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span></li>';
          navList = navList + navListItem;
        }
        $('nav#main').replaceWith('<nav id="main">' + navString + '</nav>');
        $('.navlist').html('<ol>' + navList + '</ol>');
      }

      loadNav();

      //===== find and highlight current page on the navbar
      var fullpath = window.location.pathname;
      var pat = /[A-Za-z0-9_-]+\.[A-Za-z]{2,4}/;
      var currentUrl = pat.exec(fullpath);

      var navItems = $('nav a');

      for (var i = 0; i < navItems.length; i++) {
        var myItem = $(navItems[i]).attr('href');
        if (myItem === currentUrl[0]) {
          $(navItems[i]).addClass('active');
        } 
      }

      $('#settings').delegate('#addNewNav', 'click', function() {
        var newItem = $('#navLabel').val();
        var newUrl = $('#navUrl').val();
        var newObj = {};
        newObj['name'] = newItem;
        newObj['url'] = newUrl;
        navigation.push(newObj);
        storeNav();
        confirmOk();
        setTimeout(confirmRemove, 2000);
        addToNav();
        $('#navLabel').val("");
        $('#navUrl').val("");
      });

var footnoteRefPat = /\[\^[1-9]*\]/g;
var footnotePat = /\[[1-9]*\]:/g;
var myRefCount = 0;
var myCount = 0;
$('p').each(function() {
  if ($(this).text().match(footnoteRefPat)) {
    var myString = $(this).html();
    var myString = myString.replace(footnoteRefPat, function() {
      myRefCount += 1;
      var myObj = ' <a class="footnote-item toggle" data-target="#footnotePopup" href="#fn-' + myRefCount + '">[' + myRefCount + ']</a>';
      return myObj;
    });
    $(this).html(myString);
  };
  if ($(this).text().match(footnotePat)) {
    var myString = $(this).html();
    myString = myString.replace(footnotePat, function() {
      myCount += 1;
      var myObj = '<div id="fn-' + myCount + '" style="display: none;">' + myCount + '. ';
      return myObj;
    });
    $(this).replaceWith(myString + '</div>');
  }
});

      $('#container').delegate('.footnote-item', 'click', function() {
        var myFooty = $(this).attr('href');
        $('#footnotePopup').html($(myFooty).html());
        $('#overlay').css('display', 'block');
      });

      $('body').delegate('#overlay', 'click', function() {
        $('#overlay').css('display', 'none');
        $('#footnotePopup').removeClass('active');
      });

      // Collapsible Drawers: uses ".collapsible.trigger", ".trigger-icon" for the icon, and ".collapsible.drawer" classes
      $('.collapsible.drawer').hide();
      $('.collapsible.trigger').parent().delegate('.collapsible.trigger', 'click', function() {
        $(this).next('.collapsible.drawer').slideToggle(150);
        $('.trigger-icon', this).toggleClass('active');
      });

      $('#settings').delegate('.remove', 'click', function() {
        // alert("This item is: " $(this));
        var iter = $(this).parents('li').data('item');
        alert("Removing Item "+iter+": " + navigation[iter].name);
        navigation.splice(iter, 1);
        storeNav();
        $(this).parents('li').remove();
        var navItem = $("nav a[data-item='" + iter +"']");
        $(navItem).remove();
      });

      $('#settings').delegate('.edit', 'click', function() {
        var iter = $(this).parents('li').data('item');
        var navName = navigation[iter].name;
        var navUrl = navigation[iter].url;
        console.log("The name is: " + navName);
        console.log("And the url is: " + navUrl);
        $('#editName').val(navName);
        $('#editUrl').val(navUrl);
        $('#editPopup').addClass('active');
        $('#overlay').css('display', 'block');
        $('#editPopup').data('item', iter);
      });

      $('#editPopup').delegate('#saveEdit', 'click', function() {
        var iter = $('#editPopup').data('item');
        var navName = $('#editName').val();
        var navUrl = $('#editUrl').val();
        navigation[iter].name = navName;
        navigation[iter].url = navUrl;
        storeNav();
        $("nav a[data-item='" + iter +"']").html(navName);
        $("nav a[data-item='" + iter +"']").attr('href', navUrl);
        $("#settings li[data-item='" + iter +"']").html(navName + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span>');
        $('#editPopup').removeClass('active');
        $('#overlay').css('display', 'none');
      });

      $('#editPopup').delegate('#cancelEdit', 'click', function(e) {
        e.preventDefault();
        $('#editPopup').removeClass('active');
        $('#overlay').css('display', 'none');
      })

      $('#exportNav').click(function() {
        var navString = JSON.stringify(navigation);
        $('#exportPortal').html(navString);
        $('#exportPopup').addClass('active');
        $('#overlay').css('display', 'block');
      });

      $('#importNav').click(function() {
        $('#importPopup').addClass('active');
        $('#overlay').css('display', 'block');
      });

      $('#importNavConfirm').click(function() {
        localStorage.mpcNavigation = $('#importPopup textarea').val();
        $('#overlay').css('display', 'none');
        $('.modal').removeClass('active');
      });

      $('body').delegate('#overlay', 'click', function() {
        $('#overlay').css('display', 'none');
        $('.modal').removeClass('active');
      });