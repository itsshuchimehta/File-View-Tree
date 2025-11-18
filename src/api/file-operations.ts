import type { INode, Directory, File } from "../types/file-types";

// In-memory file system data store
const DATA: Map<string, INode> = new Map([
  [
    "root",
    {
      id: "root",
      type: "directory",
      name: "src",
      children: ["index.tsx", "components", "types"],
    },
  ],
  [
    "index.tsx",
    {
      id: "index.tsx",
      type: "file",
      name: "index.tsx",
    },
  ],
  [
    "components",
    {
      id: "components",
      type: "directory",
      name: "components",
      children: ["button.tsx"],
    },
  ],
  [
    "button.tsx",
    {
      id: "button.tsx",
      type: "file",
      name: "button.tsx",
    },
  ],
  [
    "types",
    {
      id: "types",
      type: "directory",
      name: "types",
      children: ["file-types.tsx", "other-types.tsx"],
    },
  ],
  [
    "file-types.tsx",
    {
      id: "file-types.tsx",
      type: "file",
      name: "file-types.tsx",
    },
  ],
  [
    "other-types.tsx",
    {
      id: "other-types.tsx",
      type: "file",
      name: "other-types.tsx",
    },
  ],
]);

/**
 * Reads an INode which can be a file or a directory.
 * @param id The id of the inode to read. Defaults to "root".
 * @returns The inode with the given id.
 */
export async function readINode(id: string = "root"): Promise<INode | null> {
  return DATA.get(id) || null;
}

/**
 * Search for files and directories by name (case-insensitive partial match)
 * @param query The search query string
 * @returns Array of matching INodes with their full paths
 */
export async function searchFiles(query: string): Promise<Array<INode & { path: string }>> {
  const results: Array<INode & { path: string }> = [];

  // TO DO
  return results;
}

/**
 * Create a new file in the specified directory
 * @param parentId The ID of the parent directory
 * @param fileName The name of the new file
 * @param fileExtension The file extension (optional, defaults to .txt)
 * @returns The created file node
 */
export async function createFile(
  parentId: string, 
  fileName: string, 
  fileExtension: string = ".txt"
): Promise<File> {
  // TO DO
  return  {
    id: 'generated-id',
    type: "file",
    name: fileName
  }
}

/**
 * Create a new directory in the specified parent directory
 * @param parentId The ID of the parent directory
 * @param dirName The name of the new directory
 * @returns The created directory node
 */
export async function createDirectory(parentId: string, dirName: string): Promise<Directory> {
    // TO DO
    return  {
      id: 'generated-id',
      type: "directory",
      name: dirName,
      children: []
    }
}

/**
 * Rename a file or directory
 * @param nodeId The ID of the node to rename
 * @param newName The new name for the node
 * @returns The updated node
 */
export async function renameNode(nodeId: string, newName: string): Promise<INode> {
  const node = DATA.get(nodeId);
  // TO DO
  return node!;
}

/**
 * Delete a file or directory (and all its contents if it's a directory)
 * @param nodeId The ID of the node to delete
 * @returns Boolean indicating success
 */
export async function deleteNode(nodeId: string): Promise<boolean> {
 // TO DO
  return true;
}

/**
 * Get all nodes in the file system (for debugging/testing)
 * @returns All nodes in the system
 */
export async function getAllNodes(): Promise<Map<string, INode>> {
  return new Map(DATA);
}

/**
 * Reset the file system to initial state (for testing)
 */
export async function resetFileSystem(): Promise<void> {
  DATA.clear();
  
  // Restore initial data
  const initialData = [
    [
      "root",
      {
        id: "root",
        type: "directory",
        name: "src",
        children: ["index.tsx", "components", "types"],
      },
    ],
    [
      "index.tsx",
      {
        id: "index.tsx",
        type: "file",
        name: "index.tsx",
      },
    ],
    [
      "components",
      {
        id: "components",
        type: "directory",
        name: "components",
        children: ["button.tsx"],
      },
    ],
    [
      "button.tsx",
      {
        id: "button.tsx",
        type: "file",
        name: "button.tsx",
      },
    ],
    [
      "types",
      {
        id: "types",
        type: "directory",
        name: "types",
        children: ["file-types.tsx", "other-types.tsx"],
      },
    ],
    [
      "file-types.tsx",
      {
        id: "file-types.tsx",
        type: "file",
        name: "file-types.tsx",
      },
    ],
    [
      "other-types.tsx",
      {
        id: "other-types.tsx",
        type: "file",
        name: "other-types.tsx",
      },
    ],
  ] as const;

  for (const [id, nodeData] of initialData) {
    // Create proper INode objects from the readonly data
    const node: INode = nodeData.type === "directory" 
      ? {
          id: nodeData.id,
          type: "directory",
          name: nodeData.name,
          children: [...nodeData.children]
        }
      : {
          id: nodeData.id,
          type: "file", 
          name: nodeData.name
        };
    DATA.set(id, node);
  }
}
