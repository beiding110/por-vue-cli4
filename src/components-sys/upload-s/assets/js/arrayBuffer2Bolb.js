export default function (buffer, type) {
    var Builder = window.BlobBuilder || window.WebKitBlobBuilder,
        bb;

    // android不支持直接new Blob, 只能借助blobbuilder.
    if ( Builder ) {
        bb = new Builder();
        bb.append( buffer );
        return bb.getBlob( type );
    }

    return new Blob([buffer], type ? { type: type } : {} );
}