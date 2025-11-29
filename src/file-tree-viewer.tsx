// API CALL TO USE
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { readINode } from "./api/read-inode";
import { useToggleSet } from "./hooks/useToggleSet";
import { Directory, INode } from "./types/file-types";

// Helper to check if a node is a directory.
function isDirectory(node: INode): node is Directory {
  return node.type === "directory";
}

// This component loads the actual child nodes because the directory only stores child IDs (strings).
function DirectoryChildren({
  ids,
  renderNode,
}: {
  ids: string[];
  renderNode: (node: INode) => JSX.Element;
}) {
  const [children, setChildren] = useState<INode[]>([]);

  useEffect(() => {
    async function loadChildren() {
      // Load all the children based on their IDs.
      const resolved = await Promise.all(ids.map((id) => readINode(id)));
      setChildren(resolved.filter(Boolean) as INode[]);
    }

    loadChildren();
  }, [ids]);

  return (
    <div className="ml-2.5 border-l border-gray-300">
      {children.map((child) => (
        <div key={child.id}>{renderNode(child)}</div>
      ))}
    </div>
  );
}

export function FileTreeViewer() {
  // Here is your API call to use
  // It returns a promise containing the directory based on the directory ID
  console.log(readINode());

  const [nodes, setNodes] = useState<INode[]>([]);
  const { set: expanded, toggle } = useToggleSet<string>();

  useEffect(() => {
    async function loadRoot() {
      const root = await readINode();
      if (root) {
        setNodes([root]);
      }
    }
    loadRoot();
  }, []);

  const renderNode = (node: INode) => {
    const isFolder = isDirectory(node);
    const isOpen = expanded.has(node.id);

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-1 py-[2px] pl-1 cursor-pointer hover:bg-black/5 rounded"
          onClick={() => isFolder && toggle(node.id)}
          role={isFolder ? "button" : undefined}
          aria-expanded={isFolder ? isOpen : undefined}
        >
          <div className="flex items-center gap-[2px]">
            {isFolder && (
              <ChevronRight
                className={`size-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            )}

            {isFolder ? (
              isOpen ? (
                <FolderOpen className="ml-2 size-5  text-white fill-sky-500" />
              ) : (
                <Folder className="ml-2 size-4 text-sky-500 fill-current" />
              )
            ) : (
              <File className="ml-6 size-4 text-gray-500" />
            )}
          </div>

          <span className="text-sm font-light">{node.name}</span>
        </div>

        {isFolder && isOpen && node.children.length > 0 && (
          <DirectoryChildren ids={node.children} renderNode={renderNode} />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded p-6 space-y-6">
      <div className="grid">
        <div className="flex justify-center">
          <div className="w-[260px] min-h-[300px]">
            <h1 className="text-xl font-medium mb-4 text-center">
              File Tree Viewer
            </h1>

            {nodes.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No items</p>
            ) : (
              nodes.map(renderNode)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
