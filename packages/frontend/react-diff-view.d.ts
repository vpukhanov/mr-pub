declare module 'react-diff-view' {
  import { File, Hunk as FileHunk } from 'gitdiff-parser'

  export type { File, FileHunk }

  export function parseDiff(diff: string): File[]

  export const Diff: React.FC<{
    viewType: 'split' | 'unified'
    diffType: 'add' | 'delete' | 'modify' | 'rename' | 'copy'
    hunks: FileHunk[]
    children: (hunks: FileHunk[]) => React.Element[]
  }>

  export const Hunk: React.FC<{ hunk: FileHunk }>
}
