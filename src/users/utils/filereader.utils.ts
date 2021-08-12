import { utils, WorkBook } from 'xlsx';

export class FileReader {
  formatFileData(file: WorkBook) {
    const data: unknown[] = [];

    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }

    return data;
  }
}
