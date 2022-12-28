/*import { dialog, app, FileFilter } from 'electron';
import zip from "jszip";

import fs from 'fs';
import path from 'path';
import http from 'http';
import { FileTree } from './interfaces';

class FileManager {

  static newFile(blob: Blob, name: string) {
    return new File([blob], name);
  }

  private static parseFileTree(files: FileTree[], currentZip: zip = zip(), isRoot: boolean = true): zip | void {
    for (let { name, content } of files) {
      if (content instanceof File) currentZip.file(name, content);
      else {
        const subFolder = currentZip.folder(name) ?? currentZip;
        this.parseFileTree(content, subFolder, false);
      }
    };
    if (isRoot) return currentZip;
  }

  static saveAsZip(files: FileTree[], title?: string, extensions?: FileFilter[]): void {
    const newZip = this.parseFileTree(files);
    if (!newZip) return;

    newZip.generateAsync({type: "blob"}).then(content => {
      const url = URL.createObjectURL(content);
      const toLocalPath = path.resolve(app.getPath("desktop"), path.basename(url));
  
      const userChosenPath = dialog.showSaveDialogSync({ defaultPath: toLocalPath, title: title, filters: extensions });
  
      if(userChosenPath) this.download(url, userChosenPath);
    });
  };


  static saveAs(file: Blob | File, title?: string, extensions?: FileFilter[]): void {
    const url = URL.createObjectURL(file);
    const toLocalPath = path.resolve(app.getPath("desktop"), path.basename(url));

    const userChosenPath = dialog.showSaveDialogSync({ defaultPath: toLocalPath, title: title, filters: extensions });

    if(userChosenPath) this.download(url, userChosenPath);
  }


  private static download(url: string, dest: string, cb: (err?: any) => void = (err) => { if (err) throw err }): void {
    const file = fs.createWriteStream(dest);
    const request = http.get(url, (response) => {
      response.pipe<fs.WriteStream>(file);
      file.on('finish', () => { file.close(cb) });
    })
    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      if (cb) cb(err.message);
    });
  };

};

export default FileManager;*/
export {}