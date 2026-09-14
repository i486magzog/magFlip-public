import styles from './styles.module.css';

export type FileTreeNode = {
  /** File or folder name. Folders should end with '/'. */
  name: string;
  /** One-line description shown next to the name. */
  note?: string;
  /** Highlights important entries. */
  highlight?: boolean;
  children?: FileTreeNode[];
};

type FileTreeProps = {
  nodes: FileTreeNode[];
};

/**
 * Renders a folder structure as a tree with a description for each entry.
 *
 * Example:
 *   <FileTree nodes={[{ name: 'src/', note: 'sources', children: [{ name: 'index.ts' }] }]} />
 */
export default function FileTree({ nodes }: FileTreeProps) {
  return (
    <div className={styles.tree}>
      <TreeLevel nodes={nodes} prefix="" />
    </div>
  );
}

function TreeLevel({ nodes, prefix }: { nodes: FileTreeNode[]; prefix: string }) {
  return (
    <>
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        const branch = isLast ? '└─ ' : '├─ ';
        const childPrefix = prefix + (isLast ? '   ' : '│  ');
        const isFolder = node.name.endsWith('/');

        return (
          <div key={prefix + node.name}>
            <div className={styles.row}>
              <span className={styles.branch}>{prefix + branch}</span>
              <span className={styles.icon}>{isFolder ? '📁' : '📄'}</span>
              <span className={node.highlight ? styles.nameHighlight : styles.name}>{node.name}</span>
              {node.note && <span className={styles.note}>{node.note}</span>}
            </div>
            {node.children && <TreeLevel nodes={node.children} prefix={childPrefix} />}
          </div>
        );
      })}
    </>
  );
}
