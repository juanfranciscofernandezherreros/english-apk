import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync('www/learning-path.js', 'utf8');
const context = { window: {} };
runInNewContext(code, context, { filename: 'www/learning-path.js' });
const { nextUnlockedLesson } = context.window.EasyEnglishLearningPath;

const route = ['overview', 'present', 'past'].map(id => ({ cat: 'tenses', l: { id } }));
const selected = finished => nextUnlockedLesson(route, finished)?.l.id ?? null;

// Continue with the first unfinished, unlocked lesson.
assert.equal(selected({}), 'overview');
assert.equal(selected({ overview: true }), 'present');
assert.equal(selected({ overview: true, present: true }), 'past');
assert.equal(selected({ overview: true, present: true, past: true }), null);

// Progress gaps cannot unlock later lessons or skip the first unfinished one.
assert.equal(selected({ past: true }), 'overview');
assert.equal(selected({ overview: true, past: true }), 'present');
assert.equal(nextUnlockedLesson([], {}), null);
assert.equal(selected(undefined), 'overview');

const html = readFileSync('www/index.html', 'utf8');
assert.match(html, /<script src="learning-path\.js"><\/script>\s*<script>/);
assert.match(html, /const next=window\.EasyEnglishLearningPath\.nextUnlockedLesson\(route,done\);/);
assert.ok(html.indexOf('src="learning-path.js"') < html.indexOf('const lessons='));

console.log('PASS: Continuar aprendiendo selects the next unlocked lesson.');
