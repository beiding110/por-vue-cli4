export default function (options, dataInject) {
    var oData = options.data;

    options.data = {
        ...oData,
        ...dataInject,
    };

    return options;
}