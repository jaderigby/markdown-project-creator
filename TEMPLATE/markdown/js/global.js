//========= VARIABLES =========

var thisNav, navigation, thisPag, pagination;
var fullNavigation = localStorage.mpcNavigation;
var fullPagination = localStorage.mpcPagination;
var colorScheme = localStorage.mpcColorScheme;
var footyRefIndex = 0;
var footyIndex = 0;

//========= FUNCTIONS =========

// On load, find navigation placeholder in DOM and store in "thisNav" variable
(function() {
  var thisNavPat = /\[navigation[:a-zA-Z1-9_-]*\]/;
  var navRemove = /\[navigation|:|]/g;
  $('p').each(function() {
    if ($(this).text().match(thisNavPat)) {
      var tempString = $(this).html();
      thisNav = tempString.replace(navRemove, '');
    }
  });
  $('#currentNav').html(thisNav);
}());

// On load, find pagination placeholder in DOM and store in "thisPag" variable
(function() {
  var thisPagPat = /\[pagination[:a-zA-Z1-9_-]*\]/;
  var pagRemove = /\[pagination|:|]/g;
  $('p').each(function() {
    if ($(this).text().match(thisPagPat)) {
      var tempString = $(this).html();
      thisPag = tempString.replace(pagRemove, '');
    }
  });
  $('#currentPagination').html(thisPag);
}());

// On load, detect and activate theme
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
}());

// Process globals: "navigation" and "fullNavigation"; attempts to catch "when empty"
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
}());

var thisNavAllPagination = function() {
  // As long as fullPagination exists, move ahead
  if (fullPagination !== undefined) {
    for (var i = 0; i < fullPagination.length; i++) {
      if (fullPagination[i].nav === thisNav) {
        return fullPagination[i].contents;
      }
    }
  }
  // if fullPagination does not exist, let me know
  else {
    console.log("No pagination has been created for \""+thisNav+"\", yet.");
  }
};

var currentPagePagination = function() {
  // check to see if current page uses pagination
  if (thisPag === undefined) {
    console.log("No pagination on current page.");
  }
  else {
    var myPagination;
    // Check for ANY pagination on thisNav
    if (thisNavAllPagination() !== undefined) {
      for (var i = 0; i < thisNavAllPagination().length; i++) {
        // if thisNav has pagination, check if the current page has pagination
        if (thisNavAllPagination()[i].name === thisPag) {
          // if current page has pagination, get it!
          myPagination = thisNavAllPagination()[i].pages;
        }
      }
    }
    if (myPagination === undefined) {
      console.log("Current pagination is empty");
    }
    return myPagination;
  }
};

(function() {
  if (fullPagination !== undefined) {
    fullPagination = JSON.parse(fullPagination);
  }
  pagination = currentPagePagination();
}());

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

var navIndex = function() {
  for (var i = 0; i < fullPagination.length; i++) {
    if (fullPagination[i].nav === thisNav) {
      return i;
    }
  }
}

var pagIndex = function() {
  currentItem = fullPagination[navIndex()].contents;
  for (var i = 0; i < currentItem.length; i++) {
    if (currentItem[i].name === thisPag) {
      return i;
    }
  }
}

function storePagination() {
  // Check if any pagination for thisNav exists
  if (thisNavAllPagination() !== undefined) {
    if (currentPagePagination() !== undefined) {
      fullPagination[navIndex()].contents[pagIndex()].pages = pagination;
    }
    localStorage.mpcPagination = JSON.stringify(fullPagination);
  }
}

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
      $('.nav-list').html('<ol>' + navList + '</ol>');
    }
  });
}

function loadPagination() {
  var thisPagPat = /\[pagination[:a-zA-Z1-9_-]*\]/;
  $('p').each(function() {
    if ($(this).text().match(thisPagPat)) {
      var pagString = "";
      var pagList = "";
      try {
        for (var i = 0; i < pagination.length; i++) {
          // Navigation String
          var pagItem = '<li><a data-item="' + i + '" href="' + pagination[i].url + '">' + pagination[i].name + '</a></li>';
          pagString = pagString + pagItem;
          //Navigation List String
          var pagListItem = '<li class="item-click-default" data-item="' + i + '">' + pagination[i].name + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span></li>';
          pagList = pagList + pagListItem;
        }
        $(this).replaceWith('<div class="pagination-wrapper"><div class="pagination"><div id="prev" class="greyout">&lt;</div><div id="next">&gt;</div><div class="pagination-items-wrapper"><ul>' + pagString + '</ul></div></div></div>');
        $('.pag-list').html('<ol>' + pagList + '</ol>');
      }
      catch(err) {
        console.log("Pagination appears to be empty");
      }
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
  $('.nav-list').html('<ol>' + navList + '</ol>');
}

function addToPagination() {
  var pagString = "";
  var pagList = "";
  for (var i = 0; i < pagination.length; i++) {
    var pagItem = '<a data-item="' + i + '" href="' + pagination[i].url + '">' + pagination[i].name + '</a>';
    pagString = pagString + pagItem;
    //pagination List String
    var pagListItem = '<li class="item-click-default" data-item="' + i + '">' + pagination[i].name + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span></li>';
    pagList = pagList + pagListItem;
  }
  $('pag#main').replaceWith('<pag id="main">' + pagString + '</pag>');
  $('.pag-list').html('<ol>' + pagList + '</ol>');
}

function changeScheme(mySelection) {
  localStorage.mpcColorScheme = mySelection;
  colorScheme = mySelection;
}

// Modals
function confirmOk() {
  $('#confirmMessage').addClass('active');
}

function confirmRemove() {
  $('#confirmMessage').removeClass('active');
}

// Footnotes
function footnoteRefReplace(myString) {
  var myItem = myString.replace(/\[\^[a-zA-Z/ _\:\-1-9]*\](?!:)/, function(match, contents, offset, s) {
    footyRefIndex += 1;
    var newString = ' <a class="footnote-item" data-target="#footnotePopup" href="#fn-' + footyRefIndex + '">[' + footyRefIndex + ']</a>';
    return newString;
  });
  return myItem;
}

function footnoteReplace(myString) {
  var myItem = myString.replace(/\[\^[a-zA-Z/ _\:\-1-9]*\]\:/, function(match, contents, offset, s) {
    footyIndex += 1;
    var myLabel = match.replace(/(\[\^)/g, '');
    myLabel = myLabel.substring(0, myLabel.length-2);
    var newString = '<div id="fn-' + footyIndex + '" style="display: none;"><h4>' + footyIndex + '. ' + myLabel + "</h4>";
    return newString;
  });
  return myItem;
}

jQuery.fn.selectText = function(){
  var doc = document
    , element = this[0]
    , range, selection
  ;
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

function sectionOutPagination() {
  var newString = "<ul>";
  if ($('.pagination li').length < 11) {
    $('#next').addClass('greyout');
  }
  $('.pagination li').each(function(index) {
    var snippet = '<li>'+$(this).html()+'</li>';
    if (index !== 0 && index%10 === 0) {
      snippet = '</ul><ul>' + snippet;
    }
    newString = newString + snippet;
  });
  newString = newString + '</ul>';
  $('.pagination ul').replaceWith(newString);
}

//========= INITIALIZE =========

loadNav();
loadPagination();

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

if (thisPag) {
  $('nav a[href="'+thisPag+'.html"]').addClass('active');
}

// Populate "menuList"
function listObjects(myObject) {
  var tempList = [];
  Object.keys(fullNavigation).forEach(function(key) {
      tempList.push(key);
  });
  return tempList;
}

var menuList = listObjects(fullNavigation);

$(menuList).each(function(i) {
  var newItem = '<li class="item-click-default" data-label="' + this + '">' + this + '<span class="modify-options"><span class="remove mpc-close-btn"></span></span></li>';
  $('.menu-list ol').append(newItem);
});

//====== Process Footnotes
var footnoteRefPat = /\[\^[a-zA-Z/ _\:\-1-9]*\](?!:)/g;
var footnotePat = /\[\^[a-zA-Z/ _\:\-1-9]*\]\:/g;
$('li').each(function() {
  // replace footnote reference with reference link
  if ($(this).text().match(footnoteRefPat)) {
    var myString = $(this).html();
    var newString = footnoteRefReplace(myString);
    $(this).html(newString);
  }
});
// reset index for references
$('p').each(function() {
  // replace footnote reference with reference link
  if ($(this).text().match(footnoteRefPat)) {
    var myString = $(this).html();
    var newString = footnoteRefReplace(myString);
    $(this).html(newString);
  }
  // replace footnotes with hidden footnote blocks
  if ($(this).text().match(footnotePat)) {
    var myString = $(this).html();
    var newString = footnoteReplace(myString);
    $(this).replaceWith(newString + '</div>');
  }
});

//========= BEHAVIOR =========

//===== Animate anchor clicks
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

// Behavior for clicking outside to close objects
$(document).on('click', function(e) {

  var clickObject = e.target;

  //===== Settings Window
  if (!$(clickObject).parents('.item-click-default').length && !$(clickObject).hasClass('item-click-default')) {
    $('#settings').removeClass('active');
  }
});

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

$('#settings').delegate('#addNewPage', 'click', function() {
  var newItem = $('#pageLabel').val();
  var newUrl = $('#pageUrl').val();
  var newObj = {};
  newObj['name'] = newItem;
  newObj['url'] = newUrl;
  pagination.push(newObj);
  storePagination();
  confirmOk();
  setTimeout(confirmRemove, 2000);
  addToPagination();
  $('#pageLabel').val("");
  $('#pageUrl').val("");
});

$('#container').delegate('.footnote-item', 'click', function(e) {
  e.preventDefault();
  var myFooty = $(this).attr('href');
  $('#footnotePopup').html('');
  $('#footnotePopup').html($(myFooty).html());
  $('#footnotePopup').addClass('active');
  $('#overlay').css('display', 'block');
});

$('body').delegate('#overlay', 'click', function() {
  $('#overlay').css('display', 'none');
  $('#footnotePopup').removeClass('active');
});

$('#settings').delegate('.nav-list .remove', 'click', function() {
  var iter = $(this).parents('li').data('item');
  var removeItem = confirm('Remove navigation item?');
  if (removeItem === true) {
    navigation.splice(iter, 1);
    storeNav();
    $(this).parents('li').remove();
    var navItem = $("nav a[data-item='" + iter +"']");
    $(navItem).remove();
  }
});

$('#settings').delegate('.pag-list .remove', 'click', function() {
  var iter = $(this).parents('li').data('item');
  var removeItem = confirm('Remove pagination item?');
  if (removeItem === true) {
    pagination.splice(iter, 1);
    storePagination();
    $(this).parents('li').remove();
    var pagItem = $(".pagination-items-wrapper li a[data-item='" + iter +"']");
    $(pagItem).remove();
  }
});

$('#settings').delegate('#navigationDrawer .edit', 'click', function() {
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

$('#settings').delegate('#paginationDrawer .edit', 'click', function() {
  var iter = $(this).parents('li').data('item');
  var pagName = pagination[iter].name;
  var pagUrl = pagination[iter].url;
  console.log("The name is: " + pagName);
  console.log("And the url is: " + pagUrl);
  $('#editPagName').val(pagName);
  $('#editPagUrl').val(pagUrl);
  $('#editPagPopup').addClass('active');
  $('#overlay').css('display', 'block');
  $('#editPagPopup').data('item', iter);
});

$('#editPagPopup').delegate('#savePagEdit', 'click', function() {
  var iter = $('#editPagPopup').data('item');
  var pagName = $('#editPagName').val();
  var pagUrl = $('#editPagUrl').val();
  pagination[iter].name = pagName;
  pagination[iter].url = pagUrl;
  storePagination();
  $("nav a[data-item='" + iter +"']").html(pagName);
  $("nav a[data-item='" + iter +"']").attr('href', pagUrl);
  $("#settings li[data-item='" + iter +"']").html(pagName + '<span class="modify-options"><span class="edit">edit</span> | <span class="remove mpc-close-btn"></span></span>');
  $('#editPagPopup').removeClass('active');
  $('#overlay').css('display', 'none');
});

$('#editPopup').delegate('#cancelEdit', 'click', function(e) {
  e.preventDefault();
  $('#editPopup').removeClass('active');
  $('#overlay').css('display', 'none');
})

$('#editPagPopup').delegate('#cancelPagEdit', 'click', function(e) {
  e.preventDefault();
  $('#editPagPopup').removeClass('active');
  $('#overlay').css('display', 'none');
})

$('#exportNav').click(function() {
  var navString = JSON.stringify(fullNavigation);
  $('#exportPortal').html(navString);
  $('#exportPopup').addClass('active');
  $('#overlay').css('display', 'block');
});

$('#exportPag').click(function() {
  var pagString = JSON.stringify(fullPagination);
  $('#exportPagPortal').html(pagString);
  $('#exportPagPopup').addClass('active');
  $('#overlay').css('display', 'block');
});

$('#importNav').click(function() {
  $('#importPopup').addClass('active');
  $('#overlay').css('display', 'block');
});

$('#importPag').click(function() {
  $('#importPagPopup').addClass('active');
  $('#overlay').css('display', 'block');
});

$('#importNavConfirm').click(function() {
  localStorage.mpcNavigation = $('#importPopup textarea').val();
  $('#overlay').css('display', 'none');
  $('.modal').removeClass('active');
});

$('#importPagConfirm').click(function() {
  localStorage.mpcPagination = $('#importPagPopup textarea').val();
  $('#overlay').css('display', 'none');
  $('.modal').removeClass('active');
});

$('body').delegate('#overlay', 'click', function() {
  $('#overlay').css('display', 'none');
  $('.modal').removeClass('active');
});

$('#settings').delegate('.menu-list .remove', 'click', function() {
  var myItem = $(this).parents('li').data('label');
  var removeMenu = confirm('You are about to remove the following Menu:\n"' + myItem + '"\n\nAre you sure?');
  if (removeMenu === true) {
    $(this).parents('li').remove();
    delete fullNavigation[myItem];
    localStorage.mpcNavigation = JSON.stringify(fullNavigation);
  }
});

$('#highlightExportNav').click(function() {
    $('#exportPortal').selectText();
    console.log("Are you there?");
});

$('#highlightExportPag').click(function() {
    $('#exportPagPortal').selectText();
    console.log("Are you there?");
});

$('.pagination').hover(function() {
  $('.pagination').toggleClass('active');
});

// // click handler is for touchscreen devices
// $('.pagination').click(function() {
//   $('.pagination').toggleClass('active');
// });

// Open/Close Animation Behaviors (CSS3 Animations): uses ".trigger", ".toggle", and ".closer" classes in conjunction with "data-target" attribute
$('.trigger').parent().delegate('.trigger', 'click', function() {
  var targetItem = $(this).data('target');
  $(targetItem).addClass('active');
});

// $('.toggler').parent().delegate('.toggler', 'click', function() {
//   var targetItem = $(this).data('target');
//   $(targetItem).toggleClass('active');
// });

$('.toggle').parent().delegate('.toggle', 'click', function() {
  var targetItem = $(this).data('target');
  $(targetItem).toggleClass('active');
});

$('.closer').parent().delegate('.closer', 'click', function() {
  var targetItem = $(this).data('target');
  $(targetItem).removeClass('active');
});

// Collapsible Drawers: uses ".collapsible.trigger", ".trigger-icon" for the icon, and ".collapsible.drawer" classes
$('.collapsible.drawer').hide();
$('.collapsible.trigger').parent().delegate('.collapsible.trigger', 'click', function() {
  $(this).next('.collapsible.drawer').slideToggle(150);
  $('.trigger-icon', this).toggleClass('active');
});

// Toggler behavior
// trigger elements get ".toggler" class, then use data attribute 'data-target="#targetItem"' pattern to select target with "#targetItem" representing id of targeted element; use 'data-speed="450"' pattern to set a custom animation speed -- default is '150'; on target element, make sure to set to "display: none" as default, such as adding ".hide" or 'style="display: none"'.
$('.toggler').parent().delegate('.toggler', 'click', function(e) {
  e.preventDefault();
  var targetItem = $(this).data('target');
  var customSpeed = $(this).data('speed');
  if (customSpeed) {
    mySpeed = customSpeed;
  }
  else {
    mySpeed = 150;
  }
  $(targetItem).slideToggle(mySpeed);
});

sectionOutPagination();

/*======================= CAROUSEL SCRIPT =======================*/
//=======================
// VARIABLES
//=======================
// Viewport
var viewport = document.getElementsByClassName("pagination")[0];
console.log("the viewport is: " + viewport);
// Object to Move
var moveObject = $(viewport).find('.pagination-items-wrapper');
// Number of Items
var itemCount = $(moveObject).children().size();
var itemW = $(moveObject).children('ul').outerWidth();
var itemH = $(moveObject).children('ul').outerHeight(true);
// Set Width of Object to Move
var moveObjectW = itemCount * itemW;
// Setup variables for animation mechanism
var currentW = 0;
var speed = 120;

// SET WIDTHS
//=======================
$(viewport).css("visibility", "visible");
// Dynaically set "Object to Move's" width
$(moveObject).css("width", moveObjectW+"px");

// EVENTS
//=======================
$("#next").click(function() {
  if ((currentW + viewportW) < moveObjectW) {
    currentW += viewportW;
    $("#prev").removeClass("greyout");
    $("#next").removeClass("greyout");
    $(moveObject).animate({marginLeft: '-'+(currentW)+
'px'}, speed);
    console.log(currentW);
  }
  if ((currentW + viewportW) >= moveObjectW) {
    $("#next").addClass("greyout");
  }
  else {
    console.log("Current Width is: "+currentW);
    console.log("You are at the end");
  }
});
$("#prev").click(function () {
  if (currentW >= viewportW) {
    currentW -= viewportW;
    $("#prev").removeClass("greyout");
    $("#next").removeClass("greyout");
    $(moveObject).animate({marginLeft: '-'+(currentW)+
'px'}, speed);
  if (currentW == 0) {
    $("#prev").addClass("greyout");
  }
  }
  console.log(currentW);
});
if (!showVal) {
  var showVal = 1;
  viewportW = itemW * showVal;
  $(viewport).css("width", (viewportW - 10));
}
// Reset value of number shown on Selection change
$("#selectNumberThumbs").change(function() {
  var showVal = $(this).val();
  if (showVal > itemCount) {
    showVal = itemCount;
    $(this).val(itemCount);
  }
  $(moveObject).animate({marginLeft: '0'}, speed);
  $("#prev").addClass("greyout");
  $("#next").removeClass("greyout");
  currentW = 0;
  viewportW = itemW * showVal;
  $(viewport).css("width", viewportW);
  // alert('selected id:' + $(this).val());
});
console.log("Viewport is: "+viewportW);
console.log("Total width is: "+moveObjectW);
/*=================== end of "CAROUSEL SCRIPT" ==================*/
