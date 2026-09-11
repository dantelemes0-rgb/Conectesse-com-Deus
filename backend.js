(function () {
  const config = window.LOGOS_SUPABASE || {};
  const enabled = Boolean(config.url && config.anonKey && window.supabase);
  const client = enabled ? window.supabase.createClient(config.url, config.anonKey) : null;

  window.logosBackend = {
    enabled,
    async saveNotes(content) {
      localStorage.setItem('logos-notas', content);
      if (!client) return;
      const { data: sessionData } = await client.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) return;
      await client.from('notes').upsert({ user_id: userId, content, updated_at: new Date().toISOString() });
    },
    async completeLesson(courseName) {
      const completed = Number(localStorage.getItem('logos-aulas-concluidas') || 0) + 1;
      localStorage.setItem('logos-aulas-concluidas', completed);
      if (!client) return completed;
      const { data: sessionData } = await client.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (userId) await client.from('progress').upsert({ user_id: userId, course_name: courseName, completed_lessons: completed, updated_at: new Date().toISOString() });
      return completed;
    },
    async startAnonymousSession() {
      if (!client) return;
      const { data } = await client.auth.getSession();
      if (!data.session) await client.auth.signInAnonymously();
    }
  };

  window.logosBackend.startAnonymousSession();
}());