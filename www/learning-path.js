(function (global) {
  'use strict';

  // Return the first unfinished lesson whose predecessor is completed.
  // Never skip a locked lesson; null means the whole learning path is done.
  function nextUnlockedLesson(route, finished) {
    const done = finished || {};
    for (let i = 0; i < route.length; i++) {
      const lesson = route[i];
      if (done[lesson.l.id]) continue;
      if (i === 0 || done[route[i - 1].l.id]) return lesson;
      return null;
    }
    return null;
  }

  global.EasyEnglishLearningPath = Object.freeze({ nextUnlockedLesson });
})(window);
