const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const endpoint = req.url;
    if (endpoint === '/start') {
        fs.readFile('./index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (endpoint === '/api') {
        var data = '';
        //POSTデータを受けとる
        req.on('data', (chunk) => { data = JSON.parse(chunk) })
            .on('end', () => {
                var req_obj = data['obj'];
                var result = '';
                for (let i = 1; i < 31; i++) {
                    var count = 0;
                    for (let index in req_obj) {
                        if (i % req_obj[index]['num'] === 0) {
                            result = result + ' ' + req_obj[index]['text'];
                            count += 1;
                        }
                    }
                    if (count == 0) {
                        result = result + ' ' + i;
                    }
                    result = result + ',';
                }
                result = result.slice(0, -1);
                let res_obj = { 'data': result }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(res_obj));
                res.end();
            });
    }
});
server.listen(8080);