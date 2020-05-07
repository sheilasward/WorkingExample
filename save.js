getRecords: function() {

    if(this.page_num > this.page_amt && this.page_amt > 0)
    {
        this.page_num = this.page_amt;
    }

    this.options["body"] = '&order_column=' + this.order_column + '&order_type=' + this.order_type + '&limit=' + this.limit + '&offset=' + this.offset +
    '&page_num=' + this.page_num + "&filters=" + JSON.stringify(this.filters);

    fetch(baseUrl + '/Tables/getRecords' + this.viewing_type + '/' + this.control_id + '/' + this.table, this.options)
    .then(response => response.json())
    .then(json => {
        this.record_counts = json.total;
        this.records = json.records;
        this.page_amt = Math.ceil(json.total / this.limit);
        this.records_ready = true;
        $(".paging-input").val(this.page_num);
        $(".limit-change").val(this.limit);
        this.loading(false);
    })
    .then(() => {
        console.log("initial_mount = ", this.initial_mount);
        if (this.initial_mount == true) {
            this.initial_mount = false;
            console.log("localStorage.pivoted = " , localStorage.getItem("pivoted"));
            if (localStorage.getItem("pivoted") == "true") {
                this.pivoted = true;
                app.pivot_table();
                console.log("this.pivoted = ", this.pivoted);
            }
        } else {
            if (this.pivoted == true) {
                app.pivot_table();
                // app.$forceUpdate();
            }
        }
        setTableStyles();
        var sent_column_elem = document.getElementById('table_' + sent_column);
        if(sent_column_elem != null)
            sent_column_elem.scrollIntoView();
    });
},

pivot_explorer: function () {
    console.log("pivot_explorer");
    if (localStorage.getItem("pivoted") == "true" && this.pivoted == true) {
        if($("#explorer").html().includes("Show unstructured data")) {
            alert("Tables with unstructured data cannot be pivoted.");
            this.pivoted = false;
            return;
        }
    }

    if (localStorage.getItem("pivoted") == "false") {
        localStorage.setItem("pivoted", "true");
        this.pivoted = true;
    } else {
        localStorage.setItem("pivoted", "false");
        this.pivoted = false;
    }
    app.pivot_table();

    console.log("this.pivoted = " + this.pivoted);
    console.log("Local Storage pivoted = " + localStorage.getItem("pivoted"));
},

pivot_table: function () {
    console.log("pivot_table");
    if (localStorage.getItem("pivoted") == "true" && this.pivoted == true) {
        if($("#explorer").html().includes("Show unstructured data")) {
            alert("Tables with unstructured data cannot be pivoted.");
            this.pivoted = false;
            return;
        }
    }

    $(".span-temp").addClass('hidden');

    $(".dmiux_arrow--left").removeClass("arrow_left_show");
    $(".dmiux_arrow--right").addClass("hidden");

    var that = this;

    $("#explorer").each(function() {
        var $this = $("#explorer");
        var newrows = [];
        var newheads = [];

        $this.find("tr").each(function() {
            var i = 0;
            if (that.pivoted === false) {
                $(this).find("td, th").each(function() {
                    i++;
                    if ($(this).hasClass("field-identification")) {
                        $(this).removeClass("text-center");
                    }
                    if(newrows[i] === undefined) {
                        newrows[i] = $("<tr></tr>");
                    }
                    newrows[i].append($(this));
                });
            } else {
                $(this).find('td, th').each(function() {
                    i++;
                    if ($(this).hasClass("field-identification")) {
                        $(this).addClass("text-center");
                    }
                    if (i < 4) {
                        if (newheads[i] === undefined) {
                            newheads[i] = $("<tr></tr>");
                        }
                        newheads[i].append($(this));
                    } else {
                        if (newrows[i] === undefined) {
                            newrows[i] = $("<tr></tr>");
                        }
                        newrows[i].append($(this));
                    }
                });
            }
        });
        $this.find("tr").remove();
        $.each(newheads, function() {
            $this.find("thead").append(this);
        });
        $.each(newrows, function() {
            $this.find("tbody").append(this);
        });
    });
    return;
},