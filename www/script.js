var afb = afb || {};

afb.Table = function(config) {

    window.paras = [];

    var dayNames =          ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'],
        shortDayNames =     ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'],
        monthNames =        ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
        shortMonthNames =   ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

    //console.log(marked('**tjobing**'));

    Object.keys(config).forEach(function(prop) {
        this[prop] = config[prop];
    }.bind(this));

    getSpreadsheet.bind(undefined, this.key)()
        .then(parseDates)
        .then(buildHTML.bind(undefined, this.columns))
        .then(appendToPage.bind(undefined, this.el))
        .catch(handleError);

    function getSpreadsheet(key) {
        return new Promise(function(resolve, reject) {

            Tabletop.init({
                key: key,
                callback: function(data, tabletop) {
                    resolve(data);
                },
                simpleSheet: true
            });

        });
    };

    function parseDates(data) {

    //    var year =
        //console.log(data);

        return data;
    };

    function buildHTML(columns, data) {

        var table = document.createElement('table');

        data.forEach(function(row) {
            var tr = document.createElement('tr');

            columns.forEach(function(key, i) {

                var cell;
                var txt = row[key];

                if (i === 0) {
                    var regex = /([0-9]{2})\.([0-9]{2})\.([0-9]{2})@(heldags|[0-9]{2}.[0-9]{2})(?:[–|-])?([0-9]{2}\.[0-9]{2})?/;
                    var time = regex.exec(txt);
                    var year = Number(time[3]) + 2000;

                    //console.log(year);

                    var d = new Date(year, time[2] - 1, time[1]);

                    var day = dayNames[d.getDay()];
                    var date = time[1];
                    var month = monthNames[time[2]-1];

                    var dateString = day + ' ' + date + '. ' + month;

                    if (time[4].length < 6) {
                        dateString += ' kl. ' + time[4];
                    };

                    if (time[5] !== undefined) {
                        dateString += '–' + time[5];
                    };


                    cell = document.createElement('th');
                    cell.appendChild(document.createTextNode(dateString));
                } else {
                    cell = document.createElement('td');
                    cell.innerHTML = marked(txt);
                    cell.innerHTML = cell.getElementsByTagName('p')[0].innerHTML;
                };

                tr.appendChild(cell);
            });

            table.appendChild(tr);
        });

        return table;
    };

    function appendToPage(parent, table) {
        parent.appendChild(table);
    };

    function handleError(error) {
        console.error(error);
    };


};
