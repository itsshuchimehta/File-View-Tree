export interface File {
  id: string;
  type: "file";
  name: string;
}

export interface Directory {
  id: string;
  type: "directory";
  name: string;
  children: string[]; // file or directory ids
}

export type INode = File | Directory;



// Extended types for search results and operations
export type SearchResult = INode & {
  path: string;
}


export interface FileOperationResult {
  success: boolean;
  node?: INode;
  error?: string;
}

export interface CreateFileRequest {
  parentId: string;
  fileName: string;
  fileExtension?: string;
}

export interface CreateDirectoryRequest {
  parentId: string;
  dirName: string;
}

export interface RenameRequest {
  nodeId: string;
  newName: string;
}

export interface DeleteRequest {
  nodeId: string;
}
