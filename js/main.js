


document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateform(siteName,siteUrl)) {
		return false;
	}

	if(!checkexist(siteName,siteUrl)) {
		return false;
	}
	else {


	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if(localStorage.getItem('Bookmarks')=== null) {
		var Bookmarks = [];
		Bookmarks.push(bookmark);

		localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));

	}
	else {
		var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
		Bookmarks.push(bookmark);

		localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
	}
}

	document.getElementById('myform').reset();

	fetchBookmarks();
	
	e.preventDefault();
}

function fetchBookmarks() {
	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	
	var bookmarkSites = document.getElementById('BookmarkerSites');

	bookmarkSites.innerHTML = '';

	for(var i = 0; i< Bookmarks.length; i++ ) {
		let name = Bookmarks[i].name;
		let url = Bookmarks[i].url;
		bookmarkSites.innerHTML += '<div class= "well">'+
								  '<h3>'+ name +
								  ' <a class="btn btn-primary" target="_blank" href = "'+url+'">Visit</a>'+
								  ' <a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger"  href = "#"> Delete</a>'+
								  '</h3>'+
								  '</div>';

	}

}

function deleteBookmark(url) {

	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));

	for(var i = 0; i< Bookmarks.length; i++ ) {
		if(Bookmarks[i].url == url) {
			Bookmarks.splice(i, 1);
		}
	}


	localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
	

	fetchBookmarks();
}

function validateform(siteName,siteUrl) {
	if(!siteName || !siteUrl ) {
		alert('Please fill in the form ');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert('Please use a valid url');
		return false;
	}



	return true;
}

function checkexist(siteName, siteUrl) {

	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));

	for(var i = 0; i< Bookmarks.length; i++ ) {

		if(Bookmarks[i].name == siteName || Bookmarks[i].url == siteUrl) {
			alert('site already exist');
			return false;
		}
	}

	return true;

}