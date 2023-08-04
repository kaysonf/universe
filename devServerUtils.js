function createImportMap(params) {
    const {workspace, port, name} = params;
    return [workspace, `//localhost:${port}/${name}`]
}

const ENCODING = 'base64';
module.exports.createEncodedImportMap = function (importArr) {

    const SHARED_IMPORT_MAPS = importArr.map(createImportMap);

    const WEBPACK_IMPORT_MAP = {
        imports: SHARED_IMPORT_MAPS.reduce((importMap, [workspace, url]) => {
            importMap[workspace] = url;
            return importMap;
        }, {
            // TODO move to module federation?
            "react": "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js",
            "react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"
        })
    }

    return Buffer.from(JSON.stringify(WEBPACK_IMPORT_MAP)).toString(ENCODING);
}

module.exports.decodeImportMap = function (encoded) {
    return Buffer.from(
        encoded,
        ENCODING
    ).toString()
}