import moment from "moment";
import { extname } from "path";

export const excelFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
        return callback(new Error('Only excel are allowed!'), false);
    }
    if (file.size > 10000000) {
        return callback(new Error('Max size is 10MB'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const date = moment().format("YYYYMMDDHHmmssSSSS");
    callback(null, `FILEUPLOAD_${date}${fileExtName}`);
};