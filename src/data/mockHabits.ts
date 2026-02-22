export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  tasksCompleted: number;
  earnings: string;
  joinDate: string;
  avatar?: string;
}

export const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: 'alice_dev', score: 15420, tasksCompleted: 47, earnings: '$2,340', joinDate: '2026-02-01' },
  { rank: 2, username: 'bob_builder', score: 14850, tasksCompleted: 45, earnings: '$2,180', joinDate: '2026-02-02' },
  { rank: 3, username: 'charlie_code', score: 13920, tasksCompleted: 42, earnings: '$1,950', joinDate: '2026-02-03' },
  { rank: 4, username: 'diana_dev', score: 12780, tasksCompleted: 39, earnings: '$1,820', joinDate: '2026-02-04' },
  { rank: 5, username: 'evan_engineer', score: 11650, tasksCompleted: 36, earnings: '$1,680', joinDate: '2026-02-05' },
  { rank: 6, username: 'fiona_frontend', score: 10920, tasksCompleted: 34, earnings: '$1,540', joinDate: '2026-02-06' },
  { rank: 7, username: 'george_git', score: 10150, tasksCompleted: 31, earnings: '$1,420', joinDate: '2026-02-07' },
  { rank: 8, username: 'hannah_hack', score: 9480, tasksCompleted: 29, earnings: '$1,280', joinDate: '2026-02-08' },
  { rank: 9, username: 'ivan_innovate', score: 8920, tasksCompleted: 27, earnings: '$1,150', joinDate: '2026-02-09' },
  { rank: 10, username: 'julia_js', score: 8350, tasksCompleted: 25, earnings: '$1,020', joinDate: '2026-02-10' },
  { rank: 11, username: 'kevin_kode', score: 7820, tasksCompleted: 23, earnings: '$920', joinDate: '2026-02-11' },
  { rank: 12, username: 'lisa_loop', score: 7290, tasksCompleted: 21, earnings: '$840', joinDate: '2026-02-12' },
  { rank: 13, username: 'mike_merge', score: 6780, tasksCompleted: 19, earnings: '$760', joinDate: '2026-02-13' },
  { rank: 14, username: 'nina_node', score: 6320, tasksCompleted: 18, earnings: '$690', joinDate: '2026-02-14' },
  { rank: 15, username: 'oscar_opensource', score: 5890, tasksCompleted: 16, earnings: '$620', joinDate: '2026-02-15' },
  { rank: 16, username: 'paula_pull', score: 5480, tasksCompleted: 15, earnings: '$560', joinDate: '2026-02-16' },
  { rank: 17, username: 'quinn_query', score: 5120, tasksCompleted: 14, earnings: '$510', joinDate: '2026-02-17' },
  { rank: 18, username: 'ryan_render', score: 4780, tasksCompleted: 13, earnings: '$460', joinDate: '2026-02-18' },
  { rank: 19, username: 'sara_state', score: 4460, tasksCompleted: 12, earnings: '$420', joinDate: '2026-02-19' },
  { rank: 20, username: 'tom_type', score: 4180, tasksCompleted: 11, earnings: '$380', joinDate: '2026-02-20' },
  { rank: 21, username: 'uma_ui', score: 3920, tasksCompleted: 10, earnings: '$340', joinDate: '2026-02-21' },
  { rank: 22, username: 'victor_vue', score: 3680, tasksCompleted: 9, earnings: '$310', joinDate: '2026-02-21' },
  { rank: 23, username: 'wendy_web', score: 3460, tasksCompleted: 8, earnings: '$280', joinDate: '2026-02-22' },
  { rank: 24, username: 'xavier_xml', score: 3260, tasksCompleted: 7, earnings: '$250', joinDate: '2026-02-22' },
  { rank: 25, username: 'yara_yaml', score: 3080, tasksCompleted: 6, earnings: '$220', joinDate: '2026-02-23' },
];
