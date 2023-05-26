public class FTPWebServic {
    public static HttpResponse fileExportFromFTPServer(){
        Http httpreq = new Http();
        HTTPRequest req=new HTTPRequest();
        req.setHeader('ftp-host', 'test.rebex.net');
        req.setHeader('ftp-type', 'FTP');
        req.setHeader('username', 'demo');
        req.setHeader('password', 'password');
        req.setHeader('port', '21');
        req.setHeader('Content-Type','image/png');
        req.setEndpoint('https://ftp-api.com/ftp/download');
        req.setMethod('GET');
        HTTPResponse res=httpreq.send(req);
        System.debug(res.getStatusCode());
        if(res != null){
            system.debug('==response=='+res.getBody());
            if(res.getStatusCode() == 200){
                Attachment att=new Attachment();
                Blob b1=res.getBodyAsBlob();
                System.debug(b1);
                att.Body=b1;
                att.Name='test.csv';
                att.ParentId='0012w00000jeGK0AAM';
                insert att;
            }
            
    
        
    }
     return res;   

}
}