import fs from "fs";

export function accessiblePath(modulePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.access(modulePath, fs.constants.F_OK, (err: any) => {
      if (err) {
        return reject(false);
      }
      resolve(true);
    });
  });
}

export function isDirectory(
  path: string
): Promise<{ isModule: boolean; isDir: boolean }> {
  return accessiblePath(path).then((isModule) => {
    const isDir = fs.statSync(path).isDirectory();
    return Promise.resolve({
      isModule,
      isDir,
    });
  });
}

export function getDirectoryFiles(dirPath: string) {
  return new Promise((resolve, reject) => {
    return fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject([]);
      }
      resolve(files);
    });
  });
}
