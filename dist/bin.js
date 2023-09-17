var $j5qfc$path = require("path");
var $j5qfc$fs = require("fs");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $d042e74ebd54d797$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Generator", () => $ac89f0d1dbdd363c$export$2e2bcd8739ae039);


var $7a6c82c65fe6322c$var$$parcel$__dirname = $j5qfc$path.resolve(__dirname, "../lib");
class $7a6c82c65fe6322c$export$2e2bcd8739ae039 {
    generateOptions;
    constructor(generateOptions = {}){
        this.generateOptions = generateOptions;
    }
    scan() {
        console.log("scan");
    }
    getCurrentDisposition() {
        console.log("getCurrentDisposition");
    }
    eligible(id) {
        return {
            id: id,
            isEligible: true,
            path: (0, ($parcel$interopDefault($j5qfc$path))).resolve($7a6c82c65fe6322c$var$$parcel$__dirname, "..", "visualizations"),
            isPreset: false
        };
    }
}



function $9576dbdb1ee77e84$export$f5b43a374c9d7535(modulePath) {
    return new Promise((resolve, reject)=>{
        (0, ($parcel$interopDefault($j5qfc$fs))).access(modulePath, (0, ($parcel$interopDefault($j5qfc$fs))).constants.F_OK, (err)=>{
            if (err) return reject(false);
            resolve(true);
        });
    });
}
function $9576dbdb1ee77e84$export$38412a8139e981aa(path) {
    return $9576dbdb1ee77e84$export$f5b43a374c9d7535(path).then((isModule)=>{
        const isDir = (0, ($parcel$interopDefault($j5qfc$fs))).statSync(path).isDirectory();
        return Promise.resolve({
            isModule: isModule,
            isDir: isDir
        });
    });
}
function $9576dbdb1ee77e84$export$9e9cb0ec1acab46c(dirPath) {
    return new Promise((resolve, reject)=>{
        return (0, ($parcel$interopDefault($j5qfc$fs))).readdir(dirPath, (err, files)=>{
            if (err) return reject(err);
            resolve(files);
        });
    });
}



class $374cb24dec1c6695$export$2e2bcd8739ae039 {
    modulePath;
    ctx;
    disposition;
    parent;
    value;
    children;
    constructor(modulePath, ctx, disposition, parent){
        this.modulePath = modulePath;
        this.ctx = ctx;
        this.disposition = disposition;
        this.parent = parent;
        this.children = new Set();
        this.prepare(modulePath);
    }
    async prepare(modulePath) {
        /**
     * 在调用Module的之前已经检查过路径存在性
     * 只需要检查是否为目录即可
     */ const result = await (0, $9576dbdb1ee77e84$export$38412a8139e981aa)(modulePath);
        if (!result.isModule) return;
        if (result.isDir) {
            this.correlation(modulePath);
            return;
        }
        this.value = this.parent;
    }
    correlation(modulePath) {
        // @ts-ignore
        const _this = this || this.parent;
        (0, $9576dbdb1ee77e84$export$9e9cb0ec1acab46c)(modulePath).then((files)=>{
            files.forEach((moduleFileName)=>{
                const m = new $374cb24dec1c6695$export$2e2bcd8739ae039((0, ($parcel$interopDefault($j5qfc$path))).join(modulePath, moduleFileName), this.ctx, this.disposition, _this);
                if (_this) _this.children.add(m);
            });
        });
    }
}


class $c2671512efbae894$export$2e2bcd8739ae039 {
    ctx;
    disposition;
    _module;
    constructor(ctx, disposition){
        this.ctx = ctx;
        this.disposition = disposition;
    }
    graph(id, options) {
        const eligible = this.disposition.eligible(id);
        if (eligible.isEligible) this._module = new (0, $374cb24dec1c6695$export$2e2bcd8739ae039)(`${eligible.path}/${eligible.id}`, this.ctx, this.disposition);
    }
    getGraph() {
        return this._module;
    }
}


class $ac89f0d1dbdd363c$export$2e2bcd8739ae039 {
    _disposition;
    constructor(generateOptions = {}){
        this._disposition = new (0, $7a6c82c65fe6322c$export$2e2bcd8739ae039)(generateOptions);
    }
    scan(templateID, options = {}) {
        const template = new (0, $c2671512efbae894$export$2e2bcd8739ae039)(this, this._disposition);
        template.graph(templateID, options);
        return template;
    }
}


var $d042e74ebd54d797$export$2e2bcd8739ae039 = (0, $ac89f0d1dbdd363c$export$2e2bcd8739ae039);


//# sourceMappingURL=bin.js.map
