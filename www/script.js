var afb = afb || {};

afb.Table = function(config) {

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
        return data;
    };

    function buildHTML(columns, data) {

        var table = document.createElement('table');

        data.forEach(function(row) {
            var tr = document.createElement('tr');

            columns.forEach(function(key, i) {

                var td = i === 0 ? document.createElement('th') : document.createElement('td');
                var txt = document.createTextNode(row[key]);
                td.appendChild(txt);

                tr.appendChild(td);
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
