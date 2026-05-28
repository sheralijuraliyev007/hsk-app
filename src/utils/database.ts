import * as SQLite from 'expo-sqlite';
import { CardProgress, createNewCard } from './sm2';
import { VocabWord } from '../data/hsk1';

let db: SQLite.SQLiteDatabase;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) await openDatabase();
  return db;
}

export async function openDatabase() {
  db = await SQLite.openDatabaseAsync('hskmaster.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS vocab (
      id INTEGER PRIMARY KEY,
      chinese TEXT NOT NULL,
      pinyin TEXT NOT NULL,
      english TEXT NOT NULL,
      hsk_level INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS card_progress (
      word_id INTEGER PRIMARY KEY,
      repetitions INTEGER DEFAULT 0,
      ease_factor REAL DEFAULT 2.5,
      interval INTEGER DEFAULT 0,
      next_review_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      cards_studied INTEGER NOT NULL,
      correct INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lesson_progress (
      lesson_id INTEGER PRIMARY KEY,
      hsk_level INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'locked',
      completed_activities TEXT NOT NULL DEFAULT '[]',
      coins_earned INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY DEFAULT 1,
      total_coins INTEGER NOT NULL DEFAULT 0,
      current_streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      last_study_date TEXT,
      current_hsk_level INTEGER NOT NULL DEFAULT 1
    );
    INSERT OR IGNORE INTO user_stats (id) VALUES (1);
    INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (1, 1, 'unlocked');
    INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (1, 2, 'unlocked');
  `);
  await migrateLessonProgressToCompositeKey(db);
  await db.runAsync(`INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (1, 1, 'unlocked')`);
  await db.runAsync(`INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (1, 2, 'unlocked')`);
}

async function migrateLessonProgressToCompositeKey(database: SQLite.SQLiteDatabase) {
  const columns = await database.getAllAsync<{ name: string; pk: number }>(
    `PRAGMA table_info(lesson_progress)`
  );
  const lessonIdPk = columns.find((column) => column.name === 'lesson_id' && column.pk === 1);
  const hskLevelPk = columns.find((column) => column.name === 'hsk_level' && column.pk === 2);

  if (!lessonIdPk || hskLevelPk) return;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS lesson_progress_new (
      lesson_id INTEGER NOT NULL,
      hsk_level INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'locked',
      completed_activities TEXT NOT NULL DEFAULT '[]',
      coins_earned INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (lesson_id, hsk_level)
    );
    INSERT INTO lesson_progress_new (lesson_id, hsk_level, status, completed_activities, coins_earned, completed_at, updated_at)
    SELECT lesson_id, hsk_level, status, completed_activities, coins_earned, completed_at, updated_at FROM lesson_progress;
    DROP TABLE lesson_progress;
    ALTER TABLE lesson_progress_new RENAME TO lesson_progress;
  `);
}

export async function seedVocab(words: VocabWord[]) {
  for (const word of words) {
    await db.runAsync(
      'INSERT OR IGNORE INTO vocab (id, chinese, pinyin, english, hsk_level) VALUES (?, ?, ?, ?, ?)',
      [word.id, word.chinese, word.pinyin, word.english, word.hskLevel]
    );
    const today = new Date().toISOString().split('T')[0];
    await db.runAsync(
      'INSERT OR IGNORE INTO card_progress (word_id, repetitions, ease_factor, interval, next_review_date) VALUES (?, 0, 2.5, 0, ?)',
      [word.id, today]
    );
  }
}

export async function getDueCards(hskLevel?: number): Promise<(VocabWord & CardProgress)[]> {
  const today = new Date().toISOString().split('T')[0];
  let query = `
    SELECT v.id, v.chinese, v.pinyin, v.english, v.hsk_level as hskLevel,
           cp.repetitions, cp.ease_factor as easeFactor, cp.interval, cp.next_review_date as nextReviewDate
    FROM vocab v
    JOIN card_progress cp ON v.id = cp.word_id
    WHERE cp.next_review_date <= ?
  `;
  const params: (string | number)[] = [today];
  if (hskLevel) {
    query += ' AND v.hsk_level = ?';
    params.push(hskLevel);
  }
  query += ' LIMIT 20';
  return await db.getAllAsync<VocabWord & CardProgress>(query, params);
}

export async function updateCardProgress(progress: CardProgress) {
  await db.runAsync(
    'UPDATE card_progress SET repetitions=?, ease_factor=?, interval=?, next_review_date=? WHERE word_id=?',
    [progress.repetitions, progress.easeFactor, progress.interval, progress.nextReviewDate, progress.wordId]
  );
}

export async function saveSession(cardsStudied: number, correct: number) {
  const today = new Date().toISOString().split('T')[0];
  await db.runAsync(
    'INSERT INTO study_sessions (date, cards_studied, correct) VALUES (?, ?, ?)',
    [today, cardsStudied, correct]
  );
}

export async function getTotalStats() {
  const sessions = await db.getFirstAsync<{ total_sessions: number; total_cards: number; total_correct: number }>(
    'SELECT COUNT(*) as total_sessions, SUM(cards_studied) as total_cards, SUM(correct) as total_correct FROM study_sessions'
  );
  return sessions;
}

export async function getHomeStats() {
  const today = new Date().toISOString().split('T')[0];

  const due = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM card_progress WHERE next_review_date <= ?', [today]
  );

  const newCards = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM card_progress WHERE repetitions = 0'
  );

  const totalLearned = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM card_progress WHERE repetitions > 0'
  );

  const sessions = await db.getAllAsync<{ date: string }>(
    'SELECT DISTINCT date FROM study_sessions ORDER BY date DESC'
  );

  // Calculate streak
  let streak = 0;
  const todayDate = new Date();
  for (let i = 0; i < sessions.length; i++) {
    const expected = new Date(todayDate);
    expected.setDate(todayDate.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (sessions[i]?.date === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return {
    dueCards: due?.count ?? 0,
    newCards: newCards?.count ?? 0,
    totalLearned: totalLearned?.count ?? 0,
    streak,
  };
}

export async function getLessonProgress(lessonId: number, hskLevel: number = 1) {
  const db = await getDatabase();
  return db.getFirstAsync<{ status: string; completed_activities: string; coins_earned: number }>(
    'SELECT status, completed_activities, coins_earned FROM lesson_progress WHERE lesson_id = ? AND hsk_level = ?',
    [lessonId, hskLevel]
  );
}

export async function getAllLessonProgress(hskLevel?: number) {
  const db = await getDatabase();
  if (hskLevel) {
    return db.getAllAsync<{ lesson_id: number; hsk_level: number; status: string; completed_activities: string }>(
      'SELECT lesson_id, hsk_level, status, completed_activities FROM lesson_progress WHERE hsk_level = ?',
      [hskLevel]
    );
  }
  return db.getAllAsync<{ lesson_id: number; hsk_level: number; status: string; completed_activities: string }>(
    'SELECT lesson_id, hsk_level, status, completed_activities FROM lesson_progress'
  );
}

export async function completeActivity(lessonId: number, activity: string, hskLevel: number = 1) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (?, ?, 'unlocked')`,
    [lessonId, hskLevel]
  );
  const row = await db.getFirstAsync<{ completed_activities: string }>(
    'SELECT completed_activities FROM lesson_progress WHERE lesson_id = ? AND hsk_level = ?',
    [lessonId, hskLevel]
  );
  const activities: string[] = row ? JSON.parse(row.completed_activities) : [];
  if (!activities.includes(activity)) activities.push(activity);
  const allActivities = ['vocab', 'grammar', 'dialogue', 'speaking', 'listening', 'writing', 'scramble', 'test'];
  const isComplete = allActivities.every(a => activities.includes(a));
  await db.runAsync(
    `UPDATE lesson_progress
     SET completed_activities = ?, status = ?, coins_earned = coins_earned + 10, updated_at = datetime('now')
     WHERE lesson_id = ? AND hsk_level = ?`,
    [JSON.stringify(activities), isComplete ? 'completed' : 'in_progress', lessonId, hskLevel]
  );
  // Award 10 coins per activity to user_stats
  await db.runAsync(`UPDATE user_stats SET total_coins = total_coins + 10 WHERE id = 1`);
  if (isComplete) {
    // Bonus 50 coins for completing the full lesson
    await db.runAsync(`UPDATE user_stats SET total_coins = total_coins + 50 WHERE id = 1`);
    // Unlock next lesson
    await db.runAsync(
      `INSERT OR IGNORE INTO lesson_progress (lesson_id, hsk_level, status) VALUES (?, ?, 'unlocked')`,
      [lessonId + 1, hskLevel]
    );
  }
  // Update daily streak
  const today = new Date().toISOString().split('T')[0];
  const stats = await db.getFirstAsync<{ last_study_date: string; current_streak: number; longest_streak: number }>(
    'SELECT last_study_date, current_streak, longest_streak FROM user_stats WHERE id = 1'
  );
  if (stats) {
    const last = stats.last_study_date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    let newStreak = stats.current_streak;
    if (last === today) {
      // Already studied today, no change
    } else if (last === yesterdayStr) {
      // Studied yesterday, extend streak
      newStreak += 1;
    } else {
      // Streak broken
      newStreak = 1;
    }
    const newLongest = Math.max(newStreak, stats.longest_streak);
    await db.runAsync(
      'UPDATE user_stats SET current_streak = ?, longest_streak = ?, last_study_date = ? WHERE id = 1',
      [newStreak, newLongest, today]
    );
  }
}

export async function getUserStats() {
  const db = await getDatabase();
  return db.getFirstAsync<{
    total_coins: number; current_streak: number;
    longest_streak: number; current_hsk_level: number; last_study_date: string;
  }>('SELECT * FROM user_stats WHERE id = 1');
}

export async function addCoins(amount: number) {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE user_stats SET total_coins = total_coins + ? WHERE id = 1',
    [amount]
  );
}
