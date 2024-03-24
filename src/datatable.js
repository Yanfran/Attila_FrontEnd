import $ from "jquery";
function initializeDataTable() {
    $("#myTable").DataTable({
    pagingType: "full_numbers",
    pageLength: 20,
    processing: true,
    dom: "Bfrtip",
    select: {
        style: "single",
    },
    language: {
        info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        zeroRecords: "NO HAY RESULTADOS",
        paginate: {
        first: "Primera",
        last: "Última ",
        next: "Siguiente",
        previous: "Anterior",
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR",
    },
    // "info":    false,
    buttons: [
        {
        extend: "pageLength",
        className: "btn btn-outline-secondary botones-datatable",
        },
        {
        extend: "copy",
        className: "btn btn-outline-secondary botones-datatable",
        },
        {
        extend: "csv",
        className: "btn btn-outline-secondary botones-datatable",
        },
        {
        extend: "print",
        customize: function (win) {
            $(win.document.body).css("font-size", "10pt");
            $(win.document.body)
            .find("table")
            .addClass("compact")
            .css("font-size", "inherit");
        },
        className: "btn btn-outline-secondary botones-datatable",
        },
    ],

    fnRowCallback: function (
        nRow,
        aData,
        iDisplayIndex,
        iDisplayIndexFull
    ) {
        var index = iDisplayIndexFull + 1;
        $("td:first", nRow).html(index);
        return nRow;
    },

    lengthMenu: [
        [10, 20, 30, 50, -1],
        [10, 20, 30, 50, "Todos"],
    ],
    columnDefs: [
        {
        targets: 0,
        render: function (data, type, row, meta) {
            return type === "export" ? meta.row + 1 : data;
        },
        },
    ],
    });
}

export default initializeDataTable;