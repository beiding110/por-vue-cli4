import arrayBuffer2Bolb from './arrayBuffer2Bolb';
import getGuid from './getGuid';
import optionsRebuild from './optionsRebuild';

var chunkIdNameSpace = 'WU_FILE_',
    chunkSize = 5 * 1024 * 1024,
    buffer = [];

export default function( options, cb ) {
    var file = options.file,
        filename = file.name,
        filetype = filename.slice(filename.lastIndexOf('.') + 1),
        guid = getGuid(),

        chunks = Math.ceil( file.size / chunkSize ),
        chunk = 0,
        fileSlice = file.mozSlice || file.webkitSlice || file.slice,
        loadNext, 
        fr;

    fr = new FileReader();
    buffer = [];

    loadNext = function() {
        var start, end;

        start = chunk * chunkSize;
        end = Math.min( start + chunkSize, file.size );

        fr.onload = function( e ) {
            var result = e.target.result,
                resBolb = arrayBuffer2Bolb(result, file.type),
                data = optionsRebuild({
                    ...options,                    
                    file: resBolb,
                }, {
                    id: `${chunkIdNameSpace}${chunk}`,
                    chunkSize,
                    type: 'application/octet-stream',
                    size: file.size,
                    issave: 1,
                    lastModifiedDate: file.lastModifiedDate,
                    ext: filetype,
                    name: filename,
                    guid,
                    // zbfilesha1: '',
                });
            
            buffer.push(data);
        };

        fr.onloadend = function() {
            fr.onloadend = fr.onload = null;

            if ( ++chunk < chunks ) {
                setTimeout( loadNext, 1 );
            } else {
                setTimeout(function(){
                    loadNext = file = file = null;
                    cb && cb(buffer);
                }, 50 );
            }
        };

        fr.readAsArrayBuffer( fileSlice.call( file, start, end ) );
    };

    loadNext();
}