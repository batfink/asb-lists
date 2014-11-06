var promise = new Promise(function(resolve, reject) {
    resolve('tjobing');
});

var p = document.getElementsByTagName('p')[0];

function updatePage() {
    p.innerText += ' Sure, baby!';
};

promise.then(updatePage);
