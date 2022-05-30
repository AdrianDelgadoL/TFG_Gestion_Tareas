import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {

  constructor() { }


  //Data exporting
  exportCsv(data: any) {
    this.downloadFile(JSON.stringify(data));
  }

  downloadFile(data: string, filename = 'data') {
    let arrHeader = ["id", "assignedWorkers", "date", "description", "extraFields", "name", "type", "verified"];
    let csvData = this.ConvertToCSV(data, arrHeader);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: string, headerList: string[]) {
    const array = JSON.parse(objArray);
    let str = '';
    let row = 'No;';
    let newHeaders = ["id", "assignedWorkers", "date", "description", "extraFields", "name", "type", "verified"]; //Headers of data

    for (let index in newHeaders) {
      row += newHeaders[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {

      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        if(head == "assignedWorkers") {
          array[i][head] = array[i][head].map((workerData: { name: string; surname: string; }) => workerData.name + ' ' + workerData.surname);
        }
        else if(head == "extraFields") {
          array[i][head] = array[i][head].map((fieldData: { fieldName: string; fieldValue: string; }) => fieldData.fieldName + ': ' + fieldData.fieldValue);
        }
        line += ';' + this.strRep(array[i][head])
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data: string | undefined | number) {
    if(typeof data == "string") {
      return data.replace(/,/g, " ");
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else {
      return data.toString();
    }
  }

}
