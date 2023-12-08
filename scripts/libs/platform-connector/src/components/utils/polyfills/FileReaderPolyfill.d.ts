export default FileReader;
declare function FileReader(): void;
declare class FileReader {
    addEventListener: (on: any, callback: any) => void;
    removeEventListener: (callback: any) => void;
    dispatchEvent: (on: any) => void;
    EMPTY: number;
    LOADING: number;
    DONE: number;
    error: any;
    readyState: number;
    result: any;
    on: (...args: any[]) => void;
    nodeChunkedEncoding: boolean;
    setNodeChunkedEncoding: (val: any) => void;
    abort: () => void;
    readAsArrayBuffer: (file: any) => void;
    readAsBinaryString: (file: any) => void;
    readAsDataURL: (file: any) => void;
    readAsText: (file: any, encoding: any) => void;
}
