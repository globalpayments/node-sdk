import * as fs from 'fs';

export class DocumentUploadData {
    public documentName: string;
    public transactionReference: string;
    public docType: string;
    get DocType(): string {
        return this.docType;
    }
    set DocType(value: string) {
        if (this._validDocTypes.includes(value)) {
            this.docType = value;
        } 
        else {
            throw new Error("The provided file type is not supported.");
        }
    }
    public document: string;
    public docCategory: string;
    public documentPath: string;

    DocumentPath(value: string) { 
        const docPath = value;
        if (docPath != null) {
                const documentType = docPath.substring(docPath.lastIndexOf('.') + 1);
                if (this._validDocTypes.includes(documentType)) {
                    this.docType = documentType;
                    this.document = String(this.getByteArray(docPath));
                }
                else {
                    throw new Error("The document provided is not a valid file type.");
                }
            }
            else {
                throw new Error("DocumentPath has not been set");
            }
    }

    
    private getByteArray(filePath: string){
        const fileData = fs.readFileSync(filePath);
        const buff = Buffer.from(fileData);
        const base64data = buff.toString('base64');
        return base64data;
    }

    _validDocTypes: Array<string> = ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'gif', 'png', 'doc', 'docx'];
}